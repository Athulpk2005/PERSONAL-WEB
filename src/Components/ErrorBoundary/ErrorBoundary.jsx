import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });

        // Log error to console in development
        if (import.meta.env.DEV) {
            console.error('Error caught by ErrorBoundary:', error);
            console.error('Component stack:', errorInfo.componentStack);
        }

        // Optionally send to error reporting service
        // this.reportError(error, errorInfo);
    }

    reportError = (error, errorInfo) => {
        // Implement error reporting here (e.g., Sentry, LogRocket)
        // fetch('/api/error-report', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ error: error.message, stack: errorInfo.componentStack })
        // });
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-8 h-8 text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-4">
                            Oops! Something went wrong
                        </h1>

                        <p className="text-white/60 mb-6">
                            We're sorry, but an unexpected error occurred. Please try refreshing the page.
                        </p>

                        {import.meta.env.DEV && this.state.error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-left">
                                <p className="text-red-400 text-sm font-mono">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="px-6 py-3 bg-gradient-to-r from-primary/10 to-primary rounded-xl font-medium text-white hover:shadow-lg hover:shadow-primary/30 transition"
                            >
                                Refresh Page
                            </button>

                            <a
                                href="/"
                                className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl font-medium text-white hover:bg-white/20 transition"
                            >
                                Go Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
