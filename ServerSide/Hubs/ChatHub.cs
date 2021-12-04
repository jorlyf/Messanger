using Microsoft.AspNetCore.SignalR;
using ServerSide.Models;
using ServerSide.Utils;

namespace ServerSide.Hubs
{
    internal class ChatHub : Hub
    {
        private readonly ChatManager ChatManager = new ChatManager();
        public async Task SendMessage(string data)
        {
            User? user = ChatManager.GetUserByConnectionID(Context.ConnectionId);
            if (user == null) return;
            if (!user.IsRegistrated) return;

            Message message = new Message(user.Username, data);
            string jsonMessage = JsonHelper.Serialize(message);
            await this.Clients.All.SendAsync("ReceiveMessage", jsonMessage);
        }

        public async Task Registrate(string data)
        {
            UserRegistration? registration = JsonHelper.Deserialize<UserRegistration>(data);
            if (registration == null) return;

            ChatManager.RegistrateUser(Context.ConnectionId, registration);

            await this.Clients.Caller.SendAsync("ReceiveRegistrationAnswer", "ok");
        }

        public override Task OnConnectedAsync()
        {
            ChatManager.ConnectUser(Context.ConnectionId);
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            ChatManager.DisconnectUser(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
