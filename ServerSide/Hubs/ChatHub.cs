using Microsoft.AspNetCore.SignalR;
using ServerSide.Models;

namespace ServerSide.Hubs
{
    internal class ChatHub : Hub
    {
        private readonly ChatManager ChatManager = new ChatManager();
        public async Task SendMessage(string messageText)
        {
            User? user = ChatManager.GetUserByConnectionID(Context.ConnectionId);
            if (user == null) return;

            Message message = new Message(user.Name, messageText);
            await this.Clients.All.SendAsync("ReceiveMessage", message);
        }

        public override Task OnConnectedAsync()
        {
            ChatManager.ConnectUser(Context.ConnectionId, Context.User?.Identity?.Name ?? "Аноним");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            ChatManager.DisconnectUser(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
