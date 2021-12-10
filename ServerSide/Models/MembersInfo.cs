using ServerSide.Utils;

namespace ServerSide.Models
{
	internal class MembersInfo
	{
		public List<string> Usernames { get; }
		public DateTime Date { get; } = TimeService.FullDate;
		public MembersInfo(IEnumerable<string> usernanemes)
		{
			Usernames = (List<string>)usernanemes;
		}
	}
}
