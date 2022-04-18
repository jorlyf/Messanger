using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Primitives;
using ServerSide.Hubs;
using ServerSide.Models;
using ServerSide.Services;
using ServerSide.Utils;

namespace ServerSide.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ChatController : ControllerBase
	{
		private ChatManager ChatManager;
		private IHubContext<ChatHub, IChatHubClient> ChatHub;
		private FileManager FileManager;

		private int MaxMBAttachmentSize = 8;

		public ChatController(ChatManager chatManager, IHubContext<ChatHub, IChatHubClient> chatHub, FileManager fileManager)
		{
			this.ChatManager = chatManager;
			this.ChatHub = chatHub;
			this.FileManager = fileManager;
		}

		[HttpPost]
		[Route("SendMessage")]
		public IActionResult SendMessage([FromForm] InputMessage inputMessage)
		{
			if (!this.HttpContext.Request.Headers.TryGetValue("connectionId", out StringValues connectionId))
				return BadRequest("Auth exception");

			User? user = this.ChatManager.GetUserByConnectionID(connectionId);
			if (user == null) return BadRequest("Auth exception");
			if (!user.IsRegistrated) return BadRequest("Auth exception");

			List<string> attachmentUrls = new List<string>();
			if (inputMessage.Attachments is not null)
			{
				foreach (FileContainer fileContainer in inputMessage.Attachments)
				{
					if (!FileManager.IsFileSizeValid(fileContainer.File, this.MaxMBAttachmentSize)) continue;
					string? url = FileManager.SaveFile(fileContainer);
					if (url is null) continue;

					attachmentUrls.Add(url);
				}
			}

			if (inputMessage.MessageText is null) inputMessage.MessageText = "";
			Message message = this.ChatManager.CreateMessage(user, inputMessage.MessageText, attachmentUrls);
			string jsonMessage = JsonHelper.Serialize(message);
			Console.WriteLine(jsonMessage);
			this.ChatHub.Clients.All.ReceiveMessage(jsonMessage);

			return Ok();
		}
	}
}
