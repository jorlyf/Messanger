namespace ServerSide.Models
{
	public class InputMessage
	{
		public string? MessageText { get; set; }
		public IEnumerable<FileContainer>? Attachments { get; set; }
	}
}
