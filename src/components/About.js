import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Target, Award, Heart } from 'lucide-react';
import ReactGA from 'react-ga4';
import { generatePageTitle, generatePageDescription, generateKeywords, generateCanonicalUrl } from '../utils/seoUtils';
import Navigation from './shared/Navigation';
import SnowfallBackground from './shared/SnowfallBackground';

const About = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/about", title: "About Snow Day Calculator" });
  }, []);

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("About Us - Snow Day Calculator Team")}</title>
        <meta name="description" content={generatePageDescription("Learn about the Snow Day Calculator team, our mission to provide accurate weather predictions, and how we help students and families plan for winter weather disruptions.")} />
        <meta name="keywords" content={generateKeywords(["about snow day calculator", "weather prediction team", "school closure experts", "winter weather specialists"])} />
        <link rel="canonical" href={generateCanonicalUrl("/about")} />
        
        <meta property="og:title" content="About Snow Day Calculator - Weather Prediction Experts" />
        <meta property="og:description" content="Meet the team behind the most accurate snow day predictions. Learn our mission and how we help families plan for winter weather." />
        <meta property="og:url" content={generateCanonicalUrl("/about")} />
        <meta property="og:image" content={generateCanonicalUrl("/og-about.jpg")} />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <SnowfallBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              About Snow Day Calculator
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're passionate about helping students, parents, and educators stay ahead of winter weather with accurate snow day predictions.
            </p>
          </header>

          <div className="max-w-4xl mx-auto space-y-12">
            <section className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
              <p className="text-white/90 text-lg leading-relaxed text-center">
                To provide the most accurate, user-friendly snow day predictions that help families plan ahead 
                and reduce uncertainty during winter weather events. We believe everyone deserves reliable information 
                to make informed decisions about school and work schedules.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <Target className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Accuracy First</h3>
                <p className="text-white/90">
                  Our algorithms are continuously refined based on real-world data and feedback, 
                  achieving industry-leading accuracy rates for snow day predictions.
                </p>
              </div>

              <div className="glass-card p-6">
                <Users className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Community Focused</h3>
                <p className="text-white/90">
                  Built by parents and educators who understand the real challenges of winter weather planning. 
                  We serve families nationwide with reliable predictions.
                </p>
              </div>

              <div className="glass-card p-6">
                <Award className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Proven Results</h3>
                <p className="text-white/90">
                  Trusted by thousands of families across the country, with consistent accuracy that 
                  helps reduce morning uncertainty and improve planning.
                </p>
              </div>

              <div className="glass-card p-6">
                <Heart className="h-12 w-12 text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Free & Accessible</h3>
                <p className="text-white/90">
                  We believe accurate weather information should be available to everyone. 
                  Our free tier provides reliable predictions without barriers or paywalls.
                </p>
              </div>
            </div>

            <section className="glass-card p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/90 mb-6">
                Questions, feedback, or suggestions? We'd love to hear from you!
              </p>
              <p className="text-white/80">
                Email: hello@snowdaycalculator.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
