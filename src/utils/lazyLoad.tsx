import React, { lazy, Suspense, ComponentType } from 'react';

interface LazyLoadOptions {
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

/**
 * Creates a lazily loaded component with proper suspense and error handling
 * 
 * @param importFactory - A function that returns a dynamic import
 * @param options - Options for fallbacks and error handling
 * @returns A lazily loaded component that will only be loaded when needed
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFactory: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
) {
  const LazyComponent = lazy(importFactory);
  
  const {
    fallback = <div className="animate-pulse bg-neutral h-40 rounded-lg w-full"></div>,
    errorFallback = (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
        Failed to load component. Please try refreshing the page.
      </div>
    )
  } = options;

  const LazyLoadedComponent = (props: React.ComponentProps<T>) => {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Suspense fallback={fallback}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return LazyLoadedComponent;
}

/**
 * Simple error boundary component for catching errors in lazy-loaded components
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LazyLoad error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
} 