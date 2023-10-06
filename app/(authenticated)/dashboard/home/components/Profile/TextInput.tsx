import { Label, TextInput } from "flowbite-react";
interface TextInputProps {
  label: string;
  type?: string;
  value: string;
}
function FieldWithLabel({ label, type = "text", value }: TextInputProps) {
  return (
    <div>
      <div className="mb-2 block flex flex-start">
        <Label htmlFor={label} value={label} />
      </div>
      <TextInput id={value} value={value} required type={type} disabled />
    </div>
  );
}
export default FieldWithLabel;
