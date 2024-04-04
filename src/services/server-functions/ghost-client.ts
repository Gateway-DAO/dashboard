import GhostContentAPI from '@tryghost/content-api';

console.log(process.env.GHOST_URL, process.env.GHOST_KEY);

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: 'v5.0',
});

export async function getNavigation() {
  return await api.settings.browse();
}

export async function getPosts() {
  return await api.posts
    .browse({
      include: ['tags', 'authors'],
      limit: 10,
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
