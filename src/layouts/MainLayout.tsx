import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

export function MainLayout() {
  return (
    <div className="h-screen w-full px-8 pb-4">
      <div className="global-background absolute inset-0 -z-50" />
      <div>
        <Navbar />
      </div>
      <div className="mt-8 grid grid-cols-mainLayout">
        <Sidebar />
        <div>
          <Breadcrumb>
            <BreadcrumbItem>Get Started</BreadcrumbItem>
            <BreadcrumbItem>Knowledge</BreadcrumbItem>
          </Breadcrumb>
          <div>
            <Button
              variant={'special'}
              size={'xl'}
              className="min-w-[300px] bg-rose-500 hover:bg-rose-500/80"
            >
              No
            </Button>
            <Button
              variant={'special'}
              size={'xl'}
              className="min-w-[300px] bg-teal-500 hover:bg-teal-500/80"
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
