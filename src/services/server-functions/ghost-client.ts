import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: 'v5.0',
});

export async function getNavigation() {
  return await api.settings.browse();
}

export async function getPosts(limit: number) {
  return await api.posts
    .browse({
      include: ['tags'],
      limit: limit,
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getAllTags() {
  return await api.tags
    .browse({
      limit: 'all',
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getTagPosts(tagSlug: string) {
  return await api.posts
    .browse({
      filter: `tag:${tagSlug}`,
      include: ['tags', 'authors'],
      limit: 20,
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read(
      {
        slug: postSlug,
      },
      { include: ['tags', 'authors'] }
    )
    .catch((err) => {
      console.error(err);
    });
}
