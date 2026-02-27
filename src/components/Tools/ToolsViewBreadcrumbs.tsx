import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ToolCase } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

import UiOverlayCardIconTitle from "../UiOverlayCardIconTitle";

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

  const toolsTitle = <UiOverlayCardIconTitle Icon={ToolCase} text="Tools" />;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {nav === null ? (
            <BreadcrumbPage>{toolsTitle}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              className="cursor-pointer"
              onClick={() => setNav(null)}
            >
              {toolsTitle}
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
