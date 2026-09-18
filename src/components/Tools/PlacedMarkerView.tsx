import { imgLeafletMarker } from "@/leafletImgs";
import { Eye, EyeClosed } from "lucide-react";
import { Fragment, use } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";

import { MapContext } from "../MapContext";
import { useRemoveIdQueryParam, useSetIdQueryParam } from "../hooks";
import { useStore } from "../hooks/store";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "../ui/field";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

interface FormData {
  lat: number;
  lng: number;
}

/**
 * Parse the coordinate string into latitude and longitude values.
 * @param coords Coordinate string
 * @param invertCoords Interpret coords as inverted when true, i.e. lng,lat instead of lat,lng
 * @returns An object containing the latitude and longitude values, or null if the input is invalid
 */
const parseCoords = (coords?: string, invertCoords?: boolean) => {
  if (coords) {
    const vals = coords
      .trim()
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    if (vals.length !== 2) {
      return null;
    }

    if (invertCoords) {
      return { lat: vals[1], lng: vals[0] };
    }

    return { lat: vals[0], lng: vals[1] };
  }

  return null;
};

export default function PlacedMarkerView() {
  const { map } = use(MapContext);
  const activePopup = useStore((s) => s.activePopup);
  const addPlacedMarkerState = useStore((s) => s.addPlacedMarkerState);
  const coords = useStore((s) => s.coords);
  const invertCoords = useStore((s) => s.invertCoords);
  const lat = useStore((s) => s.lat);
  const lng = useStore((s) => s.lng);
  const placedMarkerStates = useStore((s) => s.placedMarkerStates);
  const setCoords = useStore((s) => s.setCoords);
  const setLat = useStore((s) => s.setLat);
  const setLng = useStore((s) => s.setLng);
  const updatePlacedMarkerState = useStore((s) => s.updatePlacedMarkerState);

  const removeIdQueryParam = useRemoveIdQueryParam();
  const setIdQueryParam = useSetIdQueryParam();
  const { control, handleSubmit, register, setValue } = useForm<FormData>({
    defaultValues: {
      lat,
      lng,
    },
  });

  const placedMarkerItems = placedMarkerStates.map(
    ({ id, isVisible, position }, i) => (
      <Fragment key="id">
        <Separator />
        <Button
          variant="ghost"
          className="h-12 w-full cursor-pointer justify-start gap-2 rounded-none px-4 pr-0 text-sm font-normal"
          onClick={() => {
            if (activePopup && activePopup !== id) {
              removeIdQueryParam();
            }

            updatePlacedMarkerState(i, {
              isVisible: true,
            });

            // Hack to make sure the popup opens after a potential previous popup is closed
            if (activePopup !== id) {
              setIdQueryParam(id);
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
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex h-full w-6 items-center justify-center">
            {isVisible ? (
              <Eye className="w-4" />
            ) : (
              <EyeClosed className="h-4 w-4" />
            )}
          </div>
          <div className="flex grow items-center overflow-x-auto pr-2">{`Placed Marker #${i + 1}`}</div>
        </Button>
      </Fragment>
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
      <form onSubmit={(e) => void handleSubmit(onSubmit, onError)(e)}>
        <FieldGroup className="mb-8">
          <FieldLegend>Manually add a placed marker</FieldLegend>
          <Field>
            <FieldLabel htmlFor="coords">
              Coordinate String (Optional)
            </FieldLabel>
            <FieldDescription>
              Extract the latitude & longitude values from a string formatted as{" "}
              {invertCoords ? <code>lng,lat</code> : <code>lat,lng</code>}.
            </FieldDescription>
            <Input
              id="coords"
              placeholder="37.325804,-122.042752"
              type="string"
              value={coords}
              onChange={(e) => {
                setCoords(e.target.value);

                const coordsResult = parseCoords(e.target.value, invertCoords);

                if (coordsResult) {
                  setValue("lat", coordsResult.lat, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setLat(coordsResult.lat);

                  setValue("lng", coordsResult.lng, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setLng(coordsResult.lng);
                }
              }}
            />
          </Field>
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
                  {...register("lat", {
                    valueAsNumber: true,
                    validate: (value) =>
                      Number.isFinite(value) ||
                      "Latitude must be a valid number",
                  })}
                  onChange={(e) => {
                    field.onChange(e);
                    setLat(parseFloat(e.target.value));
                  }}
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
                  {...register("lng", {
                    valueAsNumber: true,
                    validate: (value) =>
                      Number.isFinite(value) ||
                      "Longitude must be a valid number",
                  })}
                  onChange={(e) => {
                    field.onChange(e);
                    setLng(parseFloat(e.target.value));
                  }}
                />
                {invalid && <FieldError errors={[error]} />}
              </Field>
            )}
          />
          <Button>Add Marker</Button>
        </FieldGroup>
      </form>
      <Separator className="my-6" />
      <h1 className="mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base">
        Currently placed markers
      </h1>
      {placedMarkerItems.length > 0 ? (
        placedMarkerItems
      ) : (
        <div className="text-sm italic">No placed markers currently exist.</div>
      )}
    </>
  );
}
