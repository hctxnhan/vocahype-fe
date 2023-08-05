import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';
import { KnowledgeCheck } from '@/pages/KnowledgeCheck/KnowledgeCheck';
import { Learn } from '@/pages/Learn/Learn';

export function MainLayout() {
  return (
    <div className="flex h-screen w-full flex-col px-8 pb-4 text-neutral-950">
      <div className="global-background absolute inset-0 -z-50" />
      <div>
        <Navbar />
      </div>
      <div className="mt-8 grid flex-1 grid-cols-mainLayout">
        <Sidebar />
        <div className="relative flex flex-col">
          <Breadcrumb>
            <BreadcrumbItem>Get Started</BreadcrumbItem>
            <BreadcrumbItem>Knowledge</BreadcrumbItem>
          </Breadcrumb>
          {/* <KnowledgeCheck /> */}
          <Learn />
        </div>
      </div>
    </div>
  );
}
