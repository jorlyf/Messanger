namespace ServerSide.Models
{
    internal class ChatManager
    {
        public List<User> Users { get; } = new List<User>();

        public bool ConnectUser(string connectionID)
        {
            if (string.IsNullOrEmpty(connectionID)) return false;
            if (Users.FirstOrDefault(user => user.ConnectionID == connectionID) == null) return false;           

            Users.Add(new User(connectionID));
            return true;
        }
        public void DisconnectUser(string connectionID)
        {
            User? user = Users.FirstOrDefault(user => user.ConnectionID == connectionID);
            if (user == null) return;

            Users.Remove(user);
        }

        public void RegistrateUser(string connectionID, UserRegistration registration)
        {
            User? user = Users.FirstOrDefault(user => user.ConnectionID == connectionID);
            if (user == null) return;
            if (user.IsRegistrated) return;
                 
            user.Registrate(registration);
        }

        public User? GetUserByConnectionID(string connectionID)
        {
            return Users.FirstOrDefault(user => user.ConnectionID == connectionID);
        }
    }
}
