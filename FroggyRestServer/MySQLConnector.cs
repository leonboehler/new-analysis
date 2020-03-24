using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FroggyRestServer
{
    public class MySQLConnector
    {
        private const String host = "bc.dyndns.deseyve.com";
        private const String user = "server";
        private const String pass = "dhbw2020#";
        private const String database = "dehabewe";
        private static String connectionString = "SERVER=" + host + "; DATABASE=" + database + "; UID=" + user + "; PASSWORD=" + pass + "; SSLMODE=none;";

        static MySqlConnection connection = new MySqlConnection(connectionString);

        /// <summary>
        /// checks if there is a database connection
        /// </summary>
        static public bool ConTestOpen()
        {
            try
            {
                connection.Open();
                connection.Close();
                connection.Dispose();
                return true;
            }
            catch (MySqlException ex)
            {
                System.Diagnostics.Debug.WriteLine("Error: {0}", ex.ToString());
                return false;
            }
        }

        /// <summary>
        /// Executing queries that does return a list of datas
        /// </summary>
        /// <param name="command">MySQL-Query as string</param>
        /// <returns name="data"></returns>
        static public Dictionary<String,object> ConExecuteReaderMany(string command)
        {
            Dictionary<String, object> response = new Dictionary<String, object>();
            List<Dictionary<String, object>> data = new List<Dictionary<String, object>>();

            connection.Open();

            MySqlCommand Command = connection.CreateCommand();
            Command.CommandText = command;

            try {

                MySqlDataReader reader = Command.ExecuteReader();
                while (reader.Read())
                {
                    Dictionary<String, object> rowDic = new Dictionary<String, object>();
                    for (int fieldIndex = 0; fieldIndex < reader.FieldCount; fieldIndex++)
                    {
                        String fieldName = reader.GetName(fieldIndex);
                        object fieldValue = reader.GetValue(fieldIndex);
                        rowDic[fieldName] = fieldValue;
                    }

                    data.Add(rowDic);                    
                }

                response["message"] = "success";
                response["code"] = 200;

            }
            catch (MySqlException ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                response["message"] = ex.Message;
                response["code"] = ex.Data["Server Error Code"];
            }

            connection.Close();
            connection.Dispose();

            response["data"] = data;
            return response;
        }

        static public Dictionary<String, object> ConExecuteReaderSingle(string command)
        {
            Dictionary<String, object> response = new Dictionary<String, object>();
            Dictionary<String, object> data = new Dictionary<String, object>();

            connection.Open();

            MySqlCommand Command = connection.CreateCommand();
            Command.CommandText = command;

            try {

                MySqlDataReader reader = Command.ExecuteReader();
                reader.Read();

                for (int fieldIndex = 0; fieldIndex < reader.FieldCount; fieldIndex++)
                {
                    String fieldName = reader.GetName(fieldIndex);
                    object fieldValue = reader.GetValue(fieldIndex);
                    data[fieldName] = fieldValue;
                }

                response["message"] = "success";
                response["code"] = 200;

            }
            catch (MySqlException ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                response["message"] = ex.Message;
                response["code"] = ex.Data["Server Error Code"];
            }

            connection.Close();
            connection.Dispose();

            response["data"] = data;
            return response;
        }
    }
}
