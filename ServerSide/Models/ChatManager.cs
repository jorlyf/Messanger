﻿using System.Collections.Generic;

namespace ServerSide.Models
{
	internal class ChatManager
	{
		public SynchronizedCollection<User> Users { get; } = new SynchronizedCollection<User>();

		public delegate Task Update(); 
		public event Update OnUsersUpdate;
		public uint NextMessageId { get; set; } = 1;


		public Message CreateMessage(User user, string text) => new Message(NextMessageId++, user.Username, text);

		public MembersInfo CreateMembersInfo()
		{
			List<string> authorizedUsers = new List<string>(Users.Where(u => u.IsRegistrated).Select(u => u.Username));
			return new MembersInfo(authorizedUsers);
		}

		public bool ConnectUser(string connectionId)
		{
			if (string.IsNullOrEmpty(connectionId)) return false;
			if (Users.FirstOrDefault(user => user.ConnectionId == connectionId) != null) return false;

			Users.Add(new User(connectionId));
			OnUsersUpdate();
			return true;
		}
		public void DisconnectUser(string connectionId)
		{
			User? user = Users.FirstOrDefault(user => user.ConnectionId == connectionId);
			if (user == null) return;

			Users.Remove(user);
			OnUsersUpdate();
		}

		public bool RegistrateUser(string connectionId, UserRegistration registration)
		{
			User? user = Users.FirstOrDefault(user => user.ConnectionId == connectionId);
			if (user == null) return false;
			if (user.IsRegistrated) return false;

			if (Users.FirstOrDefault(user => user.Username.ToLower() == registration.Username.ToLower()) != null) return false;

			user.Registrate(registration);
			OnUsersUpdate();
			return true;
		}

		public User? GetUserByConnectionID(string connectionId)
		{
			return Users.FirstOrDefault(user => user.ConnectionId == connectionId);
		}
	}
}
