"use client";

import { Button } from "@material-tailwind/react";

export function FixedPlugin() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      color="white"
      size="sm"
      className="!fixed bottom-4 right-4 flex gap-1 pl-2 items-center border border-blue-gray-50"
      placeholder={undefined}
      onClick={handleScrollToTop}
    >
      <i className="fa-solid fa-arrow-up"></i>
      Top
    </Button>
  );
}
