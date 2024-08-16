import { NextRequest, NextResponse } from 'next/server';

import { BLOG_PAGE_SIZE } from '@/app/blog/constants';
import { getPosts } from '@/services/server-functions/ghost-client';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.get('tag') ?? undefined;
  const ignoreId = searchParams.get('ignoreId') ?? undefined;
  const page = parseInt(searchParams.get('page') ?? '0');

  const posts = await getPosts(BLOG_PAGE_SIZE, {
    page,
    tag,
    ignoreIds: ignoreId ? [ignoreId] : undefined,
  });

  return NextResponse.json({ posts, meta: posts.meta });
}
