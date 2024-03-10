"use client";

import React from "react";
import Image from "next/image";
import { client } from "../sanity";
import { Button, Typography } from "@material-tailwind/react";
import ScrollAnimation from "react-animate-on-scroll";
import { DefaultSkeleton } from "@/components";

interface DataItem {
  titleOne: string;
  contentOne: string;
  imageOne: string;
  titleTwo: string;
  contentTwo: string;
  imageTwo: string;
  titleThree: string;
  contentThree: string;
  imageThree: string;
}

type DataArrayType = Array<DataItem>;

export function Content() {
  const [data, setData] = React.useState<DataItem>();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "content"]{
          titleOne,
          contentOne,
          "imageOne": imageOne.asset->url,
          titleTwo,
          contentTwo,
          "imageTwo": imageTwo.asset->url,
          titleThree,
          contentThree,
          "imageThree": imageThree.asset->url,
        }`
      )
      .then((data: DataArrayType) => {
        setData(data?.[0]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="my-0 mx-auto py-2 px-8 flex flex-col gap-4">
        <DefaultSkeleton />
        <DefaultSkeleton />
        <DefaultSkeleton />
        <DefaultSkeleton />
      </div>
    );
  }

  return (
    <section id="aboutUs" className="py-2 px-8 pt-10">
      <div className="mx-auto max-w-screen-lg">
        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
          <Typography
            variant="h2"
            color="blue-gray"
            className="mt-8 mb-6"
            placeholder={undefined}
          >
            {data?.titleOne || ""}
          </Typography>

          <Typography
            className="my-10 font-normal !text-gray-500"
            placeholder={undefined}
          >
            {data?.contentOne || ""}
          </Typography>
          {data?.imageOne && (
            <Image
              width={768}
              height={500}
              src={data?.imageOne || ""}
              alt="post"
              className="mb-4 h-[28rem] w-full rounded-xl object-cover"
            />
          )}
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
          <Typography
            variant="h2"
            color="blue-gray"
            className="mt-8 mb-6"
            placeholder={undefined}
          >
            {data?.titleTwo || ""}
          </Typography>

          <Typography
            className="my-10 font-normal !text-gray-500"
            placeholder={undefined}
          >
            {data?.contentTwo || ""}
          </Typography>
          {data?.imageTwo && (
            <Image
              width={768}
              height={500}
              src={data?.imageTwo || ""}
              alt="post"
              className="mb-4 h-[28rem] w-full rounded-xl object-cover"
            />
          )}
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
          <Typography
            variant="h2"
            color="blue-gray"
            className="mt-8 mb-6"
            placeholder={undefined}
          >
            {data?.titleThree || ""}
          </Typography>

          <Typography
            className="my-10 font-normal !text-gray-500"
            placeholder={undefined}
          >
            {data?.contentThree || ""}
          </Typography>
          {data?.imageThree && (
            <Image
              width={768}
              height={500}
              src={data?.imageThree || ""}
              alt="post"
              className="mb-4 h-[28rem] w-full rounded-xl object-cover"
            />
          )}
        </ScrollAnimation>
      </div>
    </section>
  );
}

export default Content;
