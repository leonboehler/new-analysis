
using System;
using System.Collections.Generic;
using FroggyRestServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace FroggyRestServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [Route("create")]
        public object CreateUser([FromBody]User UserToInsert)
        {
            Dictionary<String, object> returnData = UserToInsert.InsertToDatabase();
            return returnData;
        }

        [HttpGet]
        [Route("getAll")]
        public Dictionary<String, object> GetAllUser()
        {
            return MySQLConnector.ConExecuteReaderMany("SELECT * FROM ui_user;");
        }

        [HttpGet]
        [Route("verify")]
        public object VerifyUser([FromBody] User User)
        {
            return User.Verify();
        }

        [HttpGet]
        [Route("login")]
        public Dictionary<String, object> Login([FromBody] User user)
        {
            Dictionary<String, object> data = user.Login();
            System.Diagnostics.Debug.WriteLine(data);
            return data;
        }

        [HttpGet]
        [Route("logout")]
        public Dictionary<String, object> Logout([FromBody] User user)
        {
            Dictionary<String, object> data = user.Logout();
            System.Diagnostics.Debug.WriteLine(data);
            return data;
        }

        [HttpGet]
        [Route("get")]
        public object ShowSingelUser([FromBody] User User) 
        {
            String command = $"SELECT * FROM ui_user_profile WHERE mail = '{User.Email}';";
            System.Diagnostics.Debug.WriteLine(command);
            return MySQLConnector.ConExecuteReaderSingle(command);
        }

        [HttpPost]
        [Route("update")]
        public object UpdateUserProfile([FromBody] User NewUser)
        {
            return NewUser.Update();
        }
    }
}