using ServerSide.Hubs;
using ServerSide.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
	options.AddPolicy("ClientPermission", policy =>
	{
		policy.AllowAnyHeader()
			.AllowAnyMethod()
			.WithOrigins("http://localhost:3000")
			.AllowCredentials();
	});
});

builder.Services.AddSingleton<ChatManager>();

var app = builder.Build();

//Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("ClientPermission");

app.UseRouting();


//app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
	endpoints.MapHub<ChatHub>("/chathub");
});
app.MapControllers();

app.Run();
