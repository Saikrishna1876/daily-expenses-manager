"use client";

import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

function Loading({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 1000);
  }, []);

  if (isMounted) return children;
  return (
    <div className="fixed h-screen w-screen flex items-center justify-center z-50 opacity-50 bg-black">
      <HashLoader color="white" />
    </div>
  );
}

export default Loading;
