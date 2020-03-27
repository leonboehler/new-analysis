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
    }
}
