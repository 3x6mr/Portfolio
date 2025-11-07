import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const Rootlayout = ({ children }: { children: ReactNode }) => {
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
