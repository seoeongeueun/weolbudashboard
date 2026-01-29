import { Button } from "@/components/ui";

/**
 * 모달 컴포넌트
 * @param message 모달에 표시할 메시지
 * @param onClose 모달 닫기 핸들러
 */

interface ModalProps {
  message: string;
  onClose: () => void;
}

export function Modal({ message, onClose }: ModalProps) {
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
        <h1 id="modal-title" className="text-theme text-lg font-bold">
          {message}
        </h1>
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
