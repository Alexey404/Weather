import { FC, ReactNode, useMemo, useRef, useState } from "react";
import React from "react";
import { createPortal } from "react-dom";
import { gcbc } from "../../utils/getClassByCondition";
import useClickOutside from "../../utils/useClickOutside";

export type ModalSize = "small" | "big";

export interface IModalProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
  actionTitle: string;
  onActionClick: () => void;
  modalSize?: ModalSize;
  classContent?: string;
}

export const StoryModal: FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        {showModal && (
          <Modal
            // eslint-disable-next-line no-console
            onActionClick={() => console.log("Click")}
            title="Модальное окно"
            actionTitle="Применить"
            onClose={() => setShowModal(false)}
          >
            Content
          </Modal>
        )}
      </div>
      <div id="modal-root"></div>
    </>
  );
};

const Modal: React.FC<IModalProps> = ({
  children,
  onClose,
  title,
  actionTitle,
  onActionClick,
  modalSize,
  classContent
}) => {
  const refModal = useRef<HTMLDivElement | null>(null);
  const classNameContent = useMemo(() => {
    return `in-zhir-modal__content ${gcbc("in-zhir-modal__content--scroll-line", modalSize !== "small")} ${classContent ? classContent : ""}`;
  }, [modalSize]);

  useClickOutside(refModal, onClose);

  return createPortal(
    <div className="in-zhir-modal-overlay">
      <div
        ref={refModal}
        className="in-zhir-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="in-zhir-modal__header">
          <h3 className={`in-zhir-modal__title `}>{title}</h3>
          <button className="in-zhir-modal__button-close" onClick={onClose}>
            Что то
          </button>
        </div>
        {modalSize !== "small" && (
          <div className="in-zhir-modal__content__separator--top" />
        )}

        <div className={classNameContent}>{children}</div>

        {modalSize !== "small" && (
          <div className="in-zhir-modal__content__separator--bottom" />
        )}

        <div className="in-zhir-modal__bottom">
          <button onClick={onClose} className="in-zhir-modal__bottom__button">
            Отмена
          </button>
          <button
            onClick={onActionClick}
            className="in-zhir-modal__bottom__button"
          >
            {actionTitle}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
