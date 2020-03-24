
using System;
using System.Collections.Generic;
using FroggyRestServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace FroggyRestServer.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class StationController : ControllerBase
    {
        [HttpPost]
        [Route("update")]
        public Dictionary<String,object> UpdateStation([FromBody]Station Station ){
            return Station.UpdateBucketsAndBattery();
        }

        [HttpGet]
        [Route("debug")]
        public void DebugPrint([FromBody]Station Station)
        {
            Station.Debug();
        }


    }
}
