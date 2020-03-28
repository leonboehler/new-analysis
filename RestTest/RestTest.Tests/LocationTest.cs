using System;
using System.Collections.Generic;
using System.Security.Permissions;
using FroggyRestServer;
using FroggyRestServer.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MySql.Data.MySqlClient;
using RestTest.Tests;

namespace FroggyRestServer.Tests
{
    [TestClass]
    public partial class LocationTest
    {
        [TestMethod]
        public void SaveLocationTest()
        {
            Models.User testUser = Utilitities.addTestUser();
            List<Location> AssignedLocations = new List<Location>();

            // Leere Liste
            testWritingExpectedSucess(testUser, AssignedLocations, 0);
            //Add a single Assignment
            AssignedLocations.Add(Utilitities.addTestLocation(12345));
            testWritingExpectedSucess(testUser, AssignedLocations, 1);

            //Add multiple Assignments
            AssignedLocations.Add(Utilitities.addTestLocation(12346));
            AssignedLocations.Add(Utilitities.addTestLocation(12347));
            testWritingExpectedSucess(testUser, AssignedLocations, 3);

            MySQLConnector.ConExecuteReaderSingle("DELETE from st_user");

            
        //Erzeugen eines Temproären Time-Spans
        }

        private void testWritingExpectedSucess(User user, List<Location> locationList, int testCase, bool deleteAfterCheck=true)
        {
            user.AssignedLocations = locationList;
            var result = user.UpdateAssignedLocations();
            if (testCase == 0)
            {
                Assert.IsNotNull(0, result.Count.ToString());
            }
            if (testCase == 1)
            {
                Assert.AreEqual(200, result["code"]);
                result = MySQLConnector.ConExecuteReaderMany("Select * from st_assignment");
                List<Dictionary<string, object>> result3 = (List<Dictionary<string, object>>)result["data"];
                Assert.AreEqual(locationList[0].Id, result3[0]["location_id"]);

            }
            if (testCase == 3)
            {
                Assert.AreEqual(1452, result["code"]);
            }
            if (deleteAfterCheck)
            {
                MySQLConnector.ConExecuteReaderSingle("Delete from st_station;");
                MySQLConnector.ConExecuteReaderSingle("Delete from st_location");
                MySQLConnector.ConExecuteReaderSingle("Delete from st_assignment");
            }
        }

        [TestMethod]
        public void AssignmentWithoutUserTest()
        {
            List<Location> AssignedLocations = new List<Location>();
            User testUser = Utilitities.addTestUser(false);
            AssignedLocations.Add(Utilitities.addTestLocation(12345));
            testUser.AssignedLocations = AssignedLocations;
            var result = testUser.UpdateAssignedLocations();
            Assert.AreEqual(401, result["code"]);
        }

        [TestMethod]
        public void DeleteUserTest()
        {
            Models.User testUser = Utilitities.addTestUser();
            List<Location> AssignedLocations = new List<Location>();
            //Add a single Assignment
            AssignedLocations.Add(Utilitities.addTestLocation(12345));
            testWritingExpectedSucess(testUser, AssignedLocations, 1, false);

            MySQLConnector.ConExecuteReaderSingle("Delete from st_user");

            var result = MySQLConnector.ConExecuteReaderMany("select * from st_assignment");
            var result2 = (List<Dictionary<string, object>>)result["data"];
            Assert.AreEqual(0, result2.Count);

            MySQLConnector.ConExecuteReaderSingle("Delete from st_station;");
            MySQLConnector.ConExecuteReaderSingle("Delete from st_location");
            MySQLConnector.ConExecuteReaderSingle("Delete from st_assignment");
        }

        [TestMethod]
        public void DuplicateTest()
        {
            Models.User testUser = Utilitities.addTestUser();
            List<Location> AssignedLocations = new List<Location>();

            //Add a single Assignment
            AssignedLocations.Add(Utilitities.addTestLocation(12345));
            testWritingExpectedSucess(testUser, AssignedLocations, 1);

            testWritingExpectedSucess(testUser, AssignedLocations, 3);
        }
    }
        
}
