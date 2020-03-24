using FroggyRestServer.EMailClient.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace FroggyRestServer.EMailClient
{
    internal class EMailClient : IEmailClient
    {
        private SmtpClient client;
        private string smtpServerAddress;
        private int smtpServerPort;

        private NetworkCredential localCredentials;
        private MailAddress localEmail;

        public EMailClient(string serverAddress, int port)
        {
            this.smtpServerAddress = serverAddress;
            this.smtpServerPort = port;

        }

        public void ConnectToServer()
        {
            this.client = new SmtpClient(this.smtpServerAddress, this.smtpServerPort);

            this.client.DeliveryMethod = SmtpDeliveryMethod.Network;
            this.client.UseDefaultCredentials = false;
            this.client.Credentials = this.localCredentials;
            this.client.EnableSsl = true;
        }

        public void SendMessage(DTOMailMessage msg)
        {
            MailMessage mm = new MailMessage();

            mm.From = localEmail;
            mm.To.Add(string.Join(",", msg.Recievers));

            mm.Subject = msg.Title;
            mm.Body = msg.Content;
            mm.IsBodyHtml = msg.ParseHTML;

            this.client.Send(mm);
        }

        public void SetCredentials(string localEmail, string password)
        {
            this.localEmail = new MailAddress(localEmail);
            this.localCredentials = new NetworkCredential(localEmail, password);
        }
    }
}
