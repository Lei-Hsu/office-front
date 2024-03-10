"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Navbar, Typography } from "@material-tailwind/react";
import { client } from "../sanity";

interface DataItem {
  logoName: string;
}

type DataArrayType = Array<DataItem>;

export function NewsNavbar() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<DataItem>();

  React.useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "banner"]{
          logoName
        }`
      )
      .then((data: DataArrayType) => {
        setData(data?.[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <Navbar
      fullWidth
      shadow={false}
      blurred={false}
      className="fixed top-0 z-50 border-0 border-b-2 border-solid border-gray-200 bg-black"
      placeholder={undefined}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          className="text-lg font-bold cursor-pointer"
          color={"white"}
          placeholder={undefined}
          onClick={handleBackToHome}
        >
          {data?.logoName || "Megawood Capital"}
        </Typography>
      </div>
    </Navbar>
  );
}

export default Navbar;
