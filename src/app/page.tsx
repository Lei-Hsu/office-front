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

import "./globals.css";

export default function Campaign() {
  return (
    <>
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
