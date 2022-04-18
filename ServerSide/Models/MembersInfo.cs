using ServerSide.Utils;

namespace ServerSide.Models
{
	public class MembersInfo
	{
		public IEnumerable<string> Usernames { get; }
		public DateTime Date { get; } = TimeUtils.FullDate;
		public MembersInfo(IEnumerable<string> usernanemes)
		{
			Usernames = usernanemes;
		}
	}
}
