"use client";

import React from "react";
import Link from "next/link";

import { Button, Typography, List } from "@material-tailwind/react";
import useGetNews from "@/hooks/useGetNews";
import NewsItem from "@/components/newsItem";

const GET_NEWS_PARAMS = {
  limit: 10,
};

export function BlogPost() {
  const { news, isLoading } = useGetNews(GET_NEWS_PARAMS);
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 py-20">
      <Typography
        variant="h2"
        className=" md:text-center"
        color="blue-gray"
        placeholder={""}
      >
        News
      </Typography>
      <List className="w-full mb-4" placeholder={undefined}>
        {news?.map((item) => (
          <NewsItem key={item?.id} {...item} />
        ))}
      </List>
      <Link href="/news" className="ml-auto">
        <Button color="gray" className="mb-3" size="sm" placeholder={""}>
          查看更多
        </Button>
      </Link>
    </section>
  );
}

export default BlogPost;
