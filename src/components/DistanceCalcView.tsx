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

interface FormData {
  latA: number;
  lngA: number;
  latB: number;
  lngB: number;
}

/**
 * POI distance calculator content shown in the Wayfarer tools view.
 */
export default function DistanceCalcView() {
  const [distance, setDistance] = useState<number | null>(null);

  const { control, handleSubmit } = useForm<FormData>();

  let output;
  if (distance !== null) {
    output = (
      <>
        <hr className="m-4" />
        <h1 className="font-bold">Calculation</h1>
        <p>{distance} meters</p>
      </>
    );
  }

  const onSubmit = ({ latA, lngA, latB, lngB }: FormData) => {
    const p1 = latLng(latA, lngA);
    const p2 = latLng(latB, lngB);

    setDistance(p1.distanceTo(p2));
  };

  const onError = (errors: FieldErrors<FormData>) => {
    console.error(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
        <Button>Calculate</Button>
      </FieldGroup>
    </form>
  );
  {
    output;
  }
}
