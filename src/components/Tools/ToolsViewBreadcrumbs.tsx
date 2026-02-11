import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { type Dispatch, type SetStateAction } from "react";

export interface Props {
  nav: string | null;
  setNav: Dispatch<SetStateAction<string | null>>;
}

/**
 * Breadcrumbs for the Wayfarer tools view.
 */
export default function ToolsViewBreadcrumbs({ nav, setNav }: Props) {
  let latestBreadcrumb;
  switch (nav) {
    case "placed-marker":
      latestBreadcrumb = "Placed Marker Tool";
      break;
    case "distance-calc":
      latestBreadcrumb = "Distance Calculator Tool";
      break;
    default:
      nav = null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {nav === null ? (
            <BreadcrumbPage>Tools</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              className="cursor-pointer"
              onClick={() => setNav(null)}
            >
              Tools
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {nav && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{latestBreadcrumb}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
