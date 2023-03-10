function isTonight(forecast) {
  const now = new Date(Date.now());
  const nightStartHour = 18;
  const nightDurationHours = 12;
  const nightStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nightStartHour, 0, 0)
  const nightEnd = new Date(nightStart.getTime() + nightDurationHours * 60 * 60 * 1000) 
  return forecast.dt * 1000 >= nightStart.getTime() && forecast.dt * 1000 <= nightEnd.getTime();
}

async function updateRugGuide() {
  $("#weather").text("Updated")

  const x = "404b509674bb4dfe117be467b2333c2c"
  // lat: 52°18'10.08, long: -0°8'12.12
  // lat: 52.3028°, long: -0.1367°
  const [lat, lon] = [52.3028, -0.1367]
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${x}`);
  const data = await response.json();
  
  forecasts = data.list.filter(isTonight);
  console.log("Date and time: temperature, feels like temperature")
  console.log(forecasts.map(f => `${new Date(f.dt * 1000)}: ${f.main.temp}, ${f.main.feels_like}`).join("\n"));
  average_temp = forecasts.map(f => f.main.feels_like).reduce((a, b) => a+b, 0) / forecasts.length;
  console.log(`Average feels like: ${average_temp}`)

  // https://www.windmillfeeds.co.uk/wp-content/uploads/2019/01/BETA.jpg
  // https://www.beta-uk.org/media/trade/download/39672-BETA%20Outdoor%20Rug%20Insert%20v3.pdf
  // https://www.equus.co.uk/blogs/community/temperature-guide-to-rugging-a-horse
}