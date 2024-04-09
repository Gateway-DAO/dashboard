import Link from 'next/link';
import Image from 'next/image';
import { Stack, Typography, Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

type Blog = {
  title: string;
  feature_image: string;
  primary_tag: string;
  excerpt: string;
  slug: string;
};

export default function BlogCard({
  title,
  feature_image,
  primary_tag,
  excerpt,
  slug,
}: Blog) {
  return (
    <Stack direction={'column'}>
      <Image
        src={feature_image}
        alt={title}
        width={560}
        height={300}
        layout="responsive"
      />
      <Button
        variant="text"
        size="medium"
        sx={{
          width: primary_tag?.length < 5 ? '10%' : '20%',
          mt: 2,
          '&:hover': {
            backgroundColor: '#fff',
          },
          bgcolor: '#fff',
        }}
      >
        {primary_tag}
      </Button>
      <Typography
        fontWeight={700}
        fontSize={'22px'}
        lineHeight={'28px'}
        color={'#000'}
        sx={{ mt: 1.5 }}
      >
        {title}
      </Typography>
      <Typography
        fontWeight={500}
        fontSize={'16px'}
        lineHeight={'24px'}
        color={'#000'}
        sx={{ mt: 1 }}
      >
        {excerpt}
      </Typography>
      <Link
        href={`/blog/${slug}`}
        style={{
          textDecoration: 'none',
          color: '#771AC9',
          marginTop: 20,
        }}
      >
        <Stack direction={'row'}>
          <Typography>Read more</Typography>
          <ChevronRight />
        </Stack>
      </Link>
    </Stack>
  );
}
