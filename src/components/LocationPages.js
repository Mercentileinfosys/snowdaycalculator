import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generatePageTitle, generatePageDescription, generateKeywords, generateCanonicalUrl } from '../utils/seoUtils';
import Navigation from './shared/Navigation';
import SnowfallBackground from './shared/SnowfallBackground';

const LocationPages = () => {
  const { state, city } = useParams();
  
  const locationData = {
    'new-york': {
      name: 'New York',
      description: 'Get accurate snow day predictions for New York schools with our AI-powered calculator.',
      cities: ['New York City', 'Albany', 'Buffalo', 'Rochester', 'Syracuse']
    },
    'california': {
      name: 'California', 
      description: 'Snow day predictions for California mountain regions and schools affected by winter weather.',
      cities: ['Lake Tahoe', 'Mammoth Lakes', 'Big Bear', 'Mount Shasta']
    }
  };

  const location = locationData[state] || { name: 'Location', description: 'Snow day predictions for your area.' };
  const pageTitle = city ? `${city}, ${location.name}` : location.name;

  return (
    <>
      <Helmet>
        <title>{generatePageTitle(`${pageTitle} Snow Day Calculator - School Closure Predictor`)}</title>
        <meta name="description" content={generatePageDescription(`${location.description} Check snow day probability for ${pageTitle} schools with real-time weather analysis.`)} />
        <meta name="keywords" content={generateKeywords([`${pageTitle} snow day`, `${location.name} school closures`, `${pageTitle} weather predictor`])} />
        <link rel="canonical" href={generateCanonicalUrl(`/locations/${state}${city ? `/${city}` : ''}`)} />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <SnowfallBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              {pageTitle} Snow Day Calculator
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {location.description}
            </p>
          </header>

          <div className="glass-card p-8 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-white/90 mb-6">
              Location-specific predictions for {pageTitle} are coming soon. 
              For now, use our main calculator with your regional settings.
            </p>
            <a href="/" className="btn-primary">
              Use Main Calculator
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationPages;
