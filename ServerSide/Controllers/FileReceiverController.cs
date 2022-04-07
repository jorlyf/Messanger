using Microsoft.AspNetCore.Mvc;
using ServerSide.Hubs;

namespace ServerSide.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FileReceiverController : ControllerBase
	{
		public FileReceiverController()
		{

		}

		[HttpPost]
		[Route("AttachMessageImages")]
		public IActionResult AttachMessageImages(IEnumerable<IFormFile> files)
		{
			foreach (var file in files)
			{
				Console.WriteLine(file.FileName);
			}
			return Ok("ok!");
		}
	}
}
