using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FroggyRestServer.EMailClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FroggyRestServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EMailController : ControllerBase
    {

        private IEmailClient localClient;

        public EMailController()
        {
            //Using smtp.google.com, Port 587
            localClient = EMailProvider.CreateClient("smtp.gmail.com");
            localClient.SetCredentials("mtrx2kdev@gmail.com", "mypass123#");
            localClient.ConnectToServer();
        }
    }
}