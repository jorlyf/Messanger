using ServerSide.Hubs;
using ServerSide.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("https://localhost:7115");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
/// <summary>
/// service registration
/// </summary>
builder.Services.AddSingleton<ChatManager>();

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("Prod");
//app.UseCors("Dev");

//app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
	endpoints.MapHub<ChatHub>("/api/chathub");
});
app.MapControllers();
app.Run();
