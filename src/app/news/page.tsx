"use client";
import React from "react";
import { List } from "@material-tailwind/react";

// components
import { NewsNavbar } from "@/components";
import useGetNews from "@/hooks/useGetNews";
import NewsItem from "@/components/newsItem";
import Breadcrumb from "@/components/breadcrumb";
import { ROUTERS } from "@/enums/routers";

const CRUMBS_DATA = [{ href: "/", label: ROUTERS.HOME }];

const GET_NEWS_PARAMS = {};

const NewsPage: React.FC = () => {
  const { news, isLoading } = useGetNews(GET_NEWS_PARAMS);
  return (
    <div>
      <NewsNavbar />
      <section className="w-full flex flex-col px-4 py-20 mx-auto  max-w-screen-lg">
        <Breadcrumb crumbs={CRUMBS_DATA} />
        <List className="w-full mb-4" placeholder={undefined}>
          {news?.map((item, index) => (
            <NewsItem key={item?.id} {...item} />
          ))}
        </List>
      </section>
    </div>
  );
};

export default NewsPage;
