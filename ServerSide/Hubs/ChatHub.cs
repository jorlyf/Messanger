using Microsoft.AspNetCore.SignalR;
using ServerSide.Models;
using ServerSide.Services;
using ServerSide.Utils;

namespace ServerSide.Hubs
{
	internal class ChatHub : Hub<IChatHub>
	{
		private readonly ChatManager ChatManager;
		public ChatHub(ChatManager chatManager)
		{
			this.ChatManager = chatManager;
			this.ChatManager.OnUsersUpdate += this.SendMembersInfo;
		}
		protected override void Dispose(bool disposing)
		{
			base.Dispose(disposing);
			this.ChatManager.OnUsersUpdate -= this.SendMembersInfo;
		}

		public async Task SendMessage(string messageText)
		{
			User? user = ChatManager.GetUserByConnectionID(Context.ConnectionId);
			if (user == null) return;
			if (!user.IsRegistrated) return;

			Message message = ChatManager.CreateMessage(user, messageText);
			string jsonMessage = JsonHelper.Serialize(message);
			//await this.Clients.Others.SendAsync("ReceiveMessage", jsonMessage);
			await this.Clients.Others.ReceiveMessage(jsonMessage);
		}
		public async Task Registrate(string data)
		{
			UserRegistration? registration = JsonHelper.Deserialize<UserRegistration>(data);
			if (registration == null) return;

			if (ChatManager.RegistrateUser(Context.ConnectionId, registration))
				//await this.Clients.Caller.SendAsync("ReceiveRegistrationAnswer", "ok");
				await this.Clients.Caller.ReceiveRegistrationAnswer("ok");
			else
				//await this.Clients.Caller.SendAsync("ReceiveRegistrationAnswer", "error");
				await this.Clients.Caller.ReceiveRegistrationAnswer("error");
		}
		private async Task SendMembersInfo()
		{
			MembersInfo onlineUsers = ChatManager.CreateMembersInfo();
			string jsonOnlineUsers = JsonHelper.Serialize(onlineUsers);
			//await this.Clients.All.SendAsync("ReceiveOnlineUsers", jsonOnlineUsers);
			await this.Clients.All.ReceiveOnlineMembersList(jsonOnlineUsers);
		}
		#region Connect and Disconnect
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
		#endregion
	}
}
