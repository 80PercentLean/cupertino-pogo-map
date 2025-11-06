import type { PropsWithChildren } from "react";

interface Props {
  /** Sets the `class` attribute on the anchor element. */
  className?: string;
  /** Sets the `href` attribute on the anchor element. */
  href: string;
  /** Causes link destination to open in new window when true. */
  openNewWindow?: boolean;
}

interface NewWindowAttributes {
  rel?: string;
  target?: string;
}

/**
 * External link component that essentially sets the defaults for anchor elements
 * that direct to an external websites.
 */
export default function LinkExt(props: PropsWithChildren<Props>) {
  const { children, className: classNameProp, href, openNewWindow } = props;

  const className = classNameProp ?? "text-blue-500 underline";

  const newWindowAttributes: NewWindowAttributes = {};

  if (openNewWindow) {
    newWindowAttributes.rel = "noopener noreferrer";
    newWindowAttributes.target = "_blank";
  }

  return (
    <a href={href} className={className} {...newWindowAttributes}>
      {children}
    </a>
  );
}
