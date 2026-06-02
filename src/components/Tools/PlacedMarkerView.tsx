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

export default function PlacedMarkerView() {
  const { map } = use(MapContext);
  const activePopup = useStore((s) => s.activePopup);
  const addPlacedMarkerState = useStore((s) => s.addPlacedMarkerState);
  const placedMarkerStates = useStore((s) => s.placedMarkerStates);
  const updatePlacedMarkerState = useStore((s) => s.updatePlacedMarkerState);

  const removeIdQueryParam = useRemoveIdQueryParam();
  const setIdQueryParam = useSetIdQueryParam();
  const { control, handleSubmit } = useForm<FormData>();

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
