import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

import { BLOG_PAGE_SIZE } from '@/app/(landing)/blog/constants';
import { getPosts } from '@/services/server-functions/ghost-client';

export async function GET(req: NextApiRequest) {
  const url = new URL(req.url!);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.get('tag') ?? undefined;
  const page = parseInt(searchParams.get('page') ?? '0');

  const posts = await getPosts(BLOG_PAGE_SIZE, { page, tag });

  return NextResponse.json({ posts, meta: posts.meta });
}
