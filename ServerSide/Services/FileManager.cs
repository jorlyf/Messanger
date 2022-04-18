using ServerSide.Models;

namespace ServerSide.Services
{
	public class FileManager
	{
		private DirectoriesManager DirectoriesManager;
		public FileManager(DirectoriesManager directoriesManager)
		{
			this.DirectoriesManager = directoriesManager;
		}
		/// <summary>
		/// Save file in repository
		/// </summary>
		/// <returns>Url to file</returns>
		public string? SaveFile(FileContainer fileContainer)
		{
			IFormFile file = fileContainer.File;
			if (file is null) return null;

			string fileDirectory = this.DirectoriesManager.Attachments;
			string? fileExtension = file.FileName.Split(".").LastOrDefault();
			if (string.IsNullOrEmpty(fileExtension)) return null;

			string fileName = GetRandomFileName(fileExtension);
			string fullPath = Path.Combine(fileDirectory, fileName);

			using (FileStream fs = new FileStream(fullPath, FileMode.Create))
			{
				file.CopyTo(fs);
			}

			return $"/api/Files/{fileName}";
		}
		public bool IsFileSizeValid(IFormFile file, int maxMBsize)
		{
			if (file is null) return false;
			return file.Length <= maxMBsize * Math.Pow(2, 20);
		}
		private string GetRandomFileName(string extension)
		{
			return Path.GetRandomFileName().Split(".")[0] + "." + extension;
		}
	}
}
