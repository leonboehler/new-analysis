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
        public List<Bucket> Buckets { get; set; }


        public Dictionary<String,object> UpdateBucketsAndBattery()
        {
            foreach(Bucket Bucket in Buckets)
            {
                Bucket.UpdateFrogAmountAndBattery();
            }

            String BatteryString = Battery.ToString().Replace(",", ".");
            System.Diagnostics.Debug.WriteLine($"{BatteryString}");

            String command = $"CALL fn_insert_station_data({Id},{BatteryString});";
            return MySQLConnector.ConExecuteReaderSingle(command);

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
