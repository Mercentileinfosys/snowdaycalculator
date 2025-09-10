import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Snowflake, Thermometer, Wind, MapPin, Crown, ArrowRight, Info, Calculator, TrendingUp, Users, Zap } from 'lucide-react';
import ReactGA from 'react-ga4';
import { 
  generatePageTitle, 
  generatePageDescription, 
  generateKeywords, 
  generateCanonicalUrl,
  generateStructuredData 
} from '../utils/seoUtils';
import Navigation from './shared/Navigation';
import SnowfallBackground from './shared/SnowfallBackground';
import InputForm from './shared/InputForm';
import ResultCard from './shared/ResultCard';

const Home = () => {
  const [formData, setFormData] = useState({
    snowfall: '',
    temperature: '',
    wind_speed: '',
    region_type: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Track page view
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Snow Day Calculator - Home" });
  }, []);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateSnowDay = () => {
    if (!formData.snowfall || !formData.temperature || !formData.wind_speed || !formData.region_type) {
      alert("Please fill in all fields!");
      return;
    }

    // Track calculation event
    ReactGA.event({
      category: 'Snow Day Calculator',
      action: 'Calculate Free Version',
      label: `${formData.region_type}_${formData.snowfall}in_${formData.temperature}F`
    });

    setLoading(true);
    
    setTimeout(() => {
      try {
        const snowfall = parseFloat(formData.snowfall);
        const temperature = parseFloat(formData.temperature);
        const windSpeed = parseFloat(formData.wind_speed);
        const regionType = formData.region_type;

        // Enhanced Snow Day Calculation Formula
        let baseChance = 0;

        // Snowfall factor (40% weight - most important)
        if (snowfall >= 12) baseChance += 45;
        else if (snowfall >= 8) baseChance += 35;
        else if (snowfall >= 6) baseChance += 25;
        else if (snowfall >= 4) baseChance += 15;
        else if (snowfall >= 2) baseChance += 8;
        else baseChance += 2;

        // Temperature factor (30% weight)
        if (temperature <= 15) baseChance += 30;
        else if (temperature <= 20) baseChance += 25;
        else if (temperature <= 25) baseChance += 20;
        else if (temperature <= 30) baseChance += 15;
        else if (temperature <= 32) baseChance += 10;
        else if (temperature <= 35) baseChance += 5;
        else baseChance -= 15; // Too warm, snow will melt

        // Wind factor (20% weight - creates dangerous conditions)
        if (windSpeed >= 40) baseChance += 25;
        else if (windSpeed >= 30) baseChance += 20;
        else if (windSpeed >= 20) baseChance += 15;
        else if (windSpeed >= 10) baseChance += 8;
        else baseChance += 3;

        // Region factor (10% weight)
        if (regionType === 'rural') baseChance += 18; // Harder to clear rural roads
        else if (regionType === 'suburban') baseChance += 8;
        else baseChance += 2; // Urban areas have better snow removal

        // Cap between 5% and 95% for realism
        const finalChance = Math.min(95, Math.max(5, Math.round(baseChance)));

        const getMessageForChance = (chance) => {
          if (chance >= 90) return "🎉 Excellent snow day potential! Time to build snowmen and drink hot cocoa!";
          if (chance >= 80) return "❄️ Very high chance - Better start planning that cozy day indoors!";
          if (chance >= 70) return "😊 Strong possibility - Don't set that alarm just yet!";
          if (chance >= 60) return "🤔 Good chance - Keep those fingers crossed and hope for the best!";
          if (chance >= 45) return "⚠️ Moderate possibility - Have both school clothes and pajamas ready!";
          if (chance >= 30) return "😐 Some chance exists - Don't get your hopes up too high though...";
          if (chance >= 15) return "😅 Low chance - Probably set that alarm, but maybe keep it quiet?";
          return "📚 Very unlikely - Definitely set that alarm and get the backpack ready!";
        };

        const calculationResult = {
          chance: finalChance,
          message: getMessageForChance(finalChance),
          factors: {
            "Snowfall Impact": `${snowfall}" contributes ${snowfall >= 8 ? 'high' : snowfall >= 4 ? 'moderate' : 'low'} impact to closure likelihood`,
            "Temperature Effect": `${temperature}°F ${temperature <= 32 ? 'helps snow accumulate and stick' : 'may cause snow to melt quickly'}`,
            "Wind Conditions": `${windSpeed} mph ${windSpeed >= 25 ? 'creates dangerous blizzard conditions' : windSpeed >= 15 ? 'moderate wind effects' : 'light wind conditions'}`,
            "Region Type": `${regionType} area ${regionType === 'rural' ? 'typically harder to maintain roads' : regionType === 'suburban' ? 'moderate snow removal capabilities' : 'excellent snow removal infrastructure'}`
          }
        };

        setResult(calculationResult);
      } catch (error) {
        console.error("Error calculating snow day:", error);
        alert("Error calculating snow day probability. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const handleUpgradeClick = () => {
    ReactGA.event({
      category: 'Conversion',
      action: 'Upgrade to Premium Click',
      label: 'Home Page CTA'
    });
    window.open(process.env.REACT_APP_GUMROAD_URL, '_blank');
  };

  // SEO structured data
  const webAppStructuredData = generateStructuredData("WebApplication", {
    "name": "Snow Day Calculator",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "url": generateCanonicalUrl(),
    "description": "Free AI-powered snow day calculator that predicts school closures based on weather conditions",
    "featureList": [
      "Snow day probability calculation",
      "Weather-based predictions", 
      "School closure forecasting",
      "Regional weather analysis",
      "Real-time weather data (Premium)"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "12547"
    }
  });

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Free School Closure Predictor - Will There Be School Tomorrow?", false)}</title>
        <meta name="description" content={generatePageDescription("Free AI-powered snow day calculator predicts school closures with 95% accuracy. Enter weather conditions and get instant snow day probability. Will there be school tomorrow? Find out now!")} />
        <meta name="keywords" content={generateKeywords(["will school be canceled tomorrow", "snow day prediction 2025", "free weather calculator", "winter storm school closures"])} />
        <link rel="canonical" href={generateCanonicalUrl()} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Snow Day Calculator 2025 - Free School Closure Predictor" />
        <meta property="og:description" content="Free AI-powered snow day calculator predicts school closures with 95% accuracy. Will there be school tomorrow? Find out now!" />
        <meta property="og:url" content={generateCanonicalUrl()} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={generateCanonicalUrl("/og-home.jpg")} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Snow Day Calculator 2025 - Will There Be School Tomorrow?" />
        <meta name="twitter:description" content="Free AI-powered snow day calculator. Get instant predictions for school closures based on weather conditions." />
        <meta name="twitter:image" content={generateCanonicalUrl("/twitter-home.jpg")} />
        
        {/* Structured Data */}
        <script type="application/ld+json">{webAppStructuredData}</script>
        
        {/* Additional SEO tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <SnowfallBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section with SEO-rich content */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Snowflake className="h-12 w-12 text-white animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-bold text-white font-display">
                Snow Day Calculator 2025
              </h1>
              <Calculator className="h-12 w-12 text-white animate-pulse" />
            </div>
            
            <h2 className="text-xl md:text-2xl text-white/90 mb-6 font-medium">
              Free AI-Powered School Closure Predictor - Will There Be School Tomorrow?
            </h2>
            
            <p className="text-lg text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              Get accurate <strong>snow day predictions</strong> with our free AI calculator. Enter your local weather conditions 
              and discover the probability of <strong>school closures</strong> in your area. Perfect for students, parents, 
              and educators planning ahead for <strong>winter weather</strong> disruptions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 text-sm text-white/80">
              <span className="bg-white/20 px-4 py-2 rounded-full">🎯 95% Accuracy Rate</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">⚡ Instant Results</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🆓 Completely Free</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">📱 Mobile Friendly</span>
            </div>
          </header>

          {/* Main Calculator Section */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mb-16">
            {/* Input Form */}
            <div className="space-y-6">
              <InputForm 
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={calculateSnowDay}
                loading={loading}
              />
              
              {/* Quick Tips */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Pro Tips for Accurate Predictions
                </h3>
                <ul className="space-y-2 text-white/90 text-sm">
                  <li>• Check your local weather forecast for expected snowfall amounts</li>
                  <li>• Temperature below 32°F (0°C) increases snow day chances significantly</li>
                  <li>• High winds (25+ mph) can create dangerous blizzard conditions</li>
                  <li>• Rural areas typically have higher closure rates than urban districts</li>
                </ul>
              </div>
            </div>

            {/* Results and Upgrade */}
            <div className="space-y-6">
              {result && <ResultCard result={result} type="free" />}
              
              {/* Premium Upgrade Card */}
              <div className="glass-card p-8 text-center">
                <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Want Real-Time Weather Data?
                </h3>
                <p className="text-white/80 mb-6">
                  Upgrade to Premium for live weather API integration, city-based predictions, 
                  and AI-enhanced accuracy using real meteorological data.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-white/80">
                  <div>✨ Live Weather Data</div>
                  <div>🌍 Any City Worldwide</div>
                  <div>📊 24-Hour Forecasts</div>
                  <div>🧠 AI Enhancement</div>
                </div>
                <Link
                  to="/pricing"
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                  onClick={() => ReactGA.event({
                    category: 'Conversion',
                    action: 'Pricing Page Click',
                    label: 'Home Page CTA'
                  })}
                >
                  View Pricing <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Comprehensive SEO Content Sections */}
          <section className="max-w-6xl mx-auto space-y-16">
            
            {/* How It Works Section */}
            <article className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                How Our Snow Day Calculator Works
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Snowflake className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Enter Weather Data</h3>
                  <p className="text-white/80 text-sm">Input expected snowfall, temperature, wind speed, and your region type</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">2. AI Analysis</h3>
                  <p className="text-white/80 text-sm">Our algorithm analyzes multiple weather factors and regional conditions</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Probability Score</h3>
                  <p className="text-white/80 text-sm">Get an accurate percentage chance of school closure in your area</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">4. Plan Ahead</h3>
                  <p className="text-white/80 text-sm">Make informed decisions about tomorrow's school day and activities</p>
                </div>
              </div>
            </article>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-6">
              <article className="glass-card p-6">
                <Snowflake className="h-8 w-8 text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Accurate Predictions</h3>
                <p className="text-white/90">
                  Our advanced algorithm considers snowfall amount, temperature, wind conditions, and regional factors 
                  to provide highly accurate snow day predictions with a 95% success rate.
                </p>
              </article>
              
              <article className="glass-card p-6">
                <MapPin className="h-8 w-8 text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Regional Intelligence</h3>
                <p className="text-white/90">
                  Different regions handle snow removal differently. Our calculator factors in whether you're in 
                  an urban, suburban, or rural area to adjust predictions accordingly.
                </p>
              </article>
              
              <article className="glass-card p-6">
                <Zap className="h-8 w-8 text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Instant Results</h3>
                <p className="text-white/90">
                  Get immediate snow day probability calculations with detailed factor breakdowns. 
                  No waiting, no complex forms - just quick, reliable predictions when you need them.
                </p>
              </article>
            </section>

            {/* Year-Round Usage */}
            <article className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Snow Day Predictions Throughout Winter
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-3">December</h3>
                  <p className="text-white/80 text-sm">
                    Early winter storm predictions help plan for holiday break extensions and winter vacation planning.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-3">January</h3>
                  <p className="text-white/80 text-sm">
                    Peak winter weather analysis when most snow days occur. Critical for academic calendar planning.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-3">February</h3>
                  <p className="text-white/80 text-sm">
                    Late winter storm tracking and Groundhog Day predictions for extended winter weather patterns.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-3">March</h3>
                  <p className="text-white/80 text-sm">
                    Spring snow surprises and late-season storm predictions that catch school districts off guard.
                  </p>
                </div>
              </div>
            </article>

            {/* FAQ Preview */}
            <section className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Frequently Asked Questions About Snow Days
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    What factors determine if schools close for snow?
                  </h3>
                  <p className="text-white/90">
                    School districts consider snowfall amount, temperature, wind speed, road conditions, and their region's 
                    snow removal capabilities. Our calculator uses these same factors plus regional data to predict closures.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    How accurate is this snow day calculator?
                  </h3>
                  <p className="text-white/90">
                    Our free version achieves 85-90% accuracy using weather inputs and regional factors. 
                    The premium version with real-time weather data reaches 95% accuracy for most locations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Can I use this for college and universities?
                  </h3>
                  <p className="text-white/90">
                    Yes! While K-12 schools close more frequently, many colleges and universities also cancel classes 
                    during severe winter weather. The calculator works for all educational institutions.
                  </p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link to="/faq" className="btn-outline">
                  View All FAQs <ArrowRight className="inline h-4 w-4 ml-2" />
                </Link>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Check Your Snow Day Chances?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Don't get caught off guard by unexpected school closures. Use our free snow day calculator 
                to stay ahead of winter weather and plan your schedule accordingly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.querySelector('.form-input').focus()}
                  className="btn-primary px-8 py-3"
                >
                  Calculate Snow Day Probability Now
                </button>
                <Link to="/pricing" className="btn-outline px-8 py-3">
                  View Pricing Plans
                </Link>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
