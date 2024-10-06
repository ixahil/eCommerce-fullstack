import Link from "next/link";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumbCustom = ({ pathname }: { pathname: string }) => {
  // Get the path segments from the pathname, excluding empty strings (e.g., leading slash)
  const pathArray = pathname.split("/").filter((path) => path !== "");

  // Construct the full path for each segment
  const createFullPath = (index: number) =>
    `/admin/${pathArray.slice(0, index + 1).join("/")}`;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Loop through pathArray and generate breadcrumbs */}
        {pathArray.length > 0 &&
          pathArray.map((path, index) => {
            const fullPath = createFullPath(index);
            const isLast = index === pathArray.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    // If it's the last item, don't make it a link
                    <BreadcrumbPage className="capitalize">
                      {path}
                    </BreadcrumbPage>
                  ) : (
                    // Otherwise, create a link
                    <BreadcrumbLink asChild>
                      <Link href={fullPath} className="capitalize">
                        {path}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbCustom;
