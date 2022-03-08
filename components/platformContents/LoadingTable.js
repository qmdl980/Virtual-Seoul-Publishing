import React from "react";

const LoadingTable = ({ inputs, _onChange, _contentSave, _changeImg }) => {
  const {
    background_img,
    left_logo_yn,
    left_logo,
    right_logo_yn,
    right_logo,
    message,
  } = inputs;
  return (
    <div>
      <table id="platform-table">
        <thead>
          <tr>
            <th className="virtual-table-th" style={{ width: "5vw" }}>
              선택
            </th>
            <th className="virtual-table-th" style={{ width: "30vw" }}>
              항목
            </th>
            <th className="virtual-table-th">파일</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox"></td>
            <td className="virtual-table-name">로딩배경</td>
            <td className="virtual-table-checkbox">
              {background_img ? (
                <button
                  className="input-file-button"
                  name="background_img"
                  onClick={_changeImg}
                >
                  변경
                </button>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="background_img"
                    htmlFor="background_img"
                  >
                    업로드
                  </label>
                  <input
                    name="background_img"
                    type="file"
                    id="background_img"
                    onChange={_onChange}
                    placeholder={"jpg, png, 1920x1080px, maximum file size 3MB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input
                type="checkbox"
                name="left_logo_yn"
                checked={left_logo_yn === "Y" ? true : false}
                onChange={_onChange}
              />
            </td>
            <td className="virtual-table-name">좌측로고</td>
            <td className="virtual-table-checkbox">
              {left_logo ? (
                <button
                  className="input-file-button"
                  name="left_logo"
                  onClick={_changeImg}
                >
                  변경
                </button>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="left_logo"
                    htmlFor="left_logo"
                  >
                    업로드
                  </label>
                  <input
                    name="left_logo"
                    type="file"
                    id="left_logo"
                    onChange={_onChange}
                    placeholder={"jpg, png, 528x170px, maximum file size 20KB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input
                type="checkbox"
                name="right_logo_yn"
                checked={right_logo_yn === "Y" ? true : false}
                onChange={_onChange}
              />
            </td>
            <td className="virtual-table-name">우측로고</td>
            <td className="virtual-table-checkbox">
              {right_logo ? (
                <button
                  className="input-file-button"
                  name="right_logo"
                  onClick={_changeImg}
                >
                  변경
                </button>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="right_logo"
                    htmlFor="right_logo"
                  >
                    업로드
                  </label>
                  <input
                    name="right_logo"
                    type="file"
                    id="right_logo"
                    onChange={_onChange}
                    placeholder={"jpg, png, 528x170px, maximum file size 20KB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox"></td>
            <td className="virtual-table-name">로딩메세지</td>
            <td className="virtual-table-checkbox">
              <input
                type="text"
                name="message"
                className={"input_text_box"}
                // placeholder= {message || ""}
                value={message || ""}
                onChange={_onChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: "#252525" }}>
        {" "}
        로고를 삭제하고 싶으면 체크를 해제하시면 됩니다.
      </p>
      <button className="virtual-setting-btn" onClick={_contentSave}>
        SAVE
      </button>
    </div>
  );
};

export default LoadingTable;
