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
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {nav === null ? (
            <BreadcrumbPage>Tools</BreadcrumbPage>
          ) : (
            <BreadcrumbLink onClick={() => setNav(null)}>Tools</BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {nav === "distance-calc" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>POI Distance Calculator</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
