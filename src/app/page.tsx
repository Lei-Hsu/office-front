"use client";
import React from "react";
// components
import { Navbar, Footer } from "@/components";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

// sections
import Banner from "./banner";
import Content from "./content";
import Comments from "./comments";
import BlogPosts from "./blog-posts";
import { client } from "../sanity";

import "./globals.css";

interface DataItem {
  title: string;
  description: string;
}

type DataArrayType = Array<DataItem>;

export default function Campaign() {
  const [data, setData] = React.useState<DataItem>();

  React.useEffect(() => {
    client
      .fetch(
        `*[_type == "metadata"]{
          title,
          description
        }`
      )
      .then((data: DataArrayType) => {
        setData(data?.[0]);
      });
  }, []);

  return (
    <>
      <title>{data?.title}</title>
      <meta name="description" content={data?.description} />
      <Navbar />
      <ScrollAnimation animateIn="fadeIn">
        <Banner />
      </ScrollAnimation>
      <Content />
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
        <Comments />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
        <BlogPosts />
      </ScrollAnimation>
      <Footer />
    </>
  );
}
