import useSWR from 'swr';

import { getUserprofile } from '@/api/profile/profile';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { GenerateStory } from '@/pages/GenerateStory';

import { KnowledgeCheckNavbarItem } from '../Navbar/KnowledgeCheckNavbarItem';
import { NavbarItem } from '../Navbar/NavbarItem';

import { LearningTimeProgress } from './components/LearningTimeProgress';

export function Sidebar() {
  const { data: profile, isLoading: isFetchingProfile } = useSWR(
    'profile',
    getUserprofile
  );

  const userRole = profile?.data[0].role?.title || 'user';

  return (
    <div className="flex flex-col justify-between">
      <div className="sidebar-height fixed top-navbar z-[30] mt-8 flex flex-col justify-between pb-8 max-md:hidden">
        <div className="flex flex-col gap-2">
          <NavbarItem href="/" data-tour={TOUR_STEPS.SIDEBAR.LEARN}>
            Learn
          </NavbarItem>
          <KnowledgeCheckNavbarItem />
          <NavbarItem
            href="/exploration"
            data-tour={TOUR_STEPS.SIDEBAR.EXPLORATION}
          >
            Exploration
          </NavbarItem>
          <NavbarItem href="/report" data-tour={TOUR_STEPS.SIDEBAR.REPORT}>
            Report
          </NavbarItem>
          {isFetchingProfile && userRole === 'admin' && (
            <NavbarItem href="/admin">Admin</NavbarItem>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <GenerateStory />
          <LearningTimeProgress
            className="mt-auto"
            data-tour={TOUR_STEPS.SIDEBAR.LEARN_TIME}
          />
        </div>
      </div>
    </div>
  );
}
