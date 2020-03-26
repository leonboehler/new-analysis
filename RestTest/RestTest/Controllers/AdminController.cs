using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using FroggyRestServer.Models;
using Newtonsoft.Json;


namespace FroggyRestServer.Controllers
{ 
    public class AdminController : ApiController
    {

        [HttpPost]
        [ActionName("stationcreate")]
        public Dictionary<string, object> CreateSation([FromBody]Station station)
        {

            Dictionary<string, object> map = station.InsertIntoDatabase();
            return map;
        }

        [HttpPost]
        [ActionName("locationcreate")]
        public Dictionary<string, object> CreateLocation([FromBody]Location location)
        {
            Dictionary<string, object> map = location.InsertIntoDatabase();
            return map;
        }

        [HttpPost]
        [ActionName("locationinsertmarker")]
        public Dictionary<string, object> InsertLocationMarker([FromBody]Location location)
        {
            Dictionary<string, object> map = location.InsertLocationMarker();
            return map;
        }

        [HttpPost]
        [ActionName("usercreate")]
        public Dictionary<string, object> CreateUser([FromBody]User user)
        {
            Dictionary<string, object> map = user.InsertToDatabase();
            return map;
        }

        [HttpPost]
        [ActionName("bucketcreate")]
        public Dictionary<string, object> CreateBucket([FromBody]Bucket bucket)
        {
            Dictionary<string, object> map = bucket.InsertIntoDatabase();
            System.Diagnostics.Debug.WriteLine(bucket.LocationId);
            return map;
        }
    }
}
