namespace ServerSide.Models
{
    internal class Message
    {
        public string Sender { get; }
        public string Text { get; }
        public DateTime Date { get; }

        public Message(string senderName, string text)
        {
            Sender = senderName;
            Text = text;

            Date = DateTime.Now;
        }
    }
}
