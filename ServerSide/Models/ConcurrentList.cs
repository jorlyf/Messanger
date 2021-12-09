namespace ServerSide.Models
{
	public class ConcurrentList<T>
	{
		private readonly List<T> Items;
		private readonly ReaderWriterLockSlim Lock;
		public ConcurrentList()
		{
			Items = new List<T>();
			Lock = new ReaderWriterLockSlim();
		}

		public void Add(T item)
		{
			Lock.EnterWriteLock();
			try
			{
				Items.Add(item);
			}
			finally
			{
				Lock.ExitWriteLock();
			}
		}
	}
}