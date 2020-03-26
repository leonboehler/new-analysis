using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FroggyRestServer.Models

    // Statio -> Location -> Bucket  
{   
    public class Location
    {
        public String Name { get; set; }
        public int Id { get; set; }
        public String Description { get; set; }
        
        public String Street { get; set; }
        public int PostalCode { get; set; }

    
        public String City { get; set; }
        public String State { get; set; }

        public String RouteLength { get; set; }

        public List<Postition> LocationMarkers { get; set; }

        public int StationId { get; set; }

        public List<Bucket> Buckets { get; set; }

        public static Dictionary<string, object> GetFromDatabase()
        {
            string commandGetLocation = $"SELECT * FROM ui_location";
            Dictionary<string, object> sqlResultLocation = MySQLConnector.ConExecuteReaderMany(commandGetLocation);
            List<Dictionary<string, object>> locations = (List<Dictionary<string, object>>)sqlResultLocation["data"];

            if ((int)sqlResultLocation["code"] != 200)
            {
                return sqlResultLocation;
            }

            foreach (Dictionary<string,object> location in locations)
            {
                int locationId = (int) location["location_id"];
                string commandGetMarked = $"SELECT * FROM ui_location_marker WHERE location_id = {locationId}";

                Dictionary<string, object> sqlResultMarker = MySQLConnector.ConExecuteReaderMany(commandGetMarked);

                if ((int)sqlResultMarker["code"] != 200)
                {
                    return sqlResultLocation;
                }

                List<Dictionary<string, object>> marker = (List<Dictionary<string, object>>)sqlResultMarker["data"];
                location["LocationMarkers"] = marker;
            }

            return sqlResultLocation;
        }

        public Dictionary<string, object> InsertIntoDatabase()
        {
            String insertCommand = $"CALL fn_add_location(" +
                $"'{Name}', " +
                $"'{Description}', " +
                $"'{Street}','{PostalCode}', '{City}','{State}', '{State}', " +
                $"'{RouteLength}'," +
                $"{StationId});";
            Dictionary<string, object> data = MySQLConnector.ConExecuteReaderSingle(insertCommand);
            if (LocationMarkers != null)
            {
                InsertLocationMarker();
            }

            return data;
        }

        public Dictionary<string, object> InsertLocationMarker()
        {
            Dictionary<string, object> data = new Dictionary<string,object>();
            foreach (Postition postition in LocationMarkers)
            {
                string commandInsert = $"CALL fn_add_location_marker({Id},{postition.GetStringForDatabase()});";
                data = MySQLConnector.ConExecuteReaderSingle(commandInsert);

                if ((int)data["code"] != 200)
                {
                    return data;
                }
            }

            return data;
        }
    }
}
