using ServerSide.Models;

namespace ServerSide.Services
{
	public class ChatManager
	{
		private readonly SynchronizedCollection<User> AnonimUsers;
		private readonly SynchronizedCollection<User> AuthorizedUsers;
		public delegate Task Update();
		public event Update? OnUsersUpdate;

		public ChatManager()
		{
			this.AnonimUsers = new SynchronizedCollection<User>();
			this.AuthorizedUsers = new SynchronizedCollection<User>();
		}

		public uint NextMessageId { get; set; } = 1;
		public Message CreateMessage(User user, string text, IEnumerable<string> attachmentUrls)
			=> new Message(NextMessageId++, user.Username, text, attachmentUrls);
		public MembersInfo CreateMembersInfo()
		{
			List<string> authorizedUsers = new List<string>(this.AuthorizedUsers.Select(u => u.Username));
			return new MembersInfo(authorizedUsers);
		}

		public User? ConnectUser(string connectionId)
		{
			if (string.IsNullOrEmpty(connectionId)) return null;
			if (GetUserByConnectionID(connectionId) is not null) return null;

			User user = new User(connectionId);
			this.AnonimUsers.Add(user);
			return user;
		}
		public User? DisconnectUser(string connectionId)
		{
			User? user = GetUserByConnectionID(connectionId);
			if (user is null) return null;

			this.AnonimUsers.Remove(user);
			this.AuthorizedUsers.Remove(user);

			this.OnUsersUpdate?.Invoke();
			return user;
		}
		public bool RegistrateUser(string connectionId, UserRegistration registration)
		{
			User? user = GetUserByConnectionID(connectionId);
			if (user is null) return false;
			if (user.IsRegistrated) return false;

			if (this.AuthorizedUsers.Any(user => user.Username.ToLower() == registration.Username.ToLower())) return false;

			user.Registrate(registration);

			this.AuthorizedUsers.Add(user);
			this.AnonimUsers.Remove(user);

			this.OnUsersUpdate?.Invoke();
			return true;
		}

		public User? GetUserByConnectionID(string connectionId)
		{
			User? authorizedUser = this.AuthorizedUsers.FirstOrDefault(user => user.ConnectionId == connectionId);
			if (authorizedUser is not null) return authorizedUser;

			User? anonimUser = this.AnonimUsers.FirstOrDefault(user => user.ConnectionId == connectionId);
			if (anonimUser is not null) return anonimUser;

			return null;
		}
	}
}