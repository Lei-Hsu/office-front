"use client";

import React from "react";
import { client } from "../sanity";
import { Typography } from "@material-tailwind/react";

import MemberCard from "@/components/member-card";
import { CardSkeleton } from "@/components";

interface DataItem {
  image: string;
  name: string;
  title: string;
  desc: string;
}

type DataArrayType = Array<DataItem>;

const MEMBERS = [
  {
    image: "/image/avatar1.jpg",
    name: "Tina Andrew",
    title: "CEO",
    desc: "Chance too good. God level bars. I'm so proud of @LifeOfDesiigner #1 song in the country. Panda! Don't be scared of the truth because we need to restart the human foundation in truth I stand with the most humility. We are so blessed!All praises and blessings to the families of people who never gave up on dreams. Don't forget, You're Awesome! ",
  },
  {
    image: "/image/avatar2.jpg",
    name: "Tina Andrew",
    title: "CFO",
    desc: "Chance too good. God level bars. I'm so proud of @LifeOfDesiigner #1 song in the country. Panda! Don't be scared of the truth because we need to restart the human foundation in truth I stand with the most humility. We are so blessed!All praises and blessings to the families of people who never gave up on dreams. Don't forget, You're Awesome! ",
  },
  {
    image: "/image/avatar2.jpg",
    name: "Tina Andrew",
    title: "COO",
    desc: "Chance too good. God level bars. I'm so proud of @LifeOfDesiigner #1 song in the country. Panda! Don't be scared of the truth because we need to restart the human foundation in truth I stand with the most humility. We are so blessed!All praises and blessings to the families of people who never gave up on dreams. Don't forget, You're Awesome! ",
  },
];

export function Comments() {
  const [data, setData] = React.useState<DataArrayType>();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "members"]{
          name,
          title,
          desc,
          "image": image.asset->url,
        }`
      )
      .then((data: DataArrayType) => {
        setData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section
      id="teamMember"
      className="mx-auto  max-w-screen-lg flex flex-col px-5 pb-20 pt-20"
    >
      <Typography
        variant="h2"
        className=" md:text-center"
        color="blue-gray"
        placeholder={""}
      >
        Team Members
      </Typography>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {data?.length && (
          <>
            {data?.map((props, idx) => (
              <MemberCard key={idx} {...props} />
            ))}
          </>
        )}
        {isLoading && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </div>
    </section>
  );
}
export default Comments;
