import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function MobileHeader() {
  const { data: session } = useSession();
  const router = useRouter();

}
