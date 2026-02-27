import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectMyLocationRange() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-[1001]">
        <SelectItem value="poi">POI Interaction Range (80m)</SelectItem>
        <SelectItem value="wild-spawn">Wild Spawn Visibility (50m)</SelectItem>
        <SelectItem value="location-accuracy">Location Accuracy</SelectItem>
      </SelectContent>
    </Select>
  );
}
