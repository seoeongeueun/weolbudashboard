import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// react hook form이 참고할 수 있도록 forwardRef 사용
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className="w-full p-2 border border-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-theme"
          {...rest}
        />
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
