using FroggyRestServer.EMailClient.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FroggyRestServer.EMailClient
{
    public interface IEmailClient
    {
        /// <summary>
        /// Sets local Email Address
        /// </summary>
        /// <param name="localEmail">Local Email userName</param>
        /// <param name="password">Local Email Password</param>
        void SetCredentials(string localEmail, string password);
        

        /// <summary>
        /// Connects to Server. Throws Exception if failed
        /// </summary>
        void ConnectToServer();

        /// <summary>
        /// Sends Message to User
        /// </summary>
        /// <param name="msg">Message</param>
        void SendMessage(DTOMailMessage mailMessage);
        
    }
}
