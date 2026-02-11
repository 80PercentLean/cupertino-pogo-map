import { Eye, EyeClosed } from "lucide-react";
import { useContext } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";

import { imgLeafletMarker } from "../leafletIcons";
import { MapContext } from "./MapContext";
import { useStore } from "./hooks/store";
import { Button } from "./ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "./ui/field";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

interface FormData {
  lat: number;
  lng: number;
}

const itemClassName =
  "cursor-pointer text-sm px-4 pr-0 w-full rounded-none justify-start h-12 font-normal gap-2";
const iconClassName = "h-full w-auto object-contain";
const nameClassName = "flex h-full items-center overflow-x-scroll pr-2";

export default function PlacedMarkerView() {
  const { map } = useContext(MapContext);
  const activePopup = useStore((s) => s.activePopup);
  const addPlacedMarkerState = useStore((s) => s.addPlacedMarkerState);
  const placedMarkerStates = useStore((s) => s.placedMarkerStates);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const updatePlacedMarkerState = useStore((s) => s.updatePlacedMarkerState);

  const { control, handleSubmit } = useForm<FormData>();

  const placedMarkerItems = placedMarkerStates.map(
    ({ id, isVisible, position }, i) => (
      <>
        <Separator />
        <Button
          variant="ghost"
          className={itemClassName}
          onClick={() => {
            if (activePopup.id && activePopup.id !== id) {
              setActivePopup(null, null);
            }

            updatePlacedMarkerState(i, {
              isVisible: true,
            });

            // Hack to make sure the popup opens after a potential previous popup is closed
            if (activePopup.id !== id) {
              setTimeout(() => {
                setActivePopup(id, "placed");
              }, 0);
            }

            // Hack to reduce flyTo glitches breaking positions of features on the map
            setTimeout(() => {
              map?.flyTo(position);
            }, 0);
          }}
        >
          <div className="flex h-full w-6 items-center justify-center">
            <img
              src={imgLeafletMarker}
              alt="Default Marker Icon"
              className={iconClassName}
            />
          </div>
          <div className="flex h-full w-6 items-center justify-center">
            {isVisible ? (
              <Eye className="w-4" />
            ) : (
              <EyeClosed className="h-4 w-4" />
            )}
          </div>
          <div className={nameClassName}>{`Placed Marker #${i + 1}`}</div>
        </Button>
      </>
    ),
  );

  const onSubmit = ({ lat, lng }: FormData) => {
    addPlacedMarkerState([lat, lng]);
  };

  const onError = (errors: FieldErrors<FormData>) => {
    console.error(errors);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FieldGroup className="mb-10">
          <FieldLegend>Manually add a placed marker</FieldLegend>
          <Controller
            name="lat"
            control={control}
            rules={{ required: "Latitude is required." }}
            render={({ field, fieldState: { error, invalid } }) => (
              <Field>
                <FieldLabel htmlFor="lat">Latitude</FieldLabel>
                <Input
                  {...field}
                  id="lat"
                  aria-invalid={invalid}
                  step="any"
                  type="number"
                />
                {invalid && <FieldError errors={[error]} />}
              </Field>
            )}
          />
          <Controller
            name="lng"
            control={control}
            rules={{ required: "Longitude is required." }}
            render={({ field, fieldState: { error, invalid } }) => (
              <Field>
                <FieldLabel htmlFor="lng">Longitude</FieldLabel>
                <Input
                  {...field}
                  id="lng"
                  aria-invalid={invalid}
                  step="any"
                  type="number"
                />
                {invalid && <FieldError errors={[error]} />}
              </Field>
            )}
          />
          <Button>Add Marker</Button>
        </FieldGroup>
      </form>
      <h1 className="mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base">
        Current placed markers
      </h1>
      {placedMarkerItems.length > 0 ? (
        placedMarkerItems
      ) : (
        <div className="text-sm italic">No placed markers currently exist.</div>
      )}
    </>
  );
}
