
using FroggyRestServer.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Http;

namespace FroggyRestServer.Controllers
{
    public class MapController : ApiController
    {

        [HttpGet]
        [ActionName("all")]
        public Dictionary<string, object> GetAll()
        {
            Dictionary<string, object> locationSQLReturndata = Location.GetFromDatabase();
            List<Dictionary<string,object>> locations = (List<Dictionary<string, object>>)locationSQLReturndata["data"];

            foreach(Dictionary<string, object> location in locations)
            {
                
            }

            return locationSQLReturndata;
        }

        [HttpGet]
        [ActionName("allstations")]
        public Dictionary<string, object> GetAllStations()
        {
            Dictionary<string, object> data = Station.GetAllFromDatabase();
            return data;
        }

        [HttpGet]
        [ActionName("alllocations")]
        public Dictionary<string, object> GetAllLocations()
        {

            Dictionary<string, object> data = Location.GetFromDatabase();
            return data;

        }

        [HttpGet]
        [ActionName("allbuckets")]
        public Dictionary<string, object> GetAllBuckets()
        {

            Dictionary<string, object> data = Bucket.GetAllFromDatabase();
            return data;

        }
    }
}
