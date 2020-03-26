using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace FroggyRestServer.Models
{
    public class User
    {
        public User()
        {

        }

        public String Id { get; set; }
        public String Token { get; set; }
        public String Password { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String PhoneNumber { get; set; }

        public String Email { get; set; }

        public String Birthdate { get; set; }
        public List<TimeSpan> OperationalReadiness { get; set; }

        public Address Address { get; set; }
        public String Role { get; set; }

        public List<Location> AssignedLocations{ get; set; }


        public Dictionary<string, object> GetFromDatabase()
        {
            string command = $"SELECT * FROM ui_user  WHERE mail = '{Email}';";
            System.Diagnostics.Debug.WriteLine(command);
            Dictionary<string, object> sqlUserData = MySQLConnector.ConExecuteReaderSingle(command);
            System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject(sqlUserData));


            string commandGetReadiness = $"SELECT * FROM ui_readiness WHERE user_mail = '{Email}'";
            Dictionary<string, object> readinessDatas = MySQLConnector.ConExecuteReaderMany(commandGetReadiness);

            OperationalReadiness = new List<TimeSpan>();

            foreach (Dictionary<string, object> readinessData in (List< Dictionary<string,object>>) readinessDatas["data"])
            {
                TimeSpan time = (TimeSpan)readinessData["time"];
                OperationalReadiness.Add(time);
            }

            Dictionary<string, object> userData = (Dictionary<string, object>)sqlUserData["data"];
            userData["OperationalReadiness"] = OperationalReadiness;

            System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject(readinessDatas));


            String commandGetAssigned = $"SELECT * FROM ui_assignment WHERE user_mail = '{Email}';";
            Dictionary<String, object> assignedData = MySQLConnector.ConExecuteReaderMany(commandGetAssigned);
            System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject(assignedData));

            return userData;
        }

        public Dictionary<String, object> InsertToDatabase()
        {
            String hashedPassword = HashHelper.GetHash(Password);

            String commandRegister = $"CALL fn_register('{FirstName}','{LastName}'," +
                $"'{Birthdate}','{PhoneNumber}','{Address.Street}','{Address.StreetNumber}'," +
                $"'{Address.PostCode}','{Address.City}','{Address.State}','{Address.Country}'," +
                $"'{Email}','{hashedPassword}','{Role}');";

            Dictionary<String, object> returnData = MySQLConnector.ConExecuteReaderSingle(commandRegister); 
            return returnData;

        }

        public Dictionary<String,object> UpdateOperationalReadiness()
        {
            Dictionary<String, object> returnData = new Dictionary<string, object>();
            foreach (TimeSpan readiness in OperationalReadiness)
            {
                String commandAddReadiness = $"CALL fn_add_readiness('{Email}','{readiness}');";
                returnData = MySQLConnector.ConExecuteReaderSingle(commandAddReadiness);

                if ((int)returnData["code"] != 200)
                {
                    return returnData;
                }
            }

            return returnData;
        }
    

        public Dictionary<String, object> UpdateAssignedLocations()
        {
            Dictionary<String, object> returnData = new Dictionary<String, object>();
            if (AssignedLocations != null)
            {
                foreach (Location location in AssignedLocations)
                {
                    String command2 = $"CALL fn_add_assignment('{Email}',{location.Id});";
                    returnData = MySQLConnector.ConExecuteReaderSingle(command2);
                    if ((int)returnData["code"] != 200)
                    {
                        return returnData;
                    }
                }
            }
            return returnData;
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