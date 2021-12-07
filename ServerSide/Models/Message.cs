namespace ServerSide.Models
{
	internal class Message
	{
		public uint Id { get; set; }
		public string Username { get; set; }
		public string Text { get; set; }
		public DateTime Date { get; } = DateTime.Now;

		public Message(uint id, string username, string text)
		{
			Id = id;
			Username = username;
			Text = text;
		}
	}
}
