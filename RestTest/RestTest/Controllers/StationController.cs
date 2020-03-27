
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using FroggyRestServer.Models;
using Newtonsoft.Json;

namespace FroggyRestServer.Controllers
{
    public class StationController : ApiController
    {
        [HttpPost]
        [ActionName("update")]
        public Dictionary<string, object> UpdateStation([FromBody]Station Station)
        {
            Dictionary<String, object> map = Station.UpdateBucketsAndBattery();
            return map;
        }
    }
}
