namespace ServerSide.Models
{
    internal class Message
    {
        public string Username { get; }
        public string Text { get; }
        public DateTime Date { get; }

        public Message(string username, string text)
        {
            Username = username;
            Text = text;

            Date = DateTime.Now;
        }
    }
}
