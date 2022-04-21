using ServerSide.Models;

namespace ServerSide.Services
{
	internal static class Logger
	{
		#region User
		public static void UserConnected(User user)
		{
			Write($"User {user.Username} was connected.");
		}
		public static void UserDisconnected(User user)
		{
			Write($"User {user.Username} was disconnected.");
		}

		public static void UserAuthorized(User user)
		{
			Write($"User {user.Username} was authorized.");
		}
		public static void UserSentMessage(User user, string messageText)
		{
			Write($"User {user.Username} sent message: {messageText}");
		}
		public static void UserSentAttachment(User user, FileContainer fileContainer)
		{
			Write($"User {user.Username} sent attachment: {fileContainer.File.FileName}");
		}
		#endregion

		public static void ExceptionOccured(Exception ex)
		{
			Write($"Exception: {ex.Message}");
		}

		public static void Write(string message)
		{
			Console.WriteLine($"[Log] {DateTime.UtcNow.ToLocalTime().ToShortTimeString()} {message}");
		}
	}
}
