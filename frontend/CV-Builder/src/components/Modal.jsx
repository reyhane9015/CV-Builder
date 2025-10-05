import React from "react";

function Modal({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50"
    >
      <div
        className={`relative flex flex-col bg-gray-100 shadow-lg rounded-lg overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {/* modal header */}
          {!hideHeader && (
            <div className="flex items-center justify-between">
              <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>

              {showActionBtn && (
                <button
                  type="button"
                  className="btn-small-light ml-12"
                  onClick={() => onActionClick()}
                >
                  {actionBtnIcon}
                  {actionBtnText}
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            className="text-gray-400 bg-transparent cursor-pointer hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center top-3.5 right-3.5"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox=" 0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin=" round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* modal body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
