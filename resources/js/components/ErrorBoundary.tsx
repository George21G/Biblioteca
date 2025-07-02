import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Aquí puedes loguear el error a un servicio externo si quieres
    // console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-red-50 z-50">
          <div className="bg-white border border-red-300 p-8 rounded shadow text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">¡Ocurrió un error inesperado!</h2>
            <p className="text-red-800 mb-2">Por favor, recarga la página o contacta al soporte.</p>
            <details className="text-xs text-gray-500 whitespace-pre-wrap">
              {this.state.error && this.state.error.toString()}
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
} 