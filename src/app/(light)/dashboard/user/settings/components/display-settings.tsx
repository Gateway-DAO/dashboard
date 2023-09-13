"use client"

import { useSession } from "@/context/session-provider";
import { useForm } from "react-hook-form";
import zod from "zod";

const validations = zod.object({
  // name: zod.string().min(1, "Please enter your name"),
  gatewayId: zod.string().min(1, "Please enter your Gateway Id"),
  // avatar: zod.string().url({ message: "Please enter a valid URL" }),
})

export default function DisplaySettings() {
  const { session } = useSession();

  const { } = useForm({
    defaultValues: {
      gatewayId: session?.user?.gatewayId,
    }
  })

  return <></>
}
