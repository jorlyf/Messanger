using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;


using MessangerAPI.Models;

namespace MessangerAPI.Hubs
{
    public class ChatHub : Hub
    {
        private int _lastid = 0;
        private readonly List<User> Users = new List<User>();
        public async Task SendMessage(string message)
        {
            await this.Clients.All.SendAsync(message);
        }

        public void Connect(string name)
        {
            Users.Add(new User { Id = ++_lastid, Name = name });
        }
    }
}
