import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import Navigation from './shared/Navigation';
import SnowfallBackground from './shared/SnowfallBackground';

const NotFound = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SnowfallBackground />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 relative z-10 flex items-center justify-center min-h-[80vh]">
        <div className="glass-card p-12 text-center max-w-2xl">
          <AlertCircle className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
          
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          
          <p className="text-white/90 mb-8 text-lg">
            Looks like this page got buried in the snow! The page you're looking for doesn't exist, 
            but don't worry - you can still check your snow day chances.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-outline px-8 py-3 inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-white/70 text-sm">
              💡 Try using our snow day calculator or browse our FAQ for helpful information about snow day predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
