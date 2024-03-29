import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { client } from "../sanity";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { scrollToAnchor } from "@/util/scrollTo";

const NAV_MENU = [
  {
    title: "About Us",
    anchor: "aboutUs",
  },
  {
    title: "Team Members",
    anchor: "teamMember",
  },
  {
    title: "News",
    anchor: "news",
  },
];

interface DataItem {
  logoName: string;
}

type DataArrayType = Array<DataItem>;

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<DataItem>();

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "banner"]{
          logoName
        }`
      )
      .then((data: DataArrayType) => {
        setData(data?.[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavItem = ({ title, anchor }: { title: string; anchor: string }) => {
    return (
      <li key={title}>
        <Typography
          variant="paragraph"
          className={`flex items-center cursor-pointer gap-2 font-medium ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
          placeholder={""}
          onClick={() => scrollToAnchor(anchor)}
        >
          {title}
        </Typography>
      </li>
    );
  };

  const MobileNavItem = ({
    title,
    anchor,
  }: {
    title: string;
    anchor: string;
  }) => {
    return (
      <li>
        <Typography
          variant="paragraph"
          className={`flex items-center cursor-pointer gap-2 font-medium text-gray-900`}
          placeholder={""}
          onClick={() => scrollToAnchor(anchor)}
        >
          {title}
        </Typography>
      </li>
    );
  };

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0"
      placeholder={undefined}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          className="text-lg font-bold cursor-pointer"
          color={isScrolling ? "blue-gray" : "white"}
          placeholder={undefined}
          onClick={() => scrollToAnchor("home")}
        >
          {data?.logoName || "Megawood Capital"}
        </Typography>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          {NAV_MENU.map((item, index) => (
            <div key={index}>
              <NavItem title={item?.title} anchor={item?.anchor} />
            </div>
          ))}
        </ul>
        <div className="hidden"></div>
        <IconButton
          variant="text"
          onClick={handleOpen}
          color={isScrolling ? "gray" : "white"}
          className="ml-auto inline-block lg:hidden"
          placeholder={undefined}
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      {/* mobile menu */}
      <Collapse open={open}>
        <div className="container mx-auto bg-white rounded-lg py-4 px-6 mt-3 border-t border-gray-200">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map((item, index) => (
              <div key={index}>
                <MobileNavItem title={item?.title} anchor={item?.anchor} />
              </div>
            ))}
          </ul>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
