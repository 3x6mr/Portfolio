import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Rootlayout = async ({ children }: { children: ReactNode }) => {
  const userAuthenticated = await isAuthenticated();
  if (!userAuthenticated) redirect("/sign-in");
  return (
    <div className="root-layout">
      <Link href="/" className="flex gap-2 item-center">
        <Image src="/logo.svg" alt="logo" width={38} height={32} />
        <h2 className="text-primary-100">PrepWise</h2>
      </Link>
      {children}
    </div>
  );
};

export default Rootlayout;
