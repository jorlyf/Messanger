namespace ServerSide.Models
{
	internal class ChatManager
	{
		public List<User> Users { get; } = new List<User>();
		public uint NextMessageId { get; set; } = 1;


		public Message CreateMessage(User user, string text)
		{
			return new Message(NextMessageId++, user.Username, text);
		}

		public bool ConnectUser(string connectionId)
		{
			if (string.IsNullOrEmpty(connectionId)) return false;
			if (Users.FirstOrDefault(user => user.ConnectionId == connectionId) != null) return false;

			Users.Add(new User(connectionId));
			return true;
		}
		public void DisconnectUser(string connectionId)
		{
			User? user = Users.FirstOrDefault(user => user.ConnectionId == connectionId);
			if (user == null) return;

			Users.Remove(user);
		}

		public bool RegistrateUser(string connectionId, UserRegistration registration)
		{
			User? user = Users.FirstOrDefault(user => user.ConnectionId == connectionId);
			if (user == null) return false;
			if (user.IsRegistrated) return false;

			if (Users.FirstOrDefault(user => user.Username.ToLower() == registration.Username.ToLower()) != null) return false;

			user.Registrate(registration);
			return true;
		}

		public User? GetUserByConnectionID(string connectionId)
		{
			return Users.FirstOrDefault(user => user.ConnectionId == connectionId);
		}
	}
}
