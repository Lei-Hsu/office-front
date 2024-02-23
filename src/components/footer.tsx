import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { client } from "../sanity";

interface DataItem {
  phone: string;
  email: string;
  address: string;
  url_x: string;
  url_fb: string;
  url_ig: string;
}

type DataArrayType = Array<DataItem>;

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<DataItem>();

  React.useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "footer"]{
          phone,
          email,
          address,
          url_x,
          url_fb,
          url_ig,
        }`
      )
      .then((data: DataArrayType) => {
        setData(data?.[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <footer id="contact" className="px-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-end justify-start gap-y-4 gap-x-8 border-t border-blue-gray-50 py-6 md:justify-between">
          <div className="text-center md:text-start md:flex">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 text-left"
              placeholder={""}
            >
              Contact Us
            </Typography>
            <div className="md:ml-[250px] md:flex md:gap-10">
              <div>
                {data?.phone && (
                  <a href={`tel:${data?.phone}`}>
                    <Typography
                      className="font-normal !text-gray-700 text-left "
                      placeholder={""}
                    >
                      {data?.phone}
                    </Typography>
                  </a>
                )}
                {data?.email && (
                  <a href={`mailto:${data?.email}`}>
                    <Typography
                      className="font-normal !text-gray-700 text-left "
                      placeholder={""}
                    >
                      {data?.email}
                    </Typography>
                  </a>
                )}
              </div>
              <div>
                {data?.address && (
                  <Typography
                    className="font-normal !text-gray-700 text-left "
                    placeholder={""}
                  >
                    {data?.address}
                  </Typography>
                )}
                <div className="gap-8 flex justify-start md:justify-center">
                  {data?.url_x && (
                    <IconButton
                      variant="text"
                      color="white"
                      size="sm"
                      className="cursor-pointer"
                      placeholder={""}
                    >
                      <a href={data?.url_x} target="_blank">
                        <i className="fa-brands fa-twitter text-base text-gray-700" />
                      </a>
                    </IconButton>
                  )}

                  {data?.url_fb && (
                    <IconButton
                      variant="text"
                      color="white"
                      size="sm"
                      className="cursor-pointer"
                      placeholder={""}
                    >
                      <a href={data?.url_fb} target="_blank">
                        <i className="fa-brands fa-facebook text-base text-gray-700" />
                      </a>
                    </IconButton>
                  )}

                  {data?.url_ig && (
                    <IconButton
                      variant="text"
                      color="white"
                      size="sm"
                      className="cursor-pointer"
                      placeholder={""}
                    >
                      <a href={data?.url_ig} target="_blank">
                        <i className="fa-brands fa-instagram text-base text-gray-700" />
                      </a>
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Typography
            color="gray"
            placeholder={""}
            className="text-center font-normal !text-gray-700"
          >
            &copy; {CURRENT_YEAR}
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
