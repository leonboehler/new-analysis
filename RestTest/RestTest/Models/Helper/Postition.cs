using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FroggyRestServer.Models
{
    public class Postition
    {
        public float Longitude { get; set; }
        public float Latitude { get; set; }


        public String GetStringForDatabase()
        {

            String PositionLatitude = Latitude.ToString().Replace(",", ".");
            String PositionLongitude = Longitude.ToString().Replace(",", ".");
            return $"{PositionLatitude},{PositionLongitude}";

        }
    }
}
