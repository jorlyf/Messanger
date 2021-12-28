using ServerSide.Hubs;
using ServerSide.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(policy =>
	{
		policy.WithOrigins("http://192.168.1.10:3000")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
});

builder.Services.AddSingleton<ChatManager>();
WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();

//app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
	endpoints.MapHub<ChatHub>("/chathub");
});
app.MapControllers();
app.Run();
