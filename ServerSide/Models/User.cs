using ServerSide.Utils;

namespace ServerSide.Models
{
	internal class User
	{
		public string ConnectionId { get; }
		public string Username { get; private set; } = "Anon";
		public bool IsRegistrated { get; private set; } = false;
		public DateTime ConnectedTime { get; } = TimeService.FullDate;
		public User(string connectionId)
		{
			ConnectionId = connectionId;
		}

		public void Registrate(UserRegistration registration)
		{
			Username = registration.Username;
			IsRegistrated = true;
		}
	}
}
