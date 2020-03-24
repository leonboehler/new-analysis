using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FroggyRestServer.Models
{
    public class Bucket
    {
        public int Id { get; set; }
        public float Battery { get; set; }

        public float Latitude { get; set; }
        public float Longitude { get; set; }

        public int FrogAmount { get; set; }
        public int FrogAmountMax { get; set; }

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
    }
}
