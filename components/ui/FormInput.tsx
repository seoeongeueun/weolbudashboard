import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

// react hook form이 참고할 수 있도록 forwardRef 사용
// react hook form에서 required를 처리하지만 UI상 * 표시를 위해 required prop 추가
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, required = false, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm">
          {label}
          {required && <span className="text-theme ml-1">*</span>}
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
