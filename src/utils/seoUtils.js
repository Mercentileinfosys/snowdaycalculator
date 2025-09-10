// SEO utility functions for consistent metadata management

export const generatePageTitle = (pageTitle, includeAppName = true) => {
  const appName = "Snow Day Calculator 2025";
  return includeAppName ? `${pageTitle} | ${appName}` : pageTitle;
};

export const generatePageDescription = (customDescription) => {
  const baseDescription = "Free AI-powered snow day calculator and school closure predictor. Get accurate snow day predictions based on weather conditions.";
  return customDescription || baseDescription;
};

export const generateKeywords = (additionalKeywords = []) => {
  const baseKeywords = [
    "snow day calculator",
    "school closure predictor",
    "snow day predictor", 
    "will there be school tomorrow",
    "snow day forecast",
    "weather school closures",
    "winter storm predictor",
    "snow day probability",
    "school cancellation calculator",
    "free snow day calculator"
  ];
  
  return [...baseKeywords, ...additionalKeywords].join(", ");
};

export const generateCanonicalUrl = (path = "") => {
  const baseUrl = process.env.REACT_APP_SITE_URL || "https://snowdaycalculator.com";
  return `${baseUrl}${path}`;
};

export const generateStructuredData = (type, data) => {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return JSON.stringify(baseStructure);
};

// Location-specific SEO data
export const locationKeywords = {
  "new-york": ["NYC snow day", "New York school closures", "Manhattan snow day predictor"],
  "california": ["California snow day", "CA school closures", "Sierra Nevada snow"],
  "texas": ["Texas snow day", "Dallas snow predictor", "Houston winter weather"],
  "florida": ["Florida snow day", "rare snow day Florida", "Miami winter weather"],
  // Add more states as needed
};

export const getLocationKeywords = (location) => {
  return locationKeywords[location] || [];
};

// FAQ structured data generator
export const generateFAQStructuredData = (faqs) => {
  return generateStructuredData("FAQPage", {
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
};

// Article structured data generator
export const generateArticleStructuredData = (title, description, datePublished, dateModified) => {
  return generateStructuredData("Article", {
    "headline": title,
    "description": description,
    "image": [
      `${generateCanonicalUrl()}/og-image.jpg`
    ],
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": "Snow Day Calculator Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Snow Day Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": `${generateCanonicalUrl()}/logo-192.png`
      }
    }
  });
};
