import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: 'v5.0',
  makeRequest: async ({ url, method, params, headers }) => {
    const apiUrl = new URL(url);

    const { filter, ...urlParams } = params;

    Object.keys(urlParams)
      .filter((key) => key !== 'filter')
      .map((key) =>
        apiUrl.searchParams.set(
          key,
          encodeURIComponent([].concat(params[key]).join(','))
        )
      );
    let stringApiURL = apiUrl.toString();

    if (filter) {
      stringApiURL += `&filter=${filter}`;
    }

    try {
      const response = await fetch(stringApiURL, { method, headers });
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(error);
    }
  },
});

export async function getNavigation() {
  return await api.settings.browse().catch((err) => {
    throw new Error(err);
  });
}

export async function getPosts(
  limit: number,
  {
    page,
    tag,
    ignoreIds,
  }: {
    page?: number;
    ignoreIds?: string[];
    tag?: string;
  } = {}
) {
  const filter = [
    ...(ignoreIds ? ignoreIds.map((id) => `id:-${id}`) : []),
    ...(tag ? [`tag:${tag}`] : []),
  ].join('+');

  return api.posts.browse({
    include: ['tags'],
    limit,
    ...(page && { page: page }),
    ...(filter.length && {
      filter,
    }),
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

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read(
      {
        slug: postSlug,
      },
      { include: ['tags', 'authors'] }
    )
    .catch((err) => {
      throw new Error(err);
    });
}
