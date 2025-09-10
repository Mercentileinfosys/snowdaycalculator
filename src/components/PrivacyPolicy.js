import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield } from 'lucide-react';
import { generatePageTitle, generateCanonicalUrl } from '../utils/seoUtils';
import Navigation from './shared/Navigation';
import SnowfallBackground from './shared/SnowfallBackground';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Privacy Policy - Snow Day Calculator")}</title>
        <meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your data when using the Snow Day Calculator." />
        <link rel="canonical" href={generateCanonicalUrl("/privacy-policy")} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <SnowfallBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <Shield className="h-12 w-12 text-white mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white font-display">Privacy Policy</h1>
              <p className="text-white/80 mt-4">Last updated: January 1, 2025</p>
            </header>

            <div className="glass-card p-8 space-y-6 text-white/90">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <p>We collect minimal information to provide our snow day prediction service:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Weather data you input (snowfall, temperature, wind speed, region)</li>
                  <li>City names for premium weather API requests</li>
                  <li>Basic analytics data (page views, usage patterns)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p>Your information is used solely to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Provide snow day predictions</li>
                  <li>Improve our service accuracy</li>
                  <li>Remember your last searched city (premium users)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Storage and Security</h2>
                <p>We implement appropriate security measures to protect your information. No personal information is stored on our servers beyond what's necessary for service functionality.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>Questions about this privacy policy? Contact us at privacy@snowdaycalculator.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
