import Link from "next/link";
import { ROUTERS } from "@/enums/routers";

interface BreadcrumbProps {
  crumbs: { href: string; label: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs }) => {
  const renderIcon = (crumb: string) => {
    if (crumb === ROUTERS.HOME) return <i className="fas fa-home mr-2"></i>;
  };

  return (
    <nav className="breadcrumb">
      {crumbs.map((crumb, crumbIndex) => (
        <span key={crumbIndex} className="breadcrumb-item">
          {renderIcon(crumb.label)}
          <Link href={crumb.href}>{crumb.label}</Link>
          {crumbIndex < crumbs.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
