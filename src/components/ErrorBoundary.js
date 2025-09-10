import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to analytics
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: true
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="text-center p-8 max-w-md mx-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30">
              <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-white/90 mb-6">
                Don't worry - this happens sometimes. The snow day calculator encountered an unexpected error.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Page
                </button>
                
                <a
                  href="/"
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </a>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-white/80 text-sm cursor-pointer">
                    Error Details (Development)
                  </summary>
                  <pre className="text-red-300 text-xs mt-2 overflow-auto bg-black/20 p-2 rounded">
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
