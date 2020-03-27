using System;
using System.Collections.Generic;
using System.Security.Permissions;
using FroggyRestServer;
using FroggyRestServer.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MySql.Data.MySqlClient;

namespace FroggyRestServer.Tests
{
    [TestClass]
    public partial class ReadinessTest
    {
        [TestMethod]
        public void SaveReadinessTimesTest()
        {
            Models.User testUser = addTestUser();
            //Erzeugen eines Temproären Time-Spans

            //TestCase1: Etwas dazwischen
            testWritingExpectedSucess(testUser, new DateTime(2010, 1, 1, 8, 0, 15), new DateTime(2010, 1, 1, 13, 30, 30));

            //TestCase2: Etwas an der Grenze: 0
            testWritingExpectedSucess(testUser, new DateTime(2010, 1, 1, 8, 0, 15), new DateTime(2010, 1, 1, 8, 0, 15));

            //TestCase3: Writing Maximimum (23:59:59)
            testWritingExpectedSucess(testUser, new DateTime(2010, 1, 1, 12, 0, 0), new DateTime(2010, 1, 2, 11, 59, 00));

            //CleanUp
            MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_user;");
            

        }

        private void testWritingExpectedSucess(User testUser, DateTime date1, DateTime date2)
        {  
            TimeSpan interval = date2 - date1;
            List<TimeSpan> time = new List<TimeSpan>();
            time.Add(interval);

            testUser.OperationalReadiness = time;
            var result = testUser.UpdateOperationalReadiness();
            Assert.IsNotNull(result);
            //Read from Server to validate Data
            result = MySQLConnector.ConExecuteReaderMany("SELECT * FROM dehabewe.st_readiness WHERE time=\"" + interval.ToString() + "\";");
            List<Dictionary<string, object>> result2 = (List<Dictionary<string, object>>)result["data"];
            System.TimeSpan result3 = (System.TimeSpan)result2[0]["time"];
            Assert.AreEqual(interval.Ticks, result3.Ticks);
            MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_readiness;");
        }

        private FroggyRestServer.Models.User addTestUser()
        {
            FroggyRestServer.Models.User testUser = new Models.User();

            //Bereitstellen von Testdaten
            testUser.Password = "1234";
            testUser.FirstName = "test";
            testUser.LastName = "test";
            testUser.PhoneNumber = "123456789";
            testUser.Email = "test@testtest.com";
            testUser.Birthdate = "1900-01-03";
            FroggyRestServer.Models.Address testAddress = new Models.Address();

            testAddress.City = "Friedrichshafen";
            testAddress.Country = "Deutschland";
            testAddress.PostCode = "12345";
            testAddress.State = "BW";
            testAddress.Street = "JuckMichNicht";
            testAddress.StreetNumber = "444";
            testUser.Address = testAddress;
            testUser.Role = "Admin";
            MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_user WHERE firstname='test';");
            var result = testUser.InsertToDatabase();

            return testUser;
        }
    }
        
}
