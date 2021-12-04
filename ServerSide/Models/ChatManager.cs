namespace ServerSide.Models
{
    internal class ChatManager
    {
        public List<User> Users { get; } = new List<User>();

        public bool ConnectUser(string connectionID, string name)
        {
            if (string.IsNullOrEmpty(connectionID)) return false;
            if (Users.FirstOrDefault(user => user.ConnectionID == connectionID) == null) return false;           

            Users.Add(new User(connectionID, name));
            return true;
        }
        public void DisconnectUser(string connectionID)
        {
            User? user = Users.FirstOrDefault(user => user.ConnectionID == connectionID);
            if (user == null) return;

            Users.Remove(user);
        }

        public User? GetUserByConnectionID(string connectionID)
        {
            return Users.FirstOrDefault(user => user.ConnectionID == connectionID);
        }
    }
}
