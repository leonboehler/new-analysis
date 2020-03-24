using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FroggyRestServer.EMailClient.DTO
{
    public class DTOMailMessage
    {
        /// <summary>
        /// All Recievers of this message
        /// </summary>
        public string[] Recievers { get; set; }

        /// <summary>
        /// Title / Subject of Mail
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Content / Body of Mail
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// If True, the Content (HTML) is being Parsed and shown.
        /// Default: false
        /// </summary>
        public bool ParseHTML { get; set; }

    }
}
