"use client";

import { DefaultSkeleton } from "@/components";
import { CardHeader, IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import { client } from "../sanity";
import ScrollAnimation from "react-animate-on-scroll";

interface DataItem {
  textSectionOne: string;
  textSectionTwo: string;
  bannerImage: string;
}

type DataArrayType = Array<DataItem>;

function Banner() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<DataItem>();

  React.useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "banner"]{
          textSectionOne,
          textSectionTwo,
          textSectionThree,
          "bannerImage": bannerImage.asset->url,
          url_x,
          url_fb,
          url_ig,
        }`
      )
      .then((data: DataArrayType) => {
        setData(data?.[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-screen-lg mx-auto h-screen flex justify-center items-center">
        <div
          className="w-full px-2"
          style={{
            animation: "fade 2s infinite",
          }}
        >
          <CardHeader
            shadow={false}
            floated={false}
            className="relative grid h-56 place-items-center bg-gray-300 mb-4"
            placeholder={""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-12 w-12 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </CardHeader>
          {Array.from({ length: 25 }).map((_, index) => (
            <Typography
              as="div"
              key={index}
              variant="paragraph"
              className="mb-2 h-2 w-full rounded-full bg-gray-300"
              placeholder={""}
            >
              &nbsp;
            </Typography>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      id="home"
      className={`relative min-h-screen w-full bg-cover bg-no-repeat`}
      style={{
        backgroundImage: `url(${data?.bannerImage || "./image/image-4.jpeg"})`,
      }}
    >
      <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <ScrollAnimation className="fadeIn">
            <Typography variant="h1" color="white" placeholder={""}>
              {data?.textSectionOne || ""}
            </Typography>
          </ScrollAnimation>
          <ScrollAnimation className="fadeIn">
            <Typography
              variant="lead"
              color="white"
              className="mt-4 mb-12 w-full md:max-w-full lg:max-w-3xl"
              placeholder={""}
            >
              {data?.textSectionTwo || ""}
            </Typography>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}
export default Banner;
