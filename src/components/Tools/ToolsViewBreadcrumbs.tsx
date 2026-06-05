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
            <BreadcrumbPage>
              <h1>{toolsTitle}</h1>
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              className="cursor-pointer"
              onClick={() => setNav(null)}
            >
              <h1>{toolsTitle}</h1>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {nav && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <h2>{latestBreadcrumb}</h2>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
