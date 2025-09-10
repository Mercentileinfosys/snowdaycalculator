import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import './App.css';

// Components
import Home from './components/Home';
import Premium from './components/Premium';
import Pricing from './components/Pricing';
import About from './components/About';
import FAQ from './components/FAQ';
import HowItWorks from './components/HowItWorks';
import LocationPages from './components/LocationPages';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import NotFound from './components/NotFound';

// SEO and Analytics
import { reportWebVitals } from './utils/webVitals';
import ScrollToTop from './utils/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Initialize Google Analytics
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    debug: process.env.NODE_ENV === 'development',
    titleCase: false,
    gaOptions: {
      send_page_view: false // We'll send manually for better control
    }
  });
}

function App() {
  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
        ReactGA.send({ 
          hitType: "pageview", 
          page: window.location.pathname + window.location.search,
          title: document.title 
        });
      }
    };

    // Track initial page view
    trackPageView();

    // Track route changes
    const handleRouteChange = () => {
      trackPageView();
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Report web vitals for performance monitoring
  useEffect(() => {
    reportWebVitals((metric) => {
      if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
        ReactGA.event({
          category: 'Web Vitals',
          action: metric.name,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }
    });
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <div className="App">
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              
              {/* Location-specific SEO pages */}
              <Route path="/locations/:state" element={<LocationPages />} />
              <Route path="/locations/:state/:city" element={<LocationPages />} />
              
              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* SEO-friendly routes for common searches */}
              <Route path="/snow-day-calculator" element={<Home />} />
              <Route path="/school-closure-predictor" element={<Home />} />
              <Route path="/will-there-be-school-tomorrow" element={<Home />} />
              <Route path="/snow-day-predictor" element={<Home />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
