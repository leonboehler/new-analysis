using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FroggyRestServer.EMailClient
{
    public class EMailProvider
    {

        /// <summary>
        /// Creates an EMailClient.
        /// </summary>
        /// <param name="serverAddress">Address of smtp Server</param>
        /// <param name="port">Port of smtp Server, default 587</param>
        /// <returns>IEmailClient Object</returns>
        public static IEmailClient CreateClient(string serverAddress, int port= 587)
        {
            return new EMailClient(serverAddress, port);
        }
    }
}
