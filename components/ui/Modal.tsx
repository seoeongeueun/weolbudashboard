import { Button } from "@/components/ui";

/**
 * 모달 컴포넌트
 * @param message 모달에 표시할 메시지
 * @param onClose 모달 닫기 핸들러
 */

interface ModalProps {
  type: "enrollment-success" | "enrollment-failure" | "login-required";
  description?: string;
  onClose: () => void;
}

const ModalMessage: Record<
  ModalProps["type"],
  { title: string; context?: string }
> = {
  "enrollment-success": {
    title: "수강 신청 결과",
  },
  "enrollment-failure": {
    title: "수강 신청 실패",
    context: "문제가 발생했습니다.\n다시 시도해주세요.",
  },
  "login-required": {
    title: "로그인 요청",
    context: "로그인 후 이용 가능한 서비스입니다.",
  },
};

export function Modal({ type, description, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-black/50 flex items-center justify-center">
      <dialog
        open
        aria-labelledby="modal-title"
        onCancel={(event) => {
          event.preventDefault();
          onClose();
        }}
        className="relative shadow-sm text-center p-4 w-60 min-h-50 bg-white rounded-sm flex flex-col gap-4 items-center justify-center"
      >
        <h1 id="modal-title" className="text-theme text-xl font-bold">
          {ModalMessage[type].title}
        </h1>
        <span className="text-sm whitespace-pre-line">
          {ModalMessage[type]?.context}
        </span>
        {description && (
          <p className="text-sm whitespace-pre-line">{description}</p>
        )}
        <Button
          type="button"
          variant="primary"
          size="small"
          label="확인"
          onClick={onClose}
        />
      </dialog>
    </div>
  );
}
