import Link from "next/link";

interface BreadcrumbProps {
  crumbs: { href: string; label: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs }) => {
  return (
    <nav className="breadcrumb">
      {crumbs.map((crumb, crumbIndex) => (
        <span key={crumbIndex} className="breadcrumb-item">
          <Link href={crumb.href}>{crumb.label}</Link>
          {crumbIndex < crumbs.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
