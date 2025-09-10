import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Cog, CloudSnow, Calculator, BarChart3, ArrowRight } from 'lucide-react';
import ReactGA from 'react-ga4';
import { generatePageTitle, generatePageDescription, generateKeywords, generateCanonicalUrl } from '../utils/seoUtils';
import Navigation from './shared/Navigation';
import SnowfallBackground from './shared/SnowfallBackground';

const HowItWorks = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/how-it-works", title: "How Snow Day Calculator Works" });
  }, []);

  const steps = [
    {
      icon: CloudSnow,
      title: "Weather Data Input",
      description: "Enter expected snowfall, temperature, wind speed, and region type. Premium users get real-time data automatically.",
      details: ["Snowfall amount (inches)", "Temperature (°F)", "Wind speed (mph)", "Region classification"]
    },
    {
      icon: Calculator,
      title: "AI Analysis",
      description: "Our advanced algorithm analyzes multiple factors that school districts consider for closure decisions.",
      details: ["Weather pattern analysis", "Regional infrastructure assessment", "Historical closure data", "Safety factor evaluation"]
    },
    {
      icon: BarChart3,
      title: "Probability Calculation",
      description: "Generate an accurate percentage chance of school closure with detailed factor breakdown.",
      details: ["Weighted factor scoring", "Regional adjustments", "Confidence intervals", "Risk assessment"]
    },
    {
      icon: Cog,
      title: "Smart Results",
      description: "Get actionable predictions with fun messages and detailed analysis to help you plan ahead.",
      details: ["Percentage probability", "Explanatory messages", "Contributing factors", "Planning recommendations"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("How It Works - Snow Day Calculator Algorithm Explained")}</title>
        <meta name="description" content={generatePageDescription("Learn how our snow day calculator works, the algorithm behind accurate predictions, weather factors we analyze, and why our system achieves 95% accuracy.")} />
        <meta name="keywords" content={generateKeywords(["how snow day calculator works", "prediction algorithm", "weather analysis", "school closure factors", "snow day science"])} />
        <link rel="canonical" href={generateCanonicalUrl("/how-it-works")} />
        
        <meta property="og:title" content="How Snow Day Calculator Works - The Science Behind Predictions" />
        <meta property="og:description" content="Discover the advanced algorithm and weather analysis that powers our 95% accurate snow day predictions." />
        <meta property="og:url" content={generateCanonicalUrl("/how-it-works")} />
        <meta property="og:image" content={generateCanonicalUrl("/og-how-it-works.jpg")} />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <SnowfallBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              How It Works
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Discover the science and technology behind our accurate snow day predictions. 
              Learn how we analyze weather data and regional factors to forecast school closures.
            </p>
          </header>

          {/* Process Steps */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <div className="bg-blue-500/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/90 mb-4">{step.description}</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    {step.details.map((detail, i) => (
                      <li key={i}>• {detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Algorithm Explanation */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                The Algorithm Behind Accurate Predictions
              </h2>
              <div className="space-y-6 text-white/90">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Factor Weighting System</h3>
                  <p>Our algorithm uses a sophisticated weighting system that mirrors real school district decision-making:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li><strong>Snowfall Amount (40% weight):</strong> Primary factor - most closures occur with 2+ inches expected</li>
                    <li><strong>Temperature (30% weight):</strong> Below 32°F ensures snow sticks and accumulates</li>
                    <li><strong>Wind Speed (20% weight):</strong> High winds create dangerous blizzard conditions</li>
                    <li><strong>Regional Type (10% weight):</strong> Infrastructure and resources vary significantly</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Regional Intelligence</h3>
                  <p>We adjust predictions based on regional capabilities:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li><strong>Urban Areas:</strong> Excellent snow removal, lower closure threshold</li>
                    <li><strong>Suburban Areas:</strong> Moderate infrastructure, balanced predictions</li>
                    <li><strong>Rural Areas:</strong> Limited resources, higher closure probability</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Premium Enhancements</h3>
                  <p>The premium version adds real-time weather data for maximum accuracy:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Live meteorological data from WeatherAPI</li>
                    <li>Hourly forecast updates</li>
                    <li>Professional precipitation analysis</li>
                    <li>Geographic-specific adjustments</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Accuracy Information */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Free Version Accuracy</h3>
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-green-400">85-90%</span>
                  <p className="text-white/80">Prediction Accuracy</p>
                </div>
                <ul className="text-white/90 space-y-2">
                  <li>• Manual weather input required</li>
                  <li>• Regional factor analysis</li>
                  <li>• Proven algorithm reliability</li>
                  <li>• Suitable for most users</li>
                </ul>
              </div>
              
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Premium Version Accuracy</h3>
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-blue-400">95%</span>
                  <p className="text-white/80">Prediction Accuracy</p>
                </div>
                <ul className="text-white/90 space-y-2">
                  <li>• Real-time weather data</li>
                  <li>• Professional meteorological analysis</li>
                  <li>• Global city support</li>
                  <li>• Maximum accuracy for serious users</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Try It Yourself?
              </h2>
              <p className="text-white/90 mb-6">
                Now that you understand how our algorithm works, put it to the test with your local weather conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
                  Try Free Calculator <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/pricing" className="btn-secondary px-8 py-3 inline-flex items-center gap-2">
                  View Pricing <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
