import { PropsWithChildren, ReactNode } from "react";

type Props = {
  content: ReactNode;
}

export default function DashboardLayout({ content, children }: PropsWithChildren<Props>) {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        {content}
      </div>
      {children}
    </div>
  )
}
