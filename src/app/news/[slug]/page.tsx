"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
// @ts-ignore
import toHTML from "@sanity/block-content-to-html";

// components
import { NewsNavbar } from "@/components";
import { client } from "@/sanity";
import { CardHeader, Typography } from "@material-tailwind/react";
import Breadcrumb from "@/components/breadcrumb";
import { ROUTERS } from "@/enums/routers";

interface DataItem {
  title: string;
  content: string;
  slug: string;
  id: string;
  date: string;
}

const CRUMBS_DATA = [
  { href: "/", label: ROUTERS.HOME },
  { href: "/news", label: ROUTERS.NEWS },
];

const Index: React.FC = () => {
  const searchParams = useSearchParams();

  const [news, setNews] = useState<DataItem>();
  const [isLoading, setIsLoading] = useState(false);

  const id = searchParams?.get("id");

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "news" && _id == "${id}"]{
          _id,
          title,
          subtitle,
          date,
          slug,
          content
        }`
      )
      .then((data) => {
        const res = data?.map((item: DataItem) => ({
          title: item?.title,
          content: toHTML({
            projectId:
              process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || "",
            dataset: "production",
            blocks: item?.content,
          }),
          slug: item?.slug,
          date: dayjs(item?.date).format("YYYY-MM-DD"),
        }));
        setNews(res[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleConvertHTML = (data: string) => {
    return data
      ?.replaceAll("<h1>", `<h1 class="html-h-1 html-title-border">`)
      ?.replaceAll("<h2>", `<h2 class="html-h-2 html-title-border">`)
      ?.replaceAll("<h3>", `<h3 class="html-h-3 html-title-border">`)
      ?.replaceAll("<p></p>", `<div class="html-mb-2"></div>`)
      ?.replaceAll("<p>", `<ol class="html-p">`);
  };

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
          <Typography
            as="div"
            variant="h1"
            className="mb-4 h-3 w-56 rounded-full bg-gray-300"
            placeholder={""}
          >
            &nbsp;
          </Typography>
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
    <div>
      <NewsNavbar />
      <section className="w-full flex flex-col px-4 py-20 mx-auto  max-w-screen-lg">
        <Breadcrumb crumbs={CRUMBS_DATA} />
        <div className="mb-8 pb-2 border-b-2">
          <Typography
            className="text-gray-800 text-[48px] mb-1"
            variant="h1"
            placeholder={undefined}
          >
            {news?.title || ""}
          </Typography>
          <Typography
            className="text-gray-500"
            variant="h6"
            placeholder={undefined}
          >
            {dayjs(news?.date).format("MMM D, YYYY") || ""}
          </Typography>
        </div>
        {news?.content && (
          <div
            dangerouslySetInnerHTML={{
              __html: handleConvertHTML(news?.content || ""),
            }}
          />
        )}
      </section>
    </div>
  );
};

export default Index;
