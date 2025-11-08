import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import MapCover from "./MapCover";

/**
 * Displays the settings view.
 */
export default function SettingsView() {
  const [showHiddenPois, setShowHiddenPois] = useState(false);

  return (
    <MapCover>
      <Card className="absolute top-0 right-0 left-0 min-h-full rounded-none md:static md:min-h-0 md:w-[500px] md:rounded-xl">
        <CardHeader>
          <CardTitle>
            <h1>Settings</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={showHiddenPois}
              onCheckedChange={(s) => setShowHiddenPois(s === true)}
            />
            <Label htmlFor="terms">Click to toggle me</Label>
          </div>
        </CardContent>
      </Card>
    </MapCover>
  );
}
