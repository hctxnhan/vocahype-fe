import { Route, Switch } from 'wouter';

import { ErrorBoundary } from './components/layout/ErrorPage/ErrorBoundary';
import { Toaster } from './components/ui/toaster';
import { MainLayout } from './layouts/MainLayout';
import { AuthAction } from './pages/AuthAction/AuthAction';
import { Authentication } from './pages/Authentication/Authentication';
import { ProtectedPage } from './pages/Authentication/ProtectedPage';
import { EnterEmail } from './pages/ResetPassword/components/EnterEmail';

function App() {
  return (
    <ErrorBoundary>
      <div className="relative text-foreground">
        <div className="fixed left-0 top-0 h-full w-full z-30 pattern-background" />
        <Switch>
          <Route path="/auth" component={Authentication} />
          <Route path="/auth/reset-password" component={EnterEmail} />
          <Route path="/auth/action" component={AuthAction} />
          <ProtectedPage>
            <MainLayout />
          </ProtectedPage>
        </Switch>
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export { App };
