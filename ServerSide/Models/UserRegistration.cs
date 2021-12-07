using System.Text.Json.Serialization;

namespace ServerSide.Models
{
	internal class UserRegistration
	{
		[JsonPropertyName("username")]
		public string Username { get; set; }

		public UserRegistration(string username)
		{
			Username = username;
		}
	}
}
