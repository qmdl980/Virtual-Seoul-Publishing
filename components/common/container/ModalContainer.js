import React from "react";

const ModalContainer = ({
  hasHeader,
  hasPrevButton,
  title,
  close,
  goToPrev,
  children,
  video,
}) => {
  // todo isHeader 위치 수정

  let modalBoxClass = "modal-box";
  let popContentClass = "pop-content";

  if (title === "SURVEY") {
    popContentClass += " pop_survey";
  }

  if (title === "LIVE STREAMING VIDEO") {
    modalBoxClass += " video-box-chat";
    popContentClass += " video-chat";
  }

  if (video) {
    modalBoxClass += " video-box";
    popContentClass += " video";
  }

  return (
    <>
      <div className="popup modal">
        <div className={modalBoxClass}>
          {hasHeader ? (
            <div className="modal-header">
              {hasPrevButton ? (
                <button
                  className="modal-header__btn modal-header__btn--prev"
                  onClick={goToPrev}
                >
                  prev
                </button>
              ) : null}
              <h2 className="modal-header__title">{title}</h2>
              <button
                className="modal-header__btn modal-header__btn--close"
                onClick={close}
              >
                close
              </button>
            </div>
          ) : null}
          <div className={popContentClass}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalContainer;
