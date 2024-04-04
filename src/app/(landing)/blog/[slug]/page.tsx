import Image from 'next/image';
import Link from 'next/link';

import {
  getSinglePost,
  getPosts,
} from '@/services/server-functions/ghost-client';
import { format } from 'date-fns';

import { Container } from '@mui/material';

// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export default async function Read({ params }: { params: { slug: string } }) {
  const getPost = await getSinglePost(params.slug);
  console.log(getPost);

  return (
    <>
      <Container sx={{ pt: 8 }}>
        <p>hello</p>
      </Container>
    </>
  );
}
