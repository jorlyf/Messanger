using ServerSide.Utils;

namespace ServerSide.Models
{
	public class Message
	{
		public uint Id { get; set; }
		public string Username { get; set; }
		public string Text { get; set; }
		public IEnumerable<string> AttachmentUrls { get; set; }
		public string Time { get; } = TimeUtils.TimeOfDay;

		public Message(uint id, string username, string text, IEnumerable<string> attachmentUrls)
		{
			this.Id = id;
			this.Username = username;
			this.Text = text;
			this.AttachmentUrls = attachmentUrls;
		}
	}
}
