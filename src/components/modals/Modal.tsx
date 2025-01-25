import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import { s } from "@/utils/useClientString";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";

type Props = {
  show: boolean;
  onShowChange: (show: boolean) => void;
  label: string;
  children?: React.ReactNode;
};

const DefaultModal = ({ show, onShowChange, label, children }: Props) => {
  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) =>
        `fixed inset-0 z-30 grid place-items-center ${isEntering ? "animate-slide-in" : ""} ${isExiting ? "animate-slide-out" : ""} `
      }
      isOpen={show}
      onOpenChange={onShowChange}
      isDismissable
    >
      <Modal isDismissable className="p-xs grid h-(--visual-viewport-height)">
        <Dialog
          className="grid grid-rows-[1fr_auto] bg-white shadow sm:w-(--breakpoint-sm)"
          aria-label={label}
        >
          {children}
          <Link
            theme="button"
            onClick={() => onShowChange(false)}
            shadow={false}
            active={show}
          >
            <Text tag="div" wrap={false}>
              {s("ctas.close")}
            </Text>
          </Link>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default DefaultModal;
