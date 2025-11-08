import { type PropsWithChildren } from "react";

export default function MapCover({ children }: PropsWithChildren) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-1000 flex items-center justify-center overflow-auto bg-black/50">
      {children}
    </div>
  );
}
