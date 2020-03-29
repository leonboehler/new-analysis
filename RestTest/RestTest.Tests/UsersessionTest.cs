using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using FroggyRestServer.Controllers;
using System.Collections.Generic;
using RestTest.Tests;

namespace FroggyRestServer.Tests
{
    [TestClass]
    public class UsersessionTest
    {

        [TestMethod]
        public void loginWorks() // TK-0219a
        {
            var user = Utilitities.addTestUser();
            var userController = new UserController();

            var result = userController.Login(user);
            var userSessions = (List<Dictionary<string, object>>)MySQLConnector.ConExecuteReaderMany(
                $"SELECT end_ts FROM log_session WHERE session_id LIKE '{(string)((Dictionary<string, object>)result["data"])["token"]}';")["data"];

            Assert.AreEqual(result["code"], 200, "Login unsuccessful");
            Assert.AreEqual(userSessions.Count, 1, "Usersession wasn't added or isn't unique");
            Assert.AreEqual(userSessions[0]["end_ts"], DBNull.Value, "Usersession was already ended");

            userController.Logout(user);
        }

        [TestMethod]
        public void logoutWorks() // TK-0221a
        {
            var user = Utilitities.addTestUser();
            var userController = new UserController();

            userController.Logout(user); // < v Ensure, we've got a usable user session
            var sessionToken = (string)((Dictionary<string, object>)userController.Login(user)["data"])["token"];
            var result = userController.Logout(user);
            var openSessions = (List<Dictionary<string, object>>)MySQLConnector.ConExecuteReaderMany(
                $"SELECT NULL FROM log_session WHERE end_ts IS NULL AND session_id LIKE '{sessionToken}';")["data"];

            Assert.AreEqual(result["code"], 200, "Logout unsuccessful");
            Assert.AreEqual(openSessions.Count, 0, "Usersession wasn't ended on logout");
        }
    }
}
