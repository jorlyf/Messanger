namespace ServerSide.Models
{
    internal class UserRegistration
    {
        public string Username { get; set; }

        public UserRegistration(string username)
        {
            Username = username;
        }
    }
}
