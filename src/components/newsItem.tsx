import { ListItem, Typography } from "@material-tailwind/react";
import Link from "next/link";

interface NewsItemProps {
  slug: string;
  title: string;
  id: string;
  date: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ slug, title, id, date }) => {
  return (
    <Link href={`/news/${slug}?id=${id}`}>
      <ListItem
        key={id}
        className="border-b border-gray-200 flex justify-between cursor-pointer"
        placeholder={undefined}
      >
        <div className="flex w-full">
          <Typography className="text-xl mr-2" placeholder={undefined}>
            {title}
          </Typography>
          <Typography className="text-gray-500" placeholder={undefined}>
            {date}
          </Typography>
        </div>
        <div className="w-[100px] text-blue-500">Read more</div>
      </ListItem>
    </Link>
  );
};

export default NewsItem;
