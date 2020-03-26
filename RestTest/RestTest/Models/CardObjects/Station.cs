using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FroggyRestServer.Models
{
    public class Station
    {
        public int Id { get; set; }
        public float Battery { get; set; }
        public Postition Postition { get; set; }
        public List<Bucket> Buckets { get; set; }
        public List<Location> Locations { get; set; }


        public Dictionary<String,object> UpdateBucketsAndBattery()
        {
            if (Buckets != null)
            {
                foreach (Bucket Bucket in Buckets)
                {
                    Bucket.UpdateFrogAmountAndBattery();
                }
            }

            String BatteryString = Battery.ToString().Replace(",", ".");
            System.Diagnostics.Debug.WriteLine($"{BatteryString}");

            String command = $"CALL fn_insert_station_data({Id},{BatteryString});";
            return MySQLConnector.ConExecuteReaderSingle(command);

        }

        public static Dictionary<string, object> GetAllFromDatabase()
        {
            String command = $" SELECT * FROM ui_station;";
            return MySQLConnector.ConExecuteReaderMany(command);
        }

        public Dictionary<String, object> InsertIntoDatabase()
        {
            String commandInsert = $"CALL fn_add_station({Id},{Postition.GetStringForDatabase()});";
            
            return MySQLConnector.ConExecuteReaderSingle(commandInsert);
        }
   

        public void Debug()
        {
            System.Diagnostics.Debug.WriteLine(Id);
            System.Diagnostics.Debug.WriteLine(Battery);
            System.Diagnostics.Debug.WriteLine(Buckets);

            foreach (Bucket Bucket in Buckets)
            {
                Bucket.Debug();
            }
        }
    }
}
