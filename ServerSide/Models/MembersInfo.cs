namespace ServerSide.Models
{
	internal class MembersInfo
	{
		public List<User> Users { get; }
		public DateTime Date { get; } = DateTime.Now;
		public MembersInfo(List<User> users)
		{
			Users = users;
		}
	}
}
