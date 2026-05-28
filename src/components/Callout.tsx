import { cn } from "@/lib/utils";
import { Lightbulb, TriangleAlert } from "lucide-react";
import { type ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export interface Props {
  /** class attribute value to append to the component's existing class value. */
  className?: string;

  /** Content of the callout. */
  content: ReactNode;

  /** Title of the callout. */
  title: ReactNode;

  /**
   * Type of the callout.
   * This will affect the styles of the callout.
   */
  type?: "troubleshooting";
}

export interface CalloutFrontProps {
  /** Subtitle of the front of the callout. */
  subtitle?: ReactNode;

  /** Title of the front of the callout. */
  title: ReactNode;

  /**
   * Type of the front of the callout.
   * This will affect the styles of the front of the callout.
   */
  type?: "troubleshooting";
}

/**
 * The initial, visible section of a Callout.
 */
export function CalloutFront({ subtitle, title, type }: CalloutFrontProps) {
  return (
    <>
      <p
        className={cn(
          "font-medium",
          type === "troubleshooting"
            ? "text-yellow-900 dark:text-yellow-100"
            : "text-blue-950 dark:text-blue-100",
        )}
      >
        {title}
      </p>
      {subtitle && (
        <p
          className={cn(
            "text-sm",
            type === "troubleshooting"
              ? "text-yellow-800/80 dark:text-yellow-200/80"
              : "text-blue-900/80 dark:text-blue-200/80",
          )}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}

/**
 * Custom component that styles the shadcn/ui Accordion component like an Alert.
 */
export default function Callout({ className, content, title, type }: Props) {
  const isTroubleshooting = type === "troubleshooting";
  return (
    <Accordion type="single" collapsible className={cn("w-full", className)}>
      <AccordionItem
        value="troubleshooting"
        className={cn(
          "rounded-lg border! px-4",
          isTroubleshooting
            ? "border-yellow-500/50 bg-yellow-500/10"
            : "border-blue-500/40 bg-blue-500/10",
        )}
      >
        <AccordionTrigger className="py-4 hover:no-underline">
          <div className="flex items-center gap-3 text-left">
            {isTroubleshooting ? (
              <TriangleAlert className="h-5 w-5 shrink-0 text-yellow-600" />
            ) : (
              <Lightbulb className="h-5 w-5 shrink-0 text-blue-600" />
            )}
            <div>{title}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <div
            className={cn(
              "space-y-3 text-sm",
              isTroubleshooting
                ? "text-yellow-900 dark:text-yellow-100"
                : "text-blue-950 dark:text-blue-100",
            )}
          >
            <hr />
            {content}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
