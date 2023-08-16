import { Route, Switch } from 'wouter';
import { Toaster } from './components/ui/toaster';
import { MainLayout } from './layouts/MainLayout';
import { Authentication } from './pages/Authentication/Authentication';
import { ProtectedPage } from './pages/Authentication/ProtectedPage';

function App() {
  return (
    <div className="text-slate-900">
      <Switch>
        <Route path="/auth" component={Authentication} />
        <ProtectedPage>
          <MainLayout />
        </ProtectedPage>
      </Switch>
      <Toaster />
    </div>
  );
}

export { App };
