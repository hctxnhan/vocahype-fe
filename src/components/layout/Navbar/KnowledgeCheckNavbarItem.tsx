import useSWR from 'swr';

import { getUserprofile } from '@/api/profile/profile';
import { TOUR_STEPS } from '@/lib/configs/tour';

import { NavbarItem } from './NavbarItem';

export function KnowledgeCheckNavbarItem() {
  const { isLoading } = useSWR('profile', getUserprofile);

  if (isLoading) return null;
  // if (userProfile?.data[0].score !== null) return null;

  return (
    <NavbarItem
      href="/knowledge-check"
      data-tour={TOUR_STEPS.SIDEBAR.KNOWLEDGE_CHECK}
    >
      Knowledge Check
    </NavbarItem>
  );
}
