import { useState, useEffect } from "react";
import { client } from "../sanity";
// @ts-ignore
import toHTML from "@sanity/block-content-to-html";
import dayjs from "dayjs";

interface DataItem {
  title: string;
  content: string;
  slug: string;
  id: string;
  date: string;
}

interface DataItemResponse extends DataItem {
  _id: string;
}

type DataArrayType = Array<DataItem>;

interface UseGetNews {
  limit?: number;
}

const useGetNews = ({ limit }: UseGetNews) => {
  const [news, setNews] = useState<DataArrayType>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "news"]{
          _id,
          title,
          slug,
          content
        }`
      )
      .then((data: DataItemResponse[]) => {
        let limitNews = data;
        
        if (limit) {
          limitNews = data?.slice(0, limit);
        }

        const res = limitNews?.map((item) => ({
          title: item?.title,
          content: toHTML({
            projectId:
              process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || "",
            dataset: "production",
            blocks: item?.content,
          }),
          slug: item?.slug,
          id: item["_id"],
          date: dayjs(item?.date).format("YYYY-MM-DD"),
        }));
        setNews(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [limit]);

  return { news, isLoading };
};

export default useGetNews;
