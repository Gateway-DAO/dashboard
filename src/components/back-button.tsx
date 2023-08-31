"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  href: string;
}

export default function BackButton({ href }: Props) {
  const searchParams = useSearchParams();
  return (
    <Link href={searchParams.get("back") ?? href}>
      Back
    </Link>
  )
}
