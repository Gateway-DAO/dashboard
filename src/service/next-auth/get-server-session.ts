import { getServerSession as nextAuthGetServerSession } from 'next-auth';

import { nextAuthConfig } from './config';
import { GetServerSidePropsContext } from 'next';

export const getServerSession = (req: GetServerSidePropsContext["req"], res: GetServerSidePropsContext["res"]) =>
nextAuthGetServerSession(req, res, nextAuthConfig);
