﻿using System.Text.Json;

namespace ServerSide.Utils
{
	internal static class JsonHelper
	{
		public static string Serialize(object obj)
		{
			return JsonSerializer.Serialize(obj);
		}
		public static T Deserialize<T>(string json)
		{
			T? result = JsonSerializer.Deserialize<T>(json);
			return result;
		}
	}
}
