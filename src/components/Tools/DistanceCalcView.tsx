import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { latLng } from "leaflet";
import { useState } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";

import { useStore } from "../hooks/store";
import { Separator } from "../ui/separator";

interface FormData {
  latA?: number;
  lngA?: number;
  latB?: number;
  lngB?: number;
}

/**
 * POI distance calculator content shown in the Wayfarer tools view.
 */
export default function DistanceCalcView() {
  const [distance, setDistance] = useState<number | null>(null);
  const latA = useStore((s) => s.latA);
  const lngA = useStore((s) => s.lngA);
  const latB = useStore((s) => s.latB);
  const lngB = useStore((s) => s.lngB);
  const setLatA = useStore((s) => s.setLatA);
  const setLngA = useStore((s) => s.setLngA);
  const setLatB = useStore((s) => s.setLatB);
  const setLngB = useStore((s) => s.setLngB);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      latA,
      lngA,
      latB,
      lngB,
    },
  });

  let output;
  if (distance !== null) {
    output = (
      <>
        <Separator className="my-4" />
        <h1 className="font-bold">Calculation</h1>
        <p>{distance} meters</p>
      </>
    );
  }

  const onSubmit = ({ latA, lngA, latB, lngB }: FormData) => {
    if (
      latA === undefined ||
      lngA === undefined ||
      latB === undefined ||
      lngB === undefined
    ) {
      throw new Error(
        "All latitude and longitude values must be provided to calculate the distance.",
      );
    }

    const p1 = latLng(latA, lngA);
    const p2 = latLng(latB, lngB);

    setDistance(p1.distanceTo(p2));
  };

  const onError = (errors: FieldErrors<FormData>) => {
    console.error(errors);
  };

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit, onError)(e)}>
      <FieldGroup>
        <FieldLegend>Calculate meters between two coordinates</FieldLegend>
        <Controller
          name="latA"
          control={control}
          rules={{ required: "Latitude A is required." }}
          render={({ field, fieldState: { error, invalid } }) => (
            <Field>
              <FieldLabel htmlFor="lat-a">Latitude A</FieldLabel>
              <Input
                {...field}
                id="lat-a"
                aria-invalid={invalid}
                step="any"
                type="number"
                onChange={(e) => {
                  field.onChange(e);
                  setLatA(parseFloat(e.target.value));
                }}
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
        <Controller
          name="lngA"
          control={control}
          rules={{ required: "Longitude A is required." }}
          render={({ field, fieldState: { error, invalid } }) => (
            <Field>
              <FieldLabel htmlFor="lng-a">Longitude A</FieldLabel>
              <Input
                {...field}
                id="lng-a"
                aria-invalid={invalid}
                step="any"
                type="number"
                onChange={(e) => {
                  field.onChange(e);
                  setLngA(parseFloat(e.target.value));
                }}
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
        <FieldSeparator />
        <Controller
          name="latB"
          control={control}
          rules={{ required: "Latitude B is required." }}
          render={({ field, fieldState: { error, invalid } }) => (
            <Field>
              <FieldLabel htmlFor="lat-b">Latitude B</FieldLabel>
              <Input
                {...field}
                id="lat-b"
                aria-invalid={invalid}
                step="any"
                type="number"
                onChange={(e) => {
                  field.onChange(e);
                  setLatB(parseFloat(e.target.value));
                }}
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
        <Controller
          name="lngB"
          control={control}
          rules={{ required: "Longitude B is required." }}
          render={({ field, fieldState: { error, invalid } }) => (
            <Field>
              <FieldLabel htmlFor="lng-b">Longitude B</FieldLabel>
              <Input
                {...field}
                id="lng-b"
                aria-invalid={invalid}
                step="any"
                type="number"
                onChange={(e) => {
                  field.onChange(e);
                  setLngB(parseFloat(e.target.value));
                }}
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
        <Button>Calculate</Button>
      </FieldGroup>
      {output}
    </form>
  );
}
