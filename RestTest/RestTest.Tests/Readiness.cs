using System;
using System.Collections.Generic;
using System.Security.Permissions;
using FroggyRestServer;
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
            try
            {              
                testUser.InsertToDatabase();
            }
            catch (Exception ex)
            {
                
            }

            //Erzeugen eines Temproären Time-Spans
            DateTime date1 = new DateTime(2010, 1, 1, 8, 0, 15);
            DateTime date2 = new DateTime(2010, 8, 18, 13, 30, 30);
            TimeSpan interval = date2 - date1;
            List<TimeSpan> time = new List<TimeSpan>();
            time.Add(interval);

            testUser.OperationalReadiness = time;

            var result = testUser.UpdateOperationalReadiness();
            Assert.IsNotNull(result);


            
        }
    }
        
}
