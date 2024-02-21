import { Typography } from "@material-tailwind/react";

const LINKS = [
  {
    title: "Company",
    items: ["About Us", "Careers"],
  },
  {
    title: "Pages",
    items: ["Login", "Register"],
  },
  {
    title: "Legal",
    items: ["Terms", "Privacy"],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-end justify-center gap-y-4 gap-x-8 border-t border-blue-gray-50 py-6 md:justify-between">
          <div className="text-center md:text-start">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2"
              placeholder={""}
            >
              The reward for getting on the stage is fame.
            </Typography>
            <Typography className="font-normal !text-gray-700" placeholder={""}>
              The price of fame is you can&apos;t get off the stage.
            </Typography>
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
