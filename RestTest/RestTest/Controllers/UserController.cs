
using System;
using System.Collections.Generic;
using System.Web.Http;
using FroggyRestServer.Models;
using Newtonsoft.Json;

namespace FroggyRestServer.Controllers
{
   
    public class UserController : ApiController
    {
        [HttpPost]
        [ActionName("create")]
        public Dictionary<string, object> CreateUser([FromBody]User UserToInsert)
        {
            Dictionary<String, object> data = UserToInsert.InsertToDatabase();
            if(UserToInsert.AssignedLocations != null)
            {
                UserToInsert.UpdateAssignedLocations();
            }         
            return data;
        }

        [HttpGet]
        [ActionName("getAll")]
        public Dictionary<string, object> GetAllUser()
        {
            //MySQLConnector.ConTestOpen();
            Dictionary<String,object> data =  MySQLConnector.ConExecuteReaderMany("SELECT * FROM ui_user;");
            return data;
        }

        [HttpGet]
        [ActionName("verify")]
        public Dictionary<string, object> VerifyUser([FromBody] User User)
        {
            Dictionary<String,object> data = User.Verify();
            return data;
        }

        [HttpGet]
        [ActionName("login")]
        public Dictionary<string, object> Login([FromBody] User user)
        {
            Dictionary<String, object> data = user.Login();
            return data;
        }

        [HttpGet]
        [ActionName("logout")]
        public Dictionary<string, object> Logout([FromBody] User user)
        {
            Dictionary<String, object> data = user.Logout();
            System.Diagnostics.Debug.WriteLine(data);
            return data;
        }

        [HttpGet]
        [ActionName("get")]
        public Dictionary<string, object> ShowSingelUser([FromBody] User user) 
        {     
            Dictionary<String,object> data = user.GetFromDatabase();
            return data;
        }

        [HttpPost]
        [ActionName("update/info")]
        public Dictionary<string, object> UpdateUserProfile([FromBody] User NewUser)
        {
            Dictionary<String, object> data = NewUser.Update();
            return data;
        }

        [HttpPost]
        [ActionName("updateoperationalreadiness")]
        public Dictionary<string, object> UpdateUserOperationalReadiness([FromBody] User NewUser)
        {
            Dictionary<String, object> data = NewUser.UpdateOperationalReadiness();
            return data;
        }
        [HttpPost]
        [ActionName("update/assignedlocations")]
        public Dictionary<string, object> UpdateUserAssignedLocations([FromBody] User NewUser)
        {
            Dictionary<String, object> data = NewUser.UpdateAssignedLocations();
            return data;
        }
    }
}