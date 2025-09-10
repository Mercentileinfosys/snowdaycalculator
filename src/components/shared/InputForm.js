import React from 'react';
import { Snowflake, Thermometer, Wind, MapPin } from 'lucide-react';

const InputForm = ({ formData, onInputChange, onSubmit, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Enter Weather Conditions
        </h2>
        <p className="text-white/80 text-sm">
          Fill in all fields below to calculate your snow day probability
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Snowfall Input */}
        <div>
          <label htmlFor="snowfall" className="block text-white/90 font-medium mb-2 flex items-center gap-2">
            <Snowflake className="h-4 w-4" />
            Expected Snowfall (inches)
          </label>
          <input
            id="snowfall"
            type="number"
            step="0.1"
            min="0"
            max="50"
            placeholder="e.g., 6.5"
            value={formData.snowfall}
            onChange={(e) => onInputChange("snowfall", e.target.value)}
            className="form-input"
            required
          />
          <p className="text-white/60 text-xs mt-1">
            Check your local weather forecast for expected accumulation
          </p>
        </div>

        {/* Temperature Input */}
        <div>
          <label htmlFor="temperature" className="block text-white/90 font-medium mb-2 flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Temperature (°F)
          </label>
          <input
            id="temperature"
            type="number"
            step="1"
            min="-50"
            max="100"
            placeholder="e.g., 25"
            value={formData.temperature}
            onChange={(e) => onInputChange("temperature", e.target.value)}
            className="form-input"
            required
          />
          <p className="text-white/60 text-xs mt-1">
            Lower temperatures help snow stick and accumulate
          </p>
        </div>

        {/* Wind Speed Input */}
        <div>
          <label htmlFor="wind_speed" className="block text-white/90 font-medium mb-2 flex items-center gap-2">
            <Wind className="h-4 w-4" />
            Wind Speed (mph)
          </label>
          <input
            id="wind_speed"
            type="number"
            step="1"
            min="0"
            max="100"
            placeholder="e.g., 15"
            value={formData.wind_speed}
            onChange={(e) => onInputChange("wind_speed", e.target.value)}
            className="form-input"
            required
          />
          <p className="text-white/60 text-xs mt-1">
            High winds create dangerous driving conditions
          </p>
        </div>

        {/* Region Type Select */}
        <div>
          <label htmlFor="region_type" className="block text-white/90 font-medium mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Region Type
          </label>
          <select
            id="region_type"
            value={formData.region_type}
            onChange={(e) => onInputChange("region_type", e.target.value)}
            className="form-select"
            required
          >
            <option value="">Choose your area type</option>
            <option value="urban">Urban (City) - Best snow removal</option>
            <option value="suburban">Suburban - Moderate snow removal</option>
            <option value="rural">Rural (Countryside) - Limited snow removal</option>
          </select>
          <p className="text-white/60 text-xs mt-1">
            Rural areas typically close schools more often due to harder road maintenance
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-lg font-semibold"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="loading-spinner"></div>
              Calculating Snow Day Probability...
            </div>
          ) : (
            <>
              Calculate Snow Day Chance ❄️
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
