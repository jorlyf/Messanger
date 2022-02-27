namespace ServerSide.Utils
{
	public static class TimeUtils
	{
		public static DateTime FullDate { get => DateTime.Today.ToLocalTime(); }
		public static string TimeOfDay { get => DateTime.Now.ToShortTimeString(); }
	}
}
