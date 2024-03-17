import { ListItem, Typography } from "@material-tailwind/react";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
import dayjs from "dayjs";
import Link from "next/link";

interface NewsItemProps {
  slug: string;
  title: string;
  subtitle: string;
  id: string;
  date: string;
}

const NewsItem: React.FC<NewsItemProps> = ({
  slug,
  title,
  id,
  date,
  subtitle,
}) => {
  const formattedDate = dayjs(date).format("MMM D, YYYY");

  return (
    <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
      <Link href={`/news/${slug}?id=${id}`}>
        <ListItem
          key={id}
          className="flex justify-between cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          placeholder={undefined}
        >
          <div className="flex flex-col">
            <Typography className="text-gray-500 mb-1" placeholder={undefined}>
              {formattedDate}
            </Typography>
            <Typography
              className="text-xl mr-2 mb-1 text-black font-medium"
              placeholder={undefined}
            >
              {title}
            </Typography>
            <Typography
              className="text-gray-500 mb-2 line-clamp-3"
              placeholder={undefined}
            >
              {subtitle}
            </Typography>
          </div>
        </ListItem>
      </Link>
    </ScrollAnimation>
  );
};

export default NewsItem;
