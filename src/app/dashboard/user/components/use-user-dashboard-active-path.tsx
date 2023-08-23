"use client";
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Gets the active path of the user dashboard
 * @returns the active path of the user dashboard
 */
export default function useUserDashboardActivePath() {
  const searchParams = useSearchParams();
  const activePath = usePathname();
  // If the user is on the proof page, and it recognizes that the proof is from the verifier
  // sets the active path as the data requests page
  // TODO: This is a temporary solution, we need to find a better way to do this
  // if (activePath === '/dashboard/user/proof' searchParams.has('aa')) {
  //   if()
  //   activePath = '/dashboard/user/data-requests';
  // } else {
  // }
  return activePath;
};
