namespace ServerSide.Models
{
    internal class User
    {
        public string ConnectionID { get; }
        public string Username { get; private set; }
        public bool IsRegistrated { get; private set; }
        public DateTime ConnectedTime { get; }
        public User(string connectionID)
        {
            ConnectionID = connectionID;
            ConnectedTime = DateTime.Now;
        }

        public void Registrate(UserRegistration registration)
        {
            Username = registration.Username;
            IsRegistrated = true;
        }
    }
}
