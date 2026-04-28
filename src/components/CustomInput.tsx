import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

type CustomInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  label: string;
  description?: string;
  name: string;
  type?: string;
  placeholder?: string;
};

export function CustomInput({
  field,
  label,
  description,
  name,
  type = "text",
  placeholder = `${name}...`,
}: CustomInputProps) {
  const isInvalid = field.state.meta.errors?.length > 0;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
      {isInvalid && (
        <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
