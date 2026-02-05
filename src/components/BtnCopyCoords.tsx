import BtnCopy from "./BtnCopy";
import { useStore } from "./hooks/store";

export interface Props {
  className?: string;
  lat: number;
  lng: number;
}

export default function BtnCopyCoords({ className, lat, lng }: Props) {
  const invertCoords = useStore((s) => s.invertCoords);

  const clipboardTxt = invertCoords ? `${lng},${lat}` : `${lat},${lng}`;

  return (
    <BtnCopy text="Copy coords" value={clipboardTxt} className={className} />
  );
}
