using System.Text.Json.Serialization;

namespace ServerSide.Models
{
	public class UserRegistration
	{
		[JsonPropertyName("username")]
		public string Username { get; set; }

		public UserRegistration(string username)
		{
			Username = username;
		}
	}
}
