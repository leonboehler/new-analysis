using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Windows;

namespace Textadventure
{
    /// <summary>
    /// MySQL-Connectorclass
    /// </summary>
    public class MySQLCon
    {
        private const String host = "";
        private const String user = "";
        private const String pass = "";
        private const String database = "";
        private static String connectionString = "SERVER=" + host + "; DATABASE=" + database + "; UID=" + user + "; PASSWORD=" + pass + "; SSLMODE=none;";

        MySqlConnection connection = new MySqlConnection(connectionString);

        /// <summary>
        /// checks if there is a database connection
        /// </summary>
        public bool ConTestOpen()
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
                Console.WriteLine("Error: {0}", ex.ToString());
                return false;
            }
        }

        /// <summary>
        /// Executing queries that does not return any data
        /// </summary>
        /// <param name="command">MySQL-Query as string</param>
        public void ConExecuteNonQuery(string command)
        {
            try
            {
                connection.Open();
                MySqlCommand Command = connection.CreateCommand();
                Command.CommandText = command;
                Command.ExecuteNonQuery();
                connection.Close();
                connection.Dispose();
            }
            catch (MySqlException ex)
            {
                DisplayError(ex);
            }
        }

        /// <summary>
        /// Executing queries that does return a single data
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="command"></param>
        /// <returns></returns>
        public T ConExecuteScalar<T>(string command)
        {
            object data;
            try
            {
                connection.Open();
                MySqlCommand Command = connection.CreateCommand();
                Command.CommandText = command;
                data = Command.ExecuteScalar();
                connection.Close();
                connection.Dispose();
                //TODO: (Workaround)
                if (data != null)
                {
                    return (T)Convert.ChangeType(data, typeof(T));
                }
                else
                {
                    return default(T);
                }
            }
            catch (MySqlException ex)
            {
                DisplayError(ex);
                //Return "Null"
                return default(T);
            }
        }

        /// <summary>
        /// Executing queries that does return a list of datas
        /// </summary>
        /// <param name="command">MySQL-Query as string</param>
        /// <returns name="data"></returns>
        public List<T> ConExecuteReader<T>(string command)
        {
            try
            {
                connection.Open();
                MySqlCommand Command = connection.CreateCommand();
                Command.CommandText = command;
                MySqlDataReader query = Command.ExecuteReader();
                List<T> data = new List<T>();
                while (query.Read())
                {
                    object obj = new Hero((int)query["id"]);
                    data.Add((T)obj);
                }
                connection.Close();
                connection.Dispose();
                return data;
            }
            catch (MySqlException ex)
            {
                DisplayError(ex);
                return null;
            }
        }

        /// <summary>
        /// Displays an Error Message to the User
        /// </summary>
        /// <param name="ex">Exception</param>
        public void DisplayError(Exception ex)
        {
            Console.WriteLine("Error: {0}", ex.ToString());
            if (MessageBox.Show("Datenbankfehler! Das Programm wird beendet!", "MySQL Error",
                MessageBoxButton.OK,
                MessageBoxImage.Error) == MessageBoxResult.OK)
            {
                Environment.Exit(1);
            }
        }
    }
}
