using ServerSide.Utils;

namespace ServerSide.Models
{
	public class User
	{
		public string ConnectionId { get; }
		public string Username { get; private set; } = "Anon";
		public bool IsRegistrated { get; private set; } = false;
		public DateTime ConnectedTime { get; } = TimeUtils.FullDate;
		public User(string connectionId)
		{
			this.ConnectionId = connectionId;
		}

		public void Registrate(UserRegistration registration)
		{
			this.Username = registration.Username;
			this.IsRegistrated = true;
		}
	}
}
