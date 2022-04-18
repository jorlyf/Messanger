namespace ServerSide.Models
{
	public class FileContainer
	{
		public uint Id { get; set; }
		public IFormFile File { get; set; }
		public string Type { get; set; }
		public string FileName { get; set; }
	}
}
