using ServerSide.Hubs;
using ServerSide.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("https://localhost:7115");

//builder.WebHost.UseKestrel();
//builder.WebHost.ConfigureKestrel(config =>
//{
//	config.ListenLocalhost(7115);
//});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
	options.AddPolicy("Dev", policy =>
	{
		policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
	options.AddPolicy("Prod", policy =>
	{
		policy.WithOrigins("http://localhost", "https://localhost")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
});

// full debug logging
builder.Logging.AddFilter("Microsoft.AspNetCore.SignalR", LogLevel.Debug);

#region Service registration
builder.Services.AddSingleton<ChatManager>();
#endregion

WebApplication app = builder.Build();

Console.WriteLine($"IsDevelopment - {app.Environment.IsDevelopment()}");
if (app.Environment.IsDevelopment())
{
	app.UseCors("Dev");
}
else
{
	app.UseCors("Prod");
}

//app.UseHttpsRedirection();
app.UseRouting();

//app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
	endpoints.MapHub<ChatHub>("/api/chathub");
});
app.MapControllers();
app.Run();
