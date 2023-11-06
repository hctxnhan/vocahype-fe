import { Component, ReactNode } from 'react';

import { ApplicationError } from './ApplicationError';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="center h-screen w-screen">
          <ApplicationError
            errorTitle="Something went wrong"
            errorDescription="We encountered an error while loading this page."
            canRefresh={true}
          />
          ;
        </div>
      );
    }

    return this.props.children;
  }
}
