using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace FroggyRestServer.Models
{
    public class User
    {
        public String Id { get; set; }
        public String Token { get; set; }
        public String Password { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String PhoneNumber { get; set; }

        public String Email { get; set; }

        public String Birthdate { get; set; }
        public DateInterval OperationalReadiness { get; set; }

        public Address Address { get; set; }
        public String Role { get; set; }

        public List<Fence> AssignedFences { get; set; }

        public Dictionary<String,object> InsertToDatabase()
        {
            String hashedPassword = HashHelper.GetHash(Password);

            String command = $"CALL fn_register('{FirstName}','{LastName}'," +
                $"'{Birthdate}','{PhoneNumber}','{Address.Street}','{Address.StreetNumber}'," +
                $"'{Address.PostCode}','{Address.City}','{Address.State}','{Address.Country}'," +
                $"'{Email}','{hashedPassword}','{Role}');";
            return MySQLConnector.ConExecuteReaderSingle(command);
        }

        private void CreateToken()
        {
            String token = Email + System.DateTime.Now.Ticks.ToString();
            string hashedToken = HashHelper.GetHash(token);
            Token = hashedToken;
        }

        public Dictionary<String, object> Login()
        {
            CreateToken();
            String hashedPassword = HashHelper.GetHash(Password);
            String command = $"CALL fn_login('{Email}', '{hashedPassword}','{Token}');";
            Dictionary<String,object> returnInfo = MySQLConnector.ConExecuteReaderSingle(command);

            int code = (int) returnInfo["code"];
            if (code == 200)
            {
                Dictionary<String, object> newData = new Dictionary<String, object>();
                newData["token"] = Token;
                returnInfo["data"] = newData;
            }
            return returnInfo;
        }

        public Dictionary<String, object> Logout()
        {
            String command = $"CALL fn_logout('{Email}');";
            return MySQLConnector.ConExecuteReaderSingle(command);
        }


        public Dictionary<String,object> Verify()
        {
            String command = $"CALL fn_verify('{Token}');";
            return MySQLConnector.ConExecuteReaderMany(command);
        }

        public Dictionary<String,object> Update()
        {
            // Can´t update Email als Email is an unique identifier
            String command =$"UPDATE st_user SET " +
                            $"firstname    = '{FirstName}'," +
                            $"lastname     = '{LastName}'," +
                            $"birthday     = '{Birthdate}'," +
                            $"street       = '{Address.Street}'," +
                            $"streetnumber = '{Address.StreetNumber}'," +
                            $"plz          = '{Address.PostCode}'," +
                            $"city         = '{Address.City}'," +
                            $"state        = '{Address.State}'," +
                            $"country      = '{Address.Country}'," +
                            $"country      = '{Address.Country}'," +
                            $"password     = '{Password}' " +
                            $"WHERE mail   = '{Email}';";
            return MySQLConnector.ConExecuteReaderSingle(command);

        }
    }
}