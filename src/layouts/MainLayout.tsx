import { Route } from 'wouter';

import { Breadcrumb } from '@/components/layout/Breadcrumb/Breadcrumb';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { BreadcrumbProvider } from '@/lib/context/breadcrumb.context';
import { AdminPage } from '@/pages/Admin';
import { CreateTopic } from '@/pages/Admin/CreateNewTopic/CreateTopic';
import { CreateNewWord } from '@/pages/Admin/CreateNewWord/CreateNewWord';
import { EditWordDetail } from '@/pages/Admin/EditWordDetail/EditWordDetail';
import { ManageTopic } from '@/pages/Admin/ManageTopic/ManageTopic';
import { ManageWord } from '@/pages/Admin/ManageWord/ManageWord';
import { InternalServerErrorPage } from '@/pages/Error/InternalServerErrorPage';
import { Exploration } from '@/pages/Exploration/Exploration';
import { KnowledgeCheck } from '@/pages/KnowledgeCheck/KnowledgeCheck';
import { Learn } from '@/pages/Learn/Learn';
import { ProfileSettings } from '@/pages/ProfileSettings/ProfileSettings';
import { ReportPage } from '@/pages/Report/ReportPage';
import { SearchResult } from '@/pages/Search/SearchResult';
import { LearnPage } from '@/pages/WordList/LearnPage';
import { TopicDetailPage } from '@/pages/WordList/TopicDetailPage';

export function MainLayout() {
  return (
    <div className="container h-screen w-full text-foreground">
      <Navbar />
      <div className="relative grid min-h-full flex-1 grid-cols-main-layout gap-4 pt-navbar max-md:grid-cols-1 max-md:pt-navbar-sm">
        <Sidebar />
        <BreadcrumbProvider>
          <div className="main-min-height relative mt-8 flex flex-1 flex-col overflow-x-hidden max-md:mt-0 px-2">
            <Breadcrumb />
            <Route component={KnowledgeCheck} path="/knowledge-check" />
            <Route component={SearchResult} path="/search" />
            <Route component={Learn} path="/words/:wordId" />
            <Route component={ProfileSettings} path="/profile" />
            <Route component={LearnPage} path="/" />
            <Route component={Exploration} path="/exploration" />
            <Route component={TopicDetailPage} path="/topics/:topicId" />
            <Route component={ReportPage} path="/report" />

            <Route component={AdminPage} path="/admin" />
            <Route component={ManageWord} path="/admin/words" />
            <Route component={ManageTopic} path="/admin/topics" />
            <Route component={EditWordDetail} path="/admin/edit-word/:wordId" />
            <Route component={CreateNewWord} path="/admin/create-word" />
            <Route component={CreateTopic} path="/admin/create-topic" />
            <Route
              component={InternalServerErrorPage}
              path="/error/500-internal-server-error"
            />
            {/* <Route path="/:any*" component={NotFoundError} /> */}
          </div>
        </BreadcrumbProvider>
      </div>
    </div>
  );
}
