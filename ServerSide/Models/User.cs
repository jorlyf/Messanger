namespace ServerSide.Models
{
    internal class User
    {
        public string ConnectionID { get; }
        public string Name { get; }
        public DateTime ConnectedTime { get; }
        public User(string connectionID, string name)
        {
            ConnectionID = connectionID;
            Name = name;

            ConnectedTime = DateTime.Now;
        }
    }
}
