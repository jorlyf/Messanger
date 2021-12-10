namespace ServerSide.Utils
{
	public static class TimeService
	{
		public static DateTime FullDate { get => DateTime.Today.ToLocalTime(); }
		public static string TimeOfDay { get => DateTime.Now.ToShortTimeString(); }
	}
}
