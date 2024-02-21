"use client";

import { DefaultSkeleton } from "@/components";
import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import { client } from "../sanity";
import ScrollAnimation from "react-animate-on-scroll";

interface DataItem {
  textSectionOne: string;
  textSectionTwo: string;
  textSectionThree: string;
  bannerImage: string;
  url_x: string;
  url_fb: string;
  url_ig: string;
}

type DataArrayType = Array<DataItem>;

function Banner() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<DataItem>();

  const hasConnectUsUrl = React.useMemo(
    () => data?.url_fb?.length || data?.url_ig?.length || data?.url_x?.length,
    [data]
  );

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
      <div className="my-0 mx-auto py-2 px-8 flex flex-col gap-4">
        <DefaultSkeleton />
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
          {hasConnectUsUrl && (
            <>
              <Typography
                variant="paragraph"
                color="white"
                className="mt-1 mb-7 font-medium uppercase"
                placeholder={""}
              >
                {data?.textSectionThree || ""}
              </Typography>
              <div className="gap-8 flex">
                {data?.url_x && (
                  <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    className="cursor-pointer"
                    placeholder={""}
                  >
                    <a href={data?.url_x} target="_blank">
                      <i className="fa-brands fa-twitter text-base" />
                    </a>
                  </IconButton>
                )}
                {data?.url_fb && (
                  <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    className="cursor-pointer"
                    placeholder={""}
                  >
                    <a href={data?.url_fb} target="_blank">
                      <i className="fa-brands fa-facebook text-base" />
                    </a>
                  </IconButton>
                )}

                {data?.url_ig && (
                  <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    className="cursor-pointer"
                    placeholder={""}
                  >
                    <a href={data?.url_ig} target="_blank">
                      <i className="fa-brands fa-instagram text-base" />
                    </a>
                  </IconButton>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Banner;
