import { Button } from "@/components/ui/button";

/**
 * Button that toggles My Location functionality.
 */
export default function BtnMyLocation() {
  return (
    <Button
      size="icon"
      className="fixed right-0 bottom-0 z-1001 m-2 cursor-pointer shadow-sm"
      title="My Location"
    >
      <div className="relative flex h-6 w-6 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-[#5c84f0] opacity-50" />
        <div className="h-4 w-4 rounded-full border-2 border-white bg-[#5c84f0]" />
      </div>
    </Button>
  );
}
