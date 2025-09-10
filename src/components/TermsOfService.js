import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';
import { generatePageTitle, generateCanonicalUrl } from '../utils/seoUtils';
import Navigation from './shared/Navigation';
import SnowfallBackground from './shared/SnowfallBackground';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Terms of Service - Snow Day Calculator")}</title>
        <meta name="description" content="Read our terms of service for using the Snow Day Calculator and understanding your rights and responsibilities." />
        <link rel="canonical" href={generateCanonicalUrl("/terms-of-service")} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <SnowfallBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <FileText className="h-12 w-12 text-white mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white font-display">Terms of Service</h1>
              <p className="text-white/80 mt-4">Last updated: January 1, 2025</p>
            </header>

            <div className="glass-card p-8 space-y-6 text-white/90">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                <p>By using the Snow Day Calculator, you agree to these terms of service and our privacy policy.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
                <p>Snow Day Calculator provides weather-based predictions for educational institution closures. Predictions are estimates and not guarantees.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
                <p>Weather predictions are inherently uncertain. Users should always verify official school closure announcements from their educational institutions.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                <p>We are not liable for any decisions made based on our predictions or any consequences resulting from service use.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
                <p>Questions about these terms? Contact us at legal@snowdaycalculator.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
