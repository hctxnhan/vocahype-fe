import { Route } from 'wouter';

import { Breadcrumb } from '@/components/layout/Breadcrumb/Breadcrumb';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { BreadcrumbProvider } from '@/lib/context/breadcrumb.context';
import { Exploration } from '@/pages/Exploration/Exploration';
import { KnowledgeCheck } from '@/pages/KnowledgeCheck/KnowledgeCheck';
import { Learn } from '@/pages/Learn/Learn';
import { ProfileSettings } from '@/pages/ProfileSettings/ProfileSettings';
import { SearchResult } from '@/pages/Search/SearchResult';
import { WordList } from '@/pages/WordList/WordList';

export function MainLayout() {
  return (
    <div className="container h-screen w-full text-foreground">
      <Navbar />
      <div
        className="relative grid min-h-0 flex-1 grid-cols-main-layout gap-6 pt-navbar
      max-md:grid-cols-1 max-md:pt-navbar-sm"
      >
        <Sidebar />
        <BreadcrumbProvider>
          <div className="main-min-height relative mt-8 flex flex-1 flex-col overflow-x-hidden pb-4 max-md:mt-0">
            <Breadcrumb />
            <Route component={KnowledgeCheck} path="/knowledge-check" />
            <Route component={SearchResult} path="/search" />
            <Route component={Learn} path="/words/:wordId" />
            <Route component={ProfileSettings} path="/profile" />
            <Route component={WordList} path="/" />
            <Route component={Exploration} path="/exploration" />
          </div>
        </BreadcrumbProvider>
      </div>
    </div>
  );
}
