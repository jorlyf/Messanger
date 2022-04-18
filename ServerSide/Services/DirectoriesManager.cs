namespace ServerSide.Services
{
	public class DirectoriesManager
	{
		public string Root { get => Environment.CurrentDirectory; }
		public string Attachments { get => Path.Combine(this.Root, "Files"); }
	}
}
