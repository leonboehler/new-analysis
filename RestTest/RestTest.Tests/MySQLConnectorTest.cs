using System;
using System.Security.Permissions;
using FroggyRestServer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace FroggyRestServer.Tests
{
    [TestClass]
    public partial class DatabaseTest
    {
        [TestMethod]
        public void DatabaseConnectionTest()
        {
            //Zuerst aufrufen der Herrkömmlichen Methode zur Überprüfen auf anzeigen einer richtigen Verbindung
            bool result = MySQLConnector.ConTestOpen();
            Assert.IsTrue(result);

            String host = "bc.dyndns.deseyve.com";
            String user = "server2"; // Wrong User
            String pass = "dhbw2020#";
            String database = "dehabewe";
            String connectionString = "server=" + host + ";port=3306;database=" + database + "; UID=" + user + "; PASSWORD=" + pass + "; SSLMODE=none;";

            MySqlConnection connection = new MySqlConnection(connectionString);

            Exception expectedExcetpion = null;

            try
            {
                connection.Open();
                connection.Close();
                connection.Dispose();
            }
            catch (Exception ex)
            {
                expectedExcetpion = ex;
            }

            // Assert
            Assert.IsNotNull(expectedExcetpion);
        }

        [TestMethod]
        public void DatabaseDataTest()
        {
            // 1. Testen der Verbindung mit der Datenbank
            Assert.IsTrue(MySQLConnector.ConTestOpen(), "Connection to Database established");

            // 2. Lesen von der Datenbank, erfolgreich
            var result = MySQLConnector.ConExecuteReaderMany("SELECT * FROM ui_user;");
            Assert.AreEqual(200,result["code"], "Result is zero");

            // 3. Lesen von der Datenbank, absichtlich aus nicht existenter Tabelle
            result = MySQLConnector.ConExecuteReaderMany("SELECT * FROM ui_userxyz;");
            Assert.AreEqual(1146, result["code"], "Call was returned as successfull, even if it was not");

            //4. Schreiben in die Datenbank
            result = MySQLConnector.ConExecuteReaderMany("INSERT into dehabewe.st_assignment (id, user_id, location_id) values (100, 200, 150);");
            Assert.AreEqual(1452, result["code"]);

            result = MySQLConnector.ConExecuteReaderMany("INSERT into dehabewe.st_assignment (id, user_id, location_id) values (100, 200);");
            Assert.AreEqual(1136, result["code"]);

            result = MySQLConnector.ConExecuteReaderMany("Delete from st_user;");
            Assert.AreEqual(200, result["code"]);

            result = MySQLConnector.ConExecuteReaderMany("CALL `dehabewe`.`fn_register`(\"test\",\"test\",\"1900-02-02\",123456789,\"Fallenbrunnen\",\"10\",\"75031\",\"Friedrichshafen\",\"BW\",\"Deutschland\",\"test@test.de\",\"1234\",\"Admin\");");
            Assert.AreEqual(200, result["code"]);

            result = MySQLConnector.ConExecuteReaderMany("Select * from st_user;");
            List<Dictionary<string, object>> result2 = (List<Dictionary<string, object>>)result["data"];
            Assert.AreEqual("test", result2[0]["firstname"]);
            Assert.AreEqual("Fallenbrunnen", result2[0]["street"]);
            Assert.AreEqual("ADMIN", result2[0]["role"]);

            result = MySQLConnector.ConExecuteReaderMany("Delete from st_user;");
            Assert.AreEqual(200, result["code"]);
        }
    }
}
