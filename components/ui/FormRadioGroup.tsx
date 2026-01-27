import { InputHTMLAttributes } from "react";

interface RadioOption {
  label: string;
  value: string;
}

interface FormRadioGroupProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  legend: string;
  options: RadioOption[];
  error?: string;
  name: string;
}

export function FormRadioGroup({
  legend,
  options,
  error,
  name,
  ...rest
}: FormRadioGroupProps) {
  return (
    <div>
      <fieldset>
        <legend className="text-sm mb-2">{legend}</legend>
        <div className="flex gap-6">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={option.value}
                name={name}
                className="w-4 h-4 text-theme cursor-pointer"
                {...rest}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-sm text-error mt-2">{error}</p>}
      </fieldset>
    </div>
  );
}
