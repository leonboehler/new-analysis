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

            //TestCase4: Writing Negative (-00:00:01)
            testWritingExpectedSucess(testUser, new DateTime(2010, 1, 1, 8, 0, 15), new DateTime(2010, 1, 1, 8, 0, 14));

            //TestCase4: Writing Overflow (-23:59:59)
            testWritingExpectedSucess(testUser, new DateTime(2010, 1, 2, 11, 59, 59), new DateTime(2010, 1, 1, 12, 0, 0));

            //TestCase5: Writing negative Overflow (1:00:00:00)
            testWritingExpectedFailure(testUser, new DateTime(2010, 1, 2, 8, 0, 15), new DateTime(2010, 1, 1, 8, 0, 15), 1292);

            //CleanUp
            MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_user;");

            void testWritingExpectedFailure(User user, DateTime date1, DateTime date2, int errorCode)
            {
                TimeSpan interval = date2 - date1;
                List<TimeSpan> time = new List<TimeSpan>();
                time.Add(interval);

                user.OperationalReadiness = time;
                var result = user.UpdateOperationalReadiness();
                Assert.AreEqual(errorCode, result["code"]);
            }

            void testWritingExpectedSucess(User user, DateTime date1, DateTime date2)
            {
                TimeSpan interval = date2 - date1;
                List<TimeSpan> time = new List<TimeSpan>();
                time.Add(interval);

                user.OperationalReadiness = time;
                var result = user.UpdateOperationalReadiness();
                Assert.IsNotNull(result);

                //Read from Server to validate Data
                result = MySQLConnector.ConExecuteReaderMany("SELECT * FROM dehabewe.st_readiness WHERE time=\"" + interval.ToString() + "\";");
                List<Dictionary<string, object>> result2 = (List<Dictionary<string, object>>)result["data"];
                System.TimeSpan result3 = (System.TimeSpan)result2[0]["time"];
                Assert.AreEqual(interval.Ticks, result3.Ticks);
                MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_readiness;");
            }
        }

        [TestMethod]
        public void SaveMultiReadinessTest()
        {
            User testUser = addTestUser();
            //3 aufeinanderfolgende Werte, keine Überschneidungen
            DateTime[] newTimes = new DateTime[] { new DateTime(2010, 1, 1, 8, 0, 15), new DateTime(2010, 1, 1, 8, 1, 15), new DateTime(2010, 1, 1, 8, 35, 15), new DateTime(2010, 1, 1, 22, 0, 15)};
            testWritingExpectedSucess(testUser, newTimes);

            //Start and Endtime are the same
            newTimes = new DateTime[] { new DateTime(2010, 1, 1, 8, 0, 15), new DateTime(2010, 1, 1, 8, 1, 15), new DateTime(2010, 1, 1, 8, 1, 15), new DateTime(2010, 1, 1, 22, 0, 15) };
            testWritingExpectedSucess(testUser, newTimes);

            //Überschneidung
            newTimes = new DateTime[] { new DateTime(2010, 1, 1, 8, 0, 15), new DateTime(2010, 1, 1, 8, 2, 15), new DateTime(2010, 1, 1, 8, 1, 15), new DateTime(2010, 1, 1, 22, 0, 15) };
            testWritingExpectedSucess(testUser, newTimes);

            //Expected Failure: 1062 Doppelter Eintrag
            newTimes = new DateTime[] { new DateTime(2010, 1, 1, 8, 1, 15), new DateTime(2010, 1, 1, 22, 0, 15), new DateTime(2010, 1, 1, 8, 1, 15), new DateTime(2010, 1, 1, 22, 0, 15) };
            testWritingExpectedFailure(testUser, newTimes);


            void testWritingExpectedSucess(User user, DateTime[] times)
            {
                List<TimeSpan> time = new List<TimeSpan>();
                MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_readiness;");
                for (int i = 0; i < times.Length; i=i+2)
                {
                    TimeSpan newSpan = times[i + 1] - times[i];
                    time.Add(newSpan);
                }

                user.OperationalReadiness = time;

                var result = user.UpdateOperationalReadiness();
                Assert.IsNotNull(result);

                //Read from Server to validate Data
                result = MySQLConnector.ConExecuteReaderMany("SELECT * FROM dehabewe.st_readiness;");
                List<Dictionary<string, object>> result2 = (List<Dictionary<string, object>>)result["data"];
                int j = 0;
                foreach (Dictionary<string, object> x in result2)
                {
                    TimeSpan tmpResult = (TimeSpan)x["time"];
                    Assert.AreEqual(time[j].Ticks, tmpResult.Ticks);
                    j++;
                }
                MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_readiness;");
            }
        }

        private void testWritingExpectedFailure(User user, DateTime[] times)
        {
            List<TimeSpan> time = new List<TimeSpan>();
            MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_readiness;");
            for (int i = 0; i < times.Length; i = i + 2)
            {
                TimeSpan newSpan = times[i + 1] - times[i];
                time.Add(newSpan);
            }

            user.OperationalReadiness = time;

            var result = user.UpdateOperationalReadiness();
            Assert.AreEqual(1062, result["code"]);

            //Read from Server to validate Data
            result = MySQLConnector.ConExecuteReaderMany("SELECT * FROM dehabewe.st_readiness;");
            List<Dictionary<string, object>> result2 = (List<Dictionary<string, object>>)result["data"];
            int j = 0;
            foreach (Dictionary<string, object> x in result2)
            {
                TimeSpan tmpResult = (TimeSpan)x["time"];
                Assert.AreEqual(time[j].Ticks, tmpResult.Ticks);
                j++;
            }
            Assert.AreEqual(1, j);
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
