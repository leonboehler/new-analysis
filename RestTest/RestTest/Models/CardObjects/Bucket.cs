using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FroggyRestServer.Models
{
    public class Bucket
    {
        public int Id { get; set; }
        public int LocationId { get; set; }

        public String Name { get; set; }

        public float Battery { get; set; }
        
        public bool Reserved { get; set; }

        public Postition Postition { get; set; }


        public int FrogAmount { get; set; }
        public int FrogAmountMax { get; set; }


        public static Dictionary<string, object> GetAllFromDatabase(){
            String command = $"SELECT* FROM ui_bucket WHERE bucket_id";
            return MySQLConnector.ConExecuteReaderMany(command);
        }

        public void Debug()
        {
            System.Diagnostics.Debug.WriteLine(Id);
            System.Diagnostics.Debug.WriteLine(Battery);
            System.Diagnostics.Debug.WriteLine(FrogAmount);

        }

        public void UpdateFrogAmountAndBattery()
        {
            String BatteryString = Battery.ToString().Replace(",",".");
            System.Diagnostics.Debug.WriteLine($"{BatteryString}");

            String command = $"CALL fn_insert_bucket_data({Id},{FrogAmount},{BatteryString});";
            object Data = MySQLConnector.ConExecuteReaderSingle(command);

            // send email 

            System.Diagnostics.Debug.WriteLine(Data);
        }

        public Dictionary<string, object> InsertIntoDatabase()
        {
            string command = $"CALL fn_add_bucket({Id},'{Name}',{FrogAmountMax},{LocationId}, {Postition.GetStringForDatabase()});";
            System.Diagnostics.Debug.WriteLine(command);
            Dictionary<string, object> data = MySQLConnector.ConExecuteReaderSingle(command);
            return data;
        }
    }
}
