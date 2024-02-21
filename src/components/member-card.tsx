import Image from "next/image";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import ScrollAnimation from "react-animate-on-scroll";

interface MemberCardProps {
  image: string;
  title: string;
  name: string;
  desc: string;
}

export function MemberCard({ image, name, desc, title }: MemberCardProps) {
  return (
    <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
      <Card
        shadow={false}
        color="transparent"
        className="grid items-center gap-6 "
        placeholder={""}
      >
        <div className=" !m-0 h-full  w-full">
          <Image
            width={768}
            height={768}
            src={image}
            alt={`${name} ${title}`}
            className="h-full rounded w-full object-cover object-center"
          />
        </div>
        <CardBody className="p-0 gap-5 flex " placeholder={""}>
          <div>
            <div className="flex flex-col mb-3 justify-center">
              <Typography
                variant="h3"
                className=" font-bold flex items-center gap-2 !text-gray-900"
                placeholder={""}
              >
                {name}
              </Typography>
              <Typography
                variant="h4"
                className="font-medium !text-gray-500"
                placeholder={""}
              >
                {title}
              </Typography>
            </div>
            <Typography
              className="w-full font-normal mb-4 !text-gray-500"
              placeholder={""}
            >
              {desc}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </ScrollAnimation>
  );
}

export default MemberCard;
