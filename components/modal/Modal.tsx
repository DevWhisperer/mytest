import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

const Modal = ({
  open,
  onOpenChange,
  errorModalMsg,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errorModalMsg?: ReactNode;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-2xl shadow-2xl max-w-sm w-full z-[10000]">
          <div className="flex flex-col items-center text-center">
            <Dialog.Title className="text-xl font-bold text-gray-900 mb-2">
              로그인 실패
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-8 break-keep">
              {errorModalMsg}
            </Dialog.Description>

            <Dialog.Close asChild>
              <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold">
                확인
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
