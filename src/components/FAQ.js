import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight, Snowflake, Calculator, TrendingUp, MapPin } from 'lucide-react';
import ReactGA from 'react-ga4';
import { 
  generatePageTitle, 
  generatePageDescription, 
  generateKeywords, 
  generateCanonicalUrl,
  generateFAQStructuredData 
} from '../utils/seoUtils';
import Navigation from './shared/Navigation';
import SnowfallBackground from './shared/SnowfallBackground';

const FAQ = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/faq", title: "Snow Day Calculator FAQ" });
  }, []);

  const faqs = [
    {
      id: 1,
      question: "How accurate is the Snow Day Calculator?",
      answer: "Our free version achieves 85-90% accuracy using weather input data and regional factors. The premium version with real-time WeatherAPI data reaches up to 95% accuracy for most locations. Accuracy depends on the reliability of weather forecasts and local school district policies."
    },
    {
      id: 2,
      question: "What factors determine if schools close for snow?",
      answer: "School districts consider multiple factors: snowfall amount (typically 2+ inches triggers closures), temperature (below 32°F helps snow stick), wind speed (high winds create dangerous conditions), road conditions, timing of snowfall, and the district's snow removal capabilities. Our calculator uses these same factors in its analysis."
    },
    {
      id: 3,
      question: "How does the premium version differ from the free version?",
      answer: "The premium version uses real-time weather data from WeatherAPI, provides city-based predictions worldwide, includes AI-enhanced accuracy up to 95%, offers 24-hour forecast visualizations, and remembers your last searched city. The free version uses manual weather input and achieves 85-90% accuracy."
    },
    {
      id: 4,
      question: "Can I use this calculator for colleges and universities?",
      answer: "Yes! While K-12 schools close more frequently due to safety concerns for younger students, many colleges and universities also cancel classes during severe winter weather. The calculator works for all educational institutions, though closure thresholds may vary."
    },
    {
      id: 5,
      question: "Which regions does the calculator work best for?",
      answer: "The calculator works globally, but it's most accurate for regions that regularly experience snow. It's optimized for North American school districts but works well for any area where snow impacts educational institutions. Premium version supports cities worldwide."
    },
    {
      id: 6,
      question: "How far in advance can I predict snow days?",
      answer: "The calculator provides predictions for the next day based on current or forecasted weather conditions. Weather forecasts are most reliable for 1-3 days ahead. For longer-range predictions, accuracy decreases significantly due to weather forecast limitations."
    },
    {
      id: 7,
      question: "Why do rural areas have higher snow day chances?",
      answer: "Rural school districts typically have limited snow removal resources, longer bus routes on untreated roads, and more isolated areas that are harder to reach. Urban districts usually have better infrastructure, more snow removal equipment, and shorter transportation distances."
    },
    {
      id: 8,
      question: "What's the difference between urban, suburban, and rural predictions?",
      answer: "Urban areas have the lowest snow day probability due to excellent snow removal infrastructure and resources. Suburban areas have moderate probabilities with decent snow removal. Rural areas have the highest probabilities due to limited resources and challenging road conditions."
    },
    {
      id: 9,
      question: "How often should I check for snow day predictions?",
      answer: "Check the evening before for the most accurate next-day predictions. Weather conditions can change rapidly, so checking multiple times during winter storm warnings can provide updated probabilities. The premium version uses real-time data that updates hourly."
    },
    {
      id: 10,
      question: "Does the calculator work for ice days and freezing rain?",
      answer: "While primarily designed for snow days, the calculator considers temperature and precipitation factors that also affect ice day decisions. Freezing rain and ice storms often result in school closures even with minimal precipitation, which our algorithm accounts for in temperature analysis."
    },
    {
      id: 11,
      question: "Can I get predictions for specific school districts?",
      answer: "The calculator provides general area predictions rather than district-specific forecasts. However, you can adjust for your region type (urban/suburban/rural) which correlates with most district policies. Each district has unique closure criteria that may vary from our predictions."
    },
    {
      id: 12,
      question: "How does wind speed affect snow day predictions?",
      answer: "High wind speeds create dangerous blizzard conditions, making travel hazardous even with moderate snowfall. Winds above 25 mph significantly increase snow day probability due to safety concerns, reduced visibility, and wind chill effects that make waiting for buses dangerous."
    },
    {
      id: 13,
      question: "What temperature range typically triggers snow days?",
      answer: "Temperatures below 32°F (0°C) allow snow to accumulate and stick to surfaces. Extremely cold temperatures (below 0°F/-18°C) can trigger closures even without snow due to health and safety concerns. The calculator weighs temperature heavily in its analysis."
    },
    {
      id: 14,
      question: "Why might my prediction differ from the actual decision?",
      answer: "School districts consider factors beyond weather, including: timing of snowfall (overnight vs. morning), weekend prior conditions, local road conditions, availability of maintenance crews, and specific district policies. Our calculator provides probability, not certainty."
    },
    {
      id: 15,
      question: "Is the calculator free to use?",
      answer: "Yes! The basic snow day calculator is completely free with no registration required. We also offer a premium version with real-time weather data and enhanced features for users who want maximum accuracy and convenience."
    },
    {
      id: 16,
      question: "How do I interpret the percentage results?",
      answer: "90%+ = Very High Chance (start planning snow day activities), 70-89% = High Chance (likely closure), 50-69% = Moderate Chance (prepare for either scenario), 30-49% = Low Chance (probably school), Below 30% = Very Low Chance (definitely school). These are probabilities, not guarantees."
    },
    {
      id: 17,
      question: "Does the calculator work internationally?",
      answer: "The premium version works globally with weather data for cities worldwide. However, the algorithm is optimized for North American school closure patterns. International users should adjust expectations based on local educational institution policies regarding weather closures."
    },
    {
      id: 18,
      question: "What makes this calculator different from others?",
      answer: "Our calculator combines multiple weather factors with regional intelligence, offers both free and premium tiers, includes AI-enhanced analysis, provides detailed factor breakdowns, and features a beautiful, mobile-friendly interface. We focus on accuracy and user experience."
    },
    {
      id: 19,
      question: "Can I save my location for future predictions?",
      answer: "The premium version automatically remembers your last searched city for convenience. The free version requires manual input each time, but you can bookmark the page with your preferred region type selected."
    },
    {
      id: 20,
      question: "How do I upgrade to premium?",
      answer: "Click the 'Upgrade to Premium' button on any page to access our secure Gumroad checkout. Premium features activate immediately after purchase, giving you access to real-time weather data and enhanced predictions."
    }
  ];

  const faqStructuredData = generateFAQStructuredData(faqs);

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Frequently Asked Questions - Snow Day Calculator FAQ")}</title>
        <meta name="description" content={generatePageDescription("Complete FAQ about snow day predictions, school closures, weather factors, and calculator accuracy. Get answers to all your questions about our snow day calculator.")} />
        <meta name="keywords" content={generateKeywords(["snow day calculator faq", "school closure questions", "weather prediction help", "snow day accuracy", "winter weather faq"])} />
        <link rel="canonical" href={generateCanonicalUrl("/faq")} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Snow Day Calculator FAQ - All Your Questions Answered" />
        <meta property="og:description" content="Complete guide to snow day predictions, school closures, and weather factors. Learn how our calculator works and get accurate winter weather forecasts." />
        <meta property="og:url" content={generateCanonicalUrl("/faq")} />
        <meta property="og:image" content={generateCanonicalUrl("/og-faq.jpg")} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Snow Day Calculator FAQ - Complete Guide" />
        <meta name="twitter:description" content="Everything you need to know about snow day predictions, school closures, and weather analysis." />
        <meta name="twitter:image" content={generateCanonicalUrl("/twitter-faq.jpg")} />
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">{faqStructuredData}</script>
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <SnowfallBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="h-12 w-12 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Everything you need to know about snow day predictions, school closures, 
              and how our calculator provides accurate weather-based forecasts.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-white/80">
              <span className="bg-white/20 px-4 py-2 rounded-full">📚 Complete Guide</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">❓ Expert Answers</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🎯 Accuracy Tips</span>
            </div>
          </header>

          {/* Quick Navigation */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Quick Navigation</h2>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <Calculator className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold mb-1">Calculator Basics</h3>
                  <p className="text-white/70">How it works, accuracy, features</p>
                </div>
                <div className="text-center">
                  <Snowflake className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold mb-1">Weather Factors</h3>
                  <p className="text-white/70">Snow, temperature, wind effects</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold mb-1">Regional Differences</h3>
                  <p className="text-white/70">Urban vs rural predictions</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold mb-1">Premium Features</h3>
                  <p className="text-white/70">Advanced predictions, real-time data</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="glass-card p-6 fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center text-sm font-bold">
                    {faq.id}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-white/90 leading-relaxed pl-11">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <section className="max-w-6xl mx-auto mt-16">
            <div className="glass-card p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need More Help?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Still have questions about snow day predictions or how to use our calculator? 
                Explore our other helpful resources or try the calculator yourself.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Learn More</h3>
                  <Link to="/how-it-works" className="btn-outline inline-flex items-center gap-2">
                    How It Works <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Try It Free</h3>
                  <Link to="/" className="btn-primary inline-flex items-center gap-2">
                    Calculate Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Get Premium</h3>
                  <Link to="/pricing" className="btn-secondary inline-flex items-center gap-2">
                    View Pricing <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="max-w-4xl mx-auto mt-16">
            <article className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Complete Guide to Snow Day Predictions
              </h2>
              <div className="space-y-6 text-white/90">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Understanding Snow Day Factors</h3>
                  <p className="mb-4">
                    Snow day decisions involve complex calculations that school administrators make based on multiple 
                    weather and safety factors. Our calculator replicates this decision-making process by analyzing 
                    the same key variables that districts consider.
                  </p>
                  <p>
                    <strong>Snowfall Amount:</strong> Most districts close when 2+ inches are expected, with certainty increasing 
                    dramatically above 4 inches. <strong>Temperature:</strong> Below-freezing temperatures ensure snow sticks and 
                    accumulates. <strong>Wind Speed:</strong> High winds create dangerous conditions even with moderate snow. 
                    <strong>Regional Factors:</strong> Infrastructure and resources vary significantly between urban and rural areas.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Maximizing Prediction Accuracy</h3>
                  <p className="mb-4">
                    For the most accurate predictions, use the most recent weather forecast data available. Weather 
                    conditions can change rapidly during winter storms, so checking multiple times provides better accuracy.
                  </p>
                  <p>
                    The premium version automatically uses real-time data, eliminating the need for manual updates and 
                    providing professional-grade meteorological analysis that matches what school administrators use 
                    for their decision-making process.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Regional Considerations</h3>
                  <p>
                    School closure patterns vary significantly by region. Northern states have higher snow tolerance 
                    and better infrastructure, while southern regions may close with minimal snow due to lack of 
                    equipment and experience. Our calculator adjusts predictions based on your specified region type.
                  </p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
    </>
  );
};

export default FAQ;
