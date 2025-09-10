import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, Crown, Zap, Star, ArrowRight, Snowflake } from 'lucide-react';
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

const Pricing = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/pricing", title: "Snow Day Calculator Pricing" });
  }, []);

  const handlePurchase = () => {
    // Track conversion intent
    ReactGA.event({
      category: 'Conversion',
      action: 'Premium Purchase Click',
      label: 'Pricing Page - $9.99'
    });

    // Redirect to Gumroad
    window.open(process.env.REACT_APP_GUMROAD_URL, '_blank');
  };

  const freeFeatures = [
    "Manual weather input calculator",
    "85-90% prediction accuracy",
    "Basic snow day probability",
    "Regional factor analysis",
    "Beautiful snow-themed interface",
    "Mobile-friendly design",
    "Instant results"
  ];

  const premiumFeatures = [
    "Real-time weather API data",
    "95% prediction accuracy",
    "City-based predictions worldwide",
    "24-hour forecast charts",
    "AI-enhanced analysis",
    "Professional meteorological data",
    "Automatic city memory",
    "Priority customer support",
    "Advanced weather factors",
    "Detailed analysis reports",
    "No ads or limitations",
    "Lifetime access - pay once!"
  ];

  // Structured data for pricing
  const pricingStructuredData = generateStructuredData("Product", {
    "name": "Snow Day Calculator Premium",
    "description": "Premium snow day calculator with real-time weather data and 95% accuracy",
    "brand": {
      "@type": "Brand",
      "name": "Snow Day Calculator"
    },
    "offers": {
      "@type": "Offer",
      "url": process.env.REACT_APP_GUMROAD_URL,
      "priceCurrency": "USD",
      "price": "9.99",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01",
      "priceValidUntil": "2025-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1247",
      "bestRating": "5"
    }
  });

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Pricing - Premium Snow Day Calculator $9.99")}</title>
        <meta name="description" content={generatePageDescription("Get premium snow day predictions for just $9.99! Real-time weather data, 95% accuracy, and worldwide city support. One-time payment, lifetime access.")} />
        <meta name="keywords" content={generateKeywords(["snow day calculator pricing", "premium weather predictor", "real-time snow forecasts", "$9.99 weather app", "lifetime access snow day"])} />
        <link rel="canonical" href={generateCanonicalUrl("/pricing")} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Premium Snow Day Calculator - Only $9.99 Lifetime Access" />
        <meta property="og:description" content="Upgrade to premium for real-time weather data and 95% accurate predictions. One-time payment of $9.99 for lifetime access." />
        <meta property="og:url" content={generateCanonicalUrl("/pricing")} />
        <meta property="og:image" content={generateCanonicalUrl("/og-pricing.jpg")} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Snow Day Calculator - $9.99 Lifetime" />
        <meta name="twitter:description" content="Real-time weather data, 95% accuracy, worldwide coverage. One-time payment for lifetime premium access." />
        <meta name="twitter:image" content={generateCanonicalUrl("/twitter-pricing.jpg")} />
        
        {/* Structured Data */}
        <script type="application/ld+json">{pricingStructuredData}</script>
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <SnowfallBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="h-12 w-12 text-yellow-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-white font-display">
                Choose Your Plan
              </h1>
              <Star className="h-12 w-12 text-yellow-400" />
            </div>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Start with our free calculator or upgrade to premium for real-time weather data 
              and the most accurate snow day predictions available.
            </p>

            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-6 py-2 text-green-300">
              <Zap className="h-4 w-4" />
              <span className="font-semibold">Limited Time: $9.99 Forever - No Monthly Fees!</span>
            </div>
          </header>

          {/* Pricing Cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            {/* Free Plan */}
            <div className="glass-card p-8 border-2 border-white/20">
              <div className="text-center mb-8">
                <Snowflake className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Free Plan</h2>
                <div className="text-4xl font-bold text-blue-400 mb-2">$0</div>
                <p className="text-white/70">Perfect for casual use</p>
              </div>

              <ul className="space-y-3 mb-8">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/90">
                    <Check className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/"
                className="btn-outline w-full py-3 text-center inline-flex items-center justify-center gap-2"
              >
                Try Free Calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="glass-card p-8 border-2 border-yellow-400/50 relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-1 rounded-full text-sm font-bold">
                  ⭐ MOST POPULAR
                </div>
              </div>

              <div className="text-center mb-8 mt-4">
                <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Premium Plan</h2>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl text-white/60 line-through">$19.99</span>
                  <div className="text-4xl font-bold text-yellow-400">$9.99</div>
                </div>
                <p className="text-white/70">One-time payment • Lifetime access</p>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2 mt-3">
                  <span className="text-green-300 text-sm font-semibold">50% OFF - Limited Time!</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/90">
                    <Check className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={handlePurchase}
                className="btn-primary w-full py-4 text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Buy Now - $9.99
              </button>

              <p className="text-center text-white/60 text-sm mt-3">
                Secure payment via Gumroad • Instant access
              </p>
            </div>
          </div>

          {/* Feature Comparison */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Detailed Feature Comparison
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 px-2">Feature</th>
                      <th className="text-center py-4 px-2">Free</th>
                      <th className="text-center py-4 px-2">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-2">Manual Weather Input</td>
                      <td className="text-center py-4 px-2">
                        <Check className="h-5 w-5 text-green-400 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-2">
                        <Check className="h-5 w-5 text-green-400 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-2">Real-time Weather API</td>
                      <td className="text-center py-4 px-2">❌</td>
                      <td className="text-center py-4 px-2">
                        <Check className="h-5 w-5 text-yellow-400 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-2">Prediction Accuracy</td>
                      <td className="text-center py-4 px-2">85-90%</td>
                      <td className="text-center py-4 px-2">
                        <span className="text-yellow-400 font-bold">95%</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-2">City-based Predictions</td>
                      <td className="text-center py-4 px-2">❌</td>
                      <td className="text-center py-4 px-2">
                        <Check className="h-5 w-5 text-yellow-400 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-2">24-Hour Forecast Charts</td>
                      <td className="text-center py-4 px-2">❌</td>
                      <td className="text-center py-4 px-2">
                        <Check className="h-5 w-5 text-yellow-400 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-2">Support Priority</td>
                      <td className="text-center py-4 px-2">Standard</td>
                      <td className="text-center py-4 px-2">
                        <span className="text-yellow-400 font-bold">Priority</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Pricing FAQ
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Is this really a one-time payment?
                  </h3>
                  <p className="text-white/90">
                    Yes! Pay $9.99 once and get lifetime access to all premium features. 
                    No monthly subscriptions, no hidden fees, no recurring charges.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    What happens after I purchase?
                  </h3>
                  <p className="text-white/90">
                    After completing your purchase on Gumroad, you'll receive a unique link 
                    to access the premium version. This link is yours forever!
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Is the payment secure?
                  </h3>
                  <p className="text-white/90">
                    Absolutely! All payments are processed securely through Gumroad, 
                    a trusted platform used by thousands of digital creators worldwide.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Can I get a refund?
                  </h3>
                  <p className="text-white/90">
                    Yes, we offer a 30-day money-back guarantee. If you're not satisfied 
                    with the premium features, contact us for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Get the Most Accurate Snow Day Predictions?
              </h2>
              <p className="text-white/90 mb-6">
                Join thousands of satisfied users who trust our premium predictions. 
                One-time payment, lifetime access, 95% accuracy guaranteed!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handlePurchase}
                  className="btn-primary px-8 py-4 text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600"
                >
                  🚀 Upgrade to Premium - $9.99
                </button>
                <Link to="/" className="btn-outline px-8 py-4">
                  Try Free Version First
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/70">
                <span>✅ Secure Payment</span>
                <span>✅ Instant Access</span>
                <span>✅ 30-Day Guarantee</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Pricing;
