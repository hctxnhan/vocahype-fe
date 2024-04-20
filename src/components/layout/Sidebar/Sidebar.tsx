import { TOUR_STEPS } from '@/lib/configs/tour';

import { KnowledgeCheckNavbarItem } from '../Navbar/KnowledgeCheckNavbarItem';
import { NavbarItem } from '../Navbar/NavbarItem';

import { LearningTimeProgress } from './components/LearningTimeProgress';

export function Sidebar() {
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
          <NavbarItem href="/admin">
            Admin
          </NavbarItem>
        </div>
        <LearningTimeProgress
          className="mt-auto"
          data-tour={TOUR_STEPS.SIDEBAR.LEARN_TIME}
        />
      </div>
    </div>
  );
}
