import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useSWR from 'swr';
import { Route } from 'wouter';

import { getUserprofile } from '@/api/profile/profile';
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
import { UpdateTopic } from '@/pages/Admin/UpdateTopic/UpdateTopic';
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
  const { data: profile, isLoading: isFetchingProfile } = useSWR(
    'profile',
    getUserprofile
  );

  const userRole = profile?.data[0].role?.title || 'user';

  return (
    <div className="container flex flex-col h-screen w-full text-foreground">
      <Navbar />
      <div className="relative grid min-h-full flex-1 grid-cols-main-layout gap-4 pt-navbar max-md:grid-cols-1 max-md:pt-navbar-sm">
        <Sidebar />
        <DndProvider backend={HTML5Backend}>
          <BreadcrumbProvider>
            <div className="main-min-height relative mt-8 flex flex-1 flex-col overflow-x-hidden px-2 max-md:mt-0">
              <Breadcrumb />
              <Route component={KnowledgeCheck} path="/knowledge-check" />
              <Route component={SearchResult} path="/search" />
              <Route component={Learn} path="/words/:wordId" />
              <Route component={ProfileSettings} path="/profile" />
              <Route component={LearnPage} path="/" />
              <Route component={Exploration} path="/exploration" />
              <Route component={TopicDetailPage} path="/topics/:topicId" />
              <Route component={ReportPage} path="/report" />

              {!isFetchingProfile && userRole === 'admin' && (
                <>
                  <Route component={AdminPage} path="/admin" />
                  <Route component={ManageWord} path="/admin/words" />
                  <Route component={ManageTopic} path="/admin/topics" />
                  <Route
                    component={EditWordDetail}
                    path="/admin/edit-word/:wordId"
                  />
                  <Route
                    component={UpdateTopic}
                    path="/admin/edit-topic/:topicId"
                  />
                  <Route component={CreateNewWord} path="/admin/create-word" />
                  <Route component={CreateTopic} path="/admin/create-topic" />
                  <Route
                    component={InternalServerErrorPage}
                    path="/error/500-internal-server-error"
                  />
                </>
              )}
              {/* <Route path="/:any*" component={NotFoundError} /> */}
            </div>
          </BreadcrumbProvider>
        </DndProvider>
      </div>
    </div>
  );
}
