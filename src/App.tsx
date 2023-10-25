import { Route, Switch } from 'wouter';

import { Toaster } from './components/ui/toaster';
import { MainLayout } from './layouts/MainLayout';
import { AuthAction } from './pages/AuthAction/AuthAction';
import { Authentication } from './pages/Authentication/Authentication';
import { ProtectedPage } from './pages/Authentication/ProtectedPage';
import { EnterEmail } from './pages/ResetPassword/components/EnterEmail';

function App() {
  return (
    <div className="text-foreground">
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
  );
}

export { App };
