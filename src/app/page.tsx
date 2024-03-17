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
import Script from "next/script";

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
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `<!-- Google Tag Manager -->
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || ''}');
    <!-- End Google Tag Manager -->`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || ''}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
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
