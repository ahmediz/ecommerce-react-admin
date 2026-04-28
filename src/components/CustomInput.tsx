import { Field, FieldDescription, FieldLabel } from "./ui/field";
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
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
