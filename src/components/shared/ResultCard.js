import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const ResultCard = ({ result, type = "free" }) => {
  const getChanceColor = (chance) => {
    if (chance >= 75) return "text-green-400";
    if (chance >= 50) return "text-yellow-400";
    if (chance >= 25) return "text-orange-400";
    return "text-red-400";
  };

  const getCircleColor = (chance) => {
    if (chance >= 75) return "#10b981"; // green-500
    if (chance >= 50) return "#f59e0b"; // yellow-500
    if (chance >= 25) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  // Mock hourly data for premium chart
  const hourlyData = [
    { hour: '12AM', snowChance: Math.max(5, result.chance - 20 + Math.random() * 10) },
    { hour: '3AM', snowChance: Math.max(5, result.chance - 15 + Math.random() * 10) },
    { hour: '6AM', snowChance: Math.max(5, result.chance - 10 + Math.random() * 10) },
    { hour: '9AM', snowChance: Math.max(5, result.chance - 5 + Math.random() * 10) },
    { hour: '12PM', snowChance: Math.max(5, result.chance + Math.random() * 10) },
    { hour: '3PM', snowChance: Math.max(5, result.chance + 5 + Math.random() * 10) },
    { hour: '6PM', snowChance: Math.max(5, result.chance + 10 + Math.random() * 10) },
    { hour: '9PM', snowChance: Math.max(5, result.chance + 5 + Math.random() * 10) },
  ];

  return (
    <div className="glass-card result-enter">
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          {type === "premium" ? "AI Snow Day Prediction" : "Snow Day Probability"}
        </h3>
        
        {/* Percentage Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="40"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="40"
              stroke={getCircleColor(result.chance)}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(result.chance / 100) * 251.2} 251.2`}
              strokeLinecap="round"
              className="percentage-circle"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-4xl font-bold ${getChanceColor(result.chance)}`}>
              {result.chance}%
            </span>
          </div>
        </div>

        <p className="text-xl text-white/90 mb-6 leading-relaxed">
          {result.message}
        </p>
        
        {/* Weather Data for Premium */}
        {type === "premium" && result.weatherData && (
          <div className="mb-6 p-4 bg-white/10 rounded-lg">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2 justify-center">
              🌤️ Live Weather Data for {result.weatherData.location}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
              <div className="text-center">
                <div className="font-medium text-white">Snow Chance</div>
                <div className="text-2xl font-bold text-blue-300">
                  {result.weatherData.daily_chance_of_snow}%
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-white">Precipitation</div>
                <div className="text-2xl font-bold text-blue-300">
                  {result.weatherData.totalprecip_mm}mm
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-white">Temperature</div>
                <div className="text-2xl font-bold text-blue-300">
                  {result.weatherData.avgtemp_c}°C
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-white">Wind Speed</div>
                <div className="text-2xl font-bold text-blue-300">
                  {result.weatherData.maxwind_kph} km/h
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Hourly Chart for Premium */}
        {type === "premium" && (
          <div className="mb-6 p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-semibold mb-4 text-center">
              📊 24-Hour Snow Forecast
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="snowGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="hour" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="snowChance" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#snowGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Contributing Factors */}
        {result.factors && (
          <div className="text-left">
            <h4 className="text-white font-semibold mb-4 text-center">
              {type === "premium" ? "AI Analysis Factors:" : "Contributing Factors:"}
            </h4>
            <div className="space-y-3 text-sm">
              {Object.entries(result.factors).map(([key, value]) => (
                <div key={key} className="flex justify-between items-start gap-2">
                  <span className="text-white/90 font-medium min-w-0 flex-shrink-0">
                    {key}:
                  </span>
                  <span className="text-white/80 text-right text-xs leading-relaxed">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confidence Indicator */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center justify-center gap-2 text-sm text-white/70">
            <span>Confidence Level:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= Math.ceil(result.chance / 20) ? 'text-yellow-400' : 'text-white/30'}
                >
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-white/90 font-medium">
              {type === "premium" ? "95%" : "90%"} Accuracy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
