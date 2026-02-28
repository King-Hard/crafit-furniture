"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl">
          The page you are looking for is not found
        </h1>
        <Link href="/">
          <Button>Back to Home Page</Button>
        </Link>
      </div>
    </div>
  );
}