import React from "react";

const CmsModalContainer = ({ setOpenEditor, _save, children, form }) => {
  return (
    <>
      <div className="popup modal">
        <div className="modal-box">
          <div className="pop-content">
            <div className="modal_editor">
              <div className="editor-header">
                <button
                  type="button"
                  onClick={(e) => {
                    setOpenEditor(false);
                  }}
                  style={{ width: 50 }}
                >
                  닫기
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  _save(form);
                }}
              >
                <div className="editor-body">
                  <ul>{children}</ul>
                  <button
                    type="submit"
                    className="editor-submit"
                    style={{ marginTop: 15 }}
                  >
                    저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CmsModalContainer;
