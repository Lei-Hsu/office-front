"use client";

import React from "react";
import Link from "next/link";

import { Button, Typography, List } from "@material-tailwind/react";
import useGetNews from "@/hooks/useGetNews";
import NewsItem from "@/components/newsItem";

const GET_NEWS_PARAMS = {
  limit: 6,
};

export function BlogPost() {
  const { news, isLoading } = useGetNews(GET_NEWS_PARAMS);
  return (
    <section
      id="news"
      className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 py-20"
    >
      <Typography
        variant="h2"
        className=" md:text-center mb-2"
        color="blue-gray"
        placeholder={""}
      >
        News
      </Typography>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 w-full mb-4">
        {news?.map((item) => (
          <NewsItem key={item?.id} {...item} />
        ))}
      </div>
      <Link href="/news" className="ml-auto">
        <Button color="gray" variant="text" className="mb-3" size="sm" placeholder={""}>
          Read more
        </Button>
      </Link>
    </section>
  );
}

export default BlogPost;
