using System;
using System.Security.Permissions;
using FroggyRestServer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MySql.Data.MySqlClient;

namespace FroggyRestServer.Tests
{
    [TestClass]
    public partial class MySQLConnectorTest
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
            Assert.IsNotNull(result, "Result is zero");

            // 3. Lesen von der Datenbank, absichtlich falsch
            result = MySQLConnector.ConExecuteReaderMany("SELECT * FROM ui_userxyz;");
            Assert.AreEqual(1146, result["code"], "Call was returned as successfull, even if it was not");
            Assert.IsNotNull(result);

            // String commandInsert = $"CALL fn_add_station(1234, 12.1234,12.1234);";
            // result = MySQLConnector.ConExecuteReaderMany(commandInsert);
            // 
        }
    }
}
