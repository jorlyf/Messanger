using Microsoft.AspNetCore.SignalR;

namespace ServerSide.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string json)
        {
            await this.Clients.All.SendAsync("ReceiveMessage", json);
        }
    }
}
