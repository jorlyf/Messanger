using Microsoft.AspNetCore.SignalR;
using ServerSide.Models;
using ServerSide.Services;
using ServerSide.Utils;

namespace ServerSide.Hubs
{
	internal class ChatHub : Hub<IChatHubClient>
	{
		private readonly ChatManager ChatManager;
		public ChatHub(ChatManager chatManager)
		{
			this.ChatManager = chatManager;
			this.ChatManager.OnUsersUpdate += this.SendMembersInfo;
		}
		protected override void Dispose(bool disposing)
		{
			this.ChatManager.OnUsersUpdate -= this.SendMembersInfo;
			base.Dispose(disposing);
		}

		public async Task SendMessage(string messageText)
		{
			User? senderUser = this.ChatManager.GetUserByConnectionID(Context.ConnectionId);
			if (senderUser is null) return;
			if (!senderUser.IsRegistrated) return;

			Message message = this.ChatManager.CreateMessage(senderUser, messageText);
			string jsonMessage = JsonHelper.Serialize(message);

			Logger.UserSentMessage(senderUser, messageText);

			await this.Clients.Others.ReceiveMessage(jsonMessage);
		}
		public async Task Registrate(string data)
		{
			UserRegistration? registration = JsonHelper.Deserialize<UserRegistration>(data);
			if (registration is null) return;

			if (this.ChatManager.RegistrateUser(Context.ConnectionId, registration))
			{
				User? user = this.ChatManager.GetUserByConnectionID(Context.ConnectionId);
				if (user is null) return;
				Logger.UserAuthorized(user);
				await this.Clients.Caller.ReceiveRegistrationAnswer("ok");
			}
			else
			{
				await this.Clients.Caller.ReceiveRegistrationAnswer("error");
			}
		}
		private async Task SendMembersInfo()
		{
			MembersInfo onlineUsers = this.ChatManager.CreateMembersInfo();
			string jsonOnlineUsers = JsonHelper.Serialize(onlineUsers);
			await this.Clients.All.ReceiveOnlineMembersList(jsonOnlineUsers);
		}
		#region Connect and Disconnect
		public override Task OnConnectedAsync()
		{
			User? user = this.ChatManager.ConnectUser(Context.ConnectionId);
			if (user is not null)
			{
				Logger.UserConnected(user);
			}
			return base.OnConnectedAsync();
		}
		public override Task OnDisconnectedAsync(Exception? exception)
		{
			User? user = this.ChatManager.DisconnectUser(Context.ConnectionId);
			if (user is not null)
			{
				Logger.UserDisconnected(user);
			}
			return base.OnDisconnectedAsync(exception);
		}
		#endregion
	}
}
