import { GetServerSidePropsContext } from 'next';
import { getServerSession as nextAuthGetServerSession } from 'next-auth';

import { nextAuthConfig } from './config';

export const getServerSession = (req: GetServerSidePropsContext["req"], res: GetServerSidePropsContext["res"]) =>
nextAuthGetServerSession(req, res, nextAuthConfig);
