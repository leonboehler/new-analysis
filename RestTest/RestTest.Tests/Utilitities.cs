using FroggyRestServer;
using FroggyRestServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestTest.Tests
{
    public static class Utilitities
    {
        public static FroggyRestServer.Models.User addTestUser(bool addToDatabase=true)
        {
            FroggyRestServer.Models.User testUser = new FroggyRestServer.Models.User();

            //Bereitstellen von Testdaten
            testUser.Password = "1234";
            testUser.FirstName = "test";
            testUser.LastName = "test";
            testUser.PhoneNumber = "123456789";
            testUser.Email = "test@testtest.com";
            testUser.Birthdate = "1900-01-03";
            FroggyRestServer.Models.Address testAddress = new FroggyRestServer.Models.Address();

            testAddress.City = "Friedrichshafen";
            testAddress.Country = "Deutschland";
            testAddress.PostCode = "12345";
            testAddress.State = "BW";
            testAddress.Street = "JuckMichNicht";
            testAddress.StreetNumber = "444";
            testUser.Address = testAddress;
            testUser.Role = "Admin";
            MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_user WHERE firstname='test';");
            if (addToDatabase)
            {
                var result = testUser.InsertToDatabase();
            } 
            return testUser;
        }

        public static FroggyRestServer.Models.Location addTestLocation(int stationID)
        {
            // 1. Add Bucket
            //FroggyRestServer.Models.Bucket testBucket = new Bucket();
            //testBucket.Battery = 1234;
            //testBucket.FrogAmount = 6;
            //testBucket.FrogAmountMax = 10;
            //testBucket.Id = 1234;
            //testBucket.Name = "Test";
            //testBucket.InsertIntoDatabase();

            // 1. Add Station
            FroggyRestServer.Models.Station testStation = new Station();
            testStation.Id = stationID;
            Position stationPosition = new Position();
            stationPosition.Latitude = (float)12.00;
            stationPosition.Longitude = (float)14.00;
            testStation.Postition = stationPosition;
            testStation.InsertIntoDatabase();
            var resultStation = MySQLConnector.ConExecuteReaderMany("Select * from st_station");
            List<Dictionary<string, object>> result2 = (List<Dictionary<string, object>>)resultStation["data"];
            




            FroggyRestServer.Models.Location testLocation = new FroggyRestServer.Models.Location();

            testLocation.Name = "Testlocation xy";
            testLocation.Description = "UnitTest-TEst-Location. Please ignore";
            testLocation.Street = "Fallenbrunnen";
            testLocation.PostalCode = 75031;
            testLocation.City = "";
            testLocation.State = "BW";
            testLocation.RouteLength = "12.12";
            testLocation.StationId = (int)result2[0]["id"];
            MySQLConnector.ConExecuteReaderSingle("DELETE FROM dehabewe.st_location WHERE name='Testlocation xy';");
            var resultLocation = testLocation.InsertIntoDatabase();
            resultLocation = MySQLConnector.ConExecuteReaderMany("Select * from st_location");
            List<Dictionary<string, object>> result3 = (List<Dictionary<string, object>>)resultLocation["data"];
            testLocation.Id = (int)result3[0]["id"];
            return testLocation;

        }
    }
}
