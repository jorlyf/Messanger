namespace ServerSide.Hubs
{
	public interface IChatHubClient
	{
		public Task ReceiveMessage(string message);
		public Task ReceiveRegistrationAnswer(string message);
		public Task ReceiveOnlineMembersList(string json);
	}
}
