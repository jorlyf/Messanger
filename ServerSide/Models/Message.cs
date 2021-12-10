using ServerSide.Utils;

namespace ServerSide.Models
{
	internal class Message
	{
		public uint Id { get; set; }
		public string Username { get; set; }
		public string Text { get; set; }
		public string Time { get; } = TimeService.TimeOfDay;

		public Message(uint id, string username, string text)
		{
			Id = id;
			Username = username;
			Text = text;
		}
	}
}
