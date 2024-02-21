"use client";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { scrollToAnchor } from "@/util/scrollTo";

export function FixedPlugin() {
  return (
    <Button
      color="white"
      size="sm"
      className="!fixed bottom-4 right-4 flex gap-1 pl-2 items-center border border-blue-gray-50"
      placeholder={undefined}
      onClick={() => scrollToAnchor("home")}
    >
      <i className="fa-solid fa-arrow-up"></i>
      Top
    </Button>
  );
}
