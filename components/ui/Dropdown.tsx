"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  size?: "default" | "large";
}

/**
 * 드롭 다운 선택 컴포넌트 (정렬, 필터 등)
 *
 * @props label - 드롭다운 라벨
 * @props options - 선택 옵션 배열
 * @props value - 현재 선택된 값
 * @props onChange - 값 변경 시 호출되는 콜백
 * @props placeholder - 선택 전 표시할 플레이스홀더 텍스트 (기본은 선택된 옵션의 라벨을 우선으로) (없으면 "선택하세요" 텍스트)
 * @props error - 에러 메시지
 * @props disabled - 비활성화 여부
 * @props size - 드롭다운 크기 (디폴트로 w-40 작은 사이즈)
 */
export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder,
      error,
      size = "default",
      disabled = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // 외부 클릭 시 닫기
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
      if (onChange) onChange(optionValue);
      setIsOpen(false);
    };

    return (
      <div className="relative" ref={dropdownRef}>
        {label && <label className="block mb-2">{label}</label>}

        <button
          ref={ref}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={clsx(
            "border border-secondary rounded-sm bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-theme disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "w-40 px-2 py-1 text-s": size === "default",
              "w-full px-3 py-2 text-sm": size === "large",
            },
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selectedOption ? "text-black" : "text-red-700"}>
            {selectedOption
              ? selectedOption.label
              : (placeholder ?? "선택하세요")}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className={clsx(
              "absolute z-10 mt-1 bg-white border border-secondary rounded-sm shadow-lg max-h-60 overflow-auto",
              { "w-40": size === "default", "w-full": size === "large" },
            )}
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option.value)}
                className={`px-3 py-2 cursor-pointer hover:bg-secondary/30 ${
                  option.value === value ? "bg-secondary/50" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}

        {error && <p className="text-sm text-error mt-1">{error}</p>}
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";
