import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { BreadcrumbProvider } from '@/lib/context/breadcrumb.context';
import { KnowledgeCheck } from '@/pages/KnowledgeCheck/KnowledgeCheck';
import { Learn } from '@/pages/Learn/Learn';
import { SearchResult } from '@/pages/Search/SearchResult';
import { Route } from 'wouter';
import { Breadcrumb } from '@/components/layout/Breadcrumb/Breadcrumb';

export function MainLayout() {
  return (
    <div className="flex h-screen w-full flex-col px-8 pb-4 text-neutral-950">
      <div className="global-background absolute inset-0 -z-50" />
      <div>
        <Navbar />
      </div>
      <div className="mt-8 grid flex-1 grid-cols-mainLayout">
        <Sidebar />
        <BreadcrumbProvider>
          <div className="relative flex flex-col">
            <Breadcrumb />
            <Route component={KnowledgeCheck} path="/knowledge-check" />
            <Route component={SearchResult} path="/words" />
            <Route component={Learn} path="/words/:wordId" />
          </div>
        </BreadcrumbProvider>
      </div>
    </div>
  );
}
