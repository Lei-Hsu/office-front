"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// @ts-ignore
import toHTML from "@sanity/block-content-to-html";

// components
import { NewsNavbar, Footer } from "@/components";
import { client } from "@/sanity";
import { Typography } from "@material-tailwind/react";
import dayjs from "dayjs";
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

  return (
    <div>
      <NewsNavbar />
      <section className="w-full flex flex-col px-4 py-20 mx-auto  max-w-screen-lg">
        <Breadcrumb crumbs={CRUMBS_DATA} />
        <div className="mb-8 pb-2 border-b border-gray-400">
          <Typography
            className="text-gray-800 text-[48px] mb-1"
            variant="h1"
            placeholder={undefined}
          >
            {news?.title || ""}
          </Typography>
          <Typography
            className="text-gray-400"
            variant="h6"
            placeholder={undefined}
          >
            {news?.date || ""}
          </Typography>
        </div>
        {news?.content && (
          <div dangerouslySetInnerHTML={{ __html: news?.content }} />
        )}
      </section>
    </div>
  );
};

export default Index;
