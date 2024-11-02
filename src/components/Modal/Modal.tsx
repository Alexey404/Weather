import React, { ReactNode, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { gcbc } from "../../utils/getClassByCondition";
import useClickOutside from "../../hooks/useClickOutside";
import RegularButton from "../RegularButton/RegularButton";

import "./Modal.css";

export type ModalSize = "small" | "big";

export interface IModalProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
  modalSize?: ModalSize;
  classContent?: string;
  actionTitle: string;
  onActionClick: () => void;
}

const Modal: React.FC<IModalProps> = ({
  children,
  onClose,
  title,
  modalSize,
  classContent,
  onActionClick,
  actionTitle
}) => {
  const refModal = useRef<HTMLDivElement | null>(null);
  const classNameContent = useMemo(() => {
    return `modal__content ${gcbc("modal__content--scroll-line", modalSize !== "small")} ${classContent ? classContent : ""}`;
  }, [modalSize]);

  useClickOutside(refModal, onClose);

  return createPortal(
    <div className="modal-overlay">
      <div
        ref={refModal}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h3 className={`modal__title `}>{title}</h3>
          <button className="modal__button-close" onClick={onClose} />
        </div>
        {modalSize !== "small" && (
          <div className="modal__content__separator--top" />
        )}

        <div className={classNameContent}>{children}</div>

        {modalSize !== "small" && (
          <div className="modal__content__separator--bottom" />
        )}

        <div className="modal__bottom">
          <RegularButton
            onClick={onClose}
            title="Отмена"
            variant="default"
            outlined
            className="modal__bottom__button"
          />
          <RegularButton
            onClick={onActionClick}
            title={actionTitle}
            variant="primary500"
            outlined={false}
            className="modal__bottom__button"
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
