import React from "react";

const BoardRoomTable = ({ inputs, _onChange, _contentSave, _changeImg }) => {
  const {
    name,
    center_banner,
    side_banner1,
    side_banner2,
    side_banner3,
    side_banner4,
  } = inputs;
  return (
    <div>
      <table id="platform-table">
        <thead>
          <tr>
            <th className="virtual-table-th" style={{ width: "30vw" }}>
              항목
            </th>
            <th className="virtual-table-th">파일</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">가로 배너 (중앙)</td>
            <td className="virtual-table-checkbox">
              {center_banner ? (
                <>
                  <button
                    className="input-file-button"
                    name="center_banner"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="center_banner"
                    htmlFor="center_banner"
                  >
                    업로드
                  </label>
                  <input
                    name="center_banner"
                    type="file"
                    id="center_banner"
                    onChange={_onChange}
                    placeholder={
                      "jpg, png, 300x1050px, maximum file size 300KB"
                    }
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">측면 배너 1</td>
            <td className="virtual-table-checkbox">
              {side_banner1 ? (
                <>
                  <button
                    className="input-file-button"
                    name="side_banner1"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="side_banner1"
                    htmlFor="side_banner1"
                  >
                    업로드
                  </label>
                  <input
                    name="side_banner1"
                    type="file"
                    id="side_banner1"
                    onChange={_onChange}
                    placeholder={"jpg, png, 794x1024px, maximum file size 1MB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">측면 배너 2</td>
            <td className="virtual-table-checkbox">
              {side_banner2 ? (
                <>
                  <button
                    className="input-file-button"
                    name="side_banner2"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="side_banner2"
                    htmlFor="side_banner2"
                  >
                    업로드
                  </label>
                  <input
                    name="side_banner2"
                    type="file"
                    id="side_banner2"
                    onChange={_onChange}
                    placeholder={"jpg, png, 794x1024px, maximum file size 1MB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">측면 배너 3</td>
            <td className="virtual-table-checkbox">
              {side_banner3 ? (
                <>
                  <button
                    className="input-file-button"
                    name="side_banner3"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="side_banner3"
                    htmlFor="side_banner3"
                  >
                    업로드
                  </label>
                  <input
                    name="side_banner3"
                    type="file"
                    id="side_banner3"
                    onChange={_onChange}
                    placeholder={"jpg, png, 794x1024px, maximum file size 1MB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">측면 배너 4</td>
            <td className="virtual-table-checkbox">
              {side_banner4 ? (
                <>
                  <button
                    className="input-file-button"
                    name="side_banner4"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="side_banner4"
                    htmlFor="side_banner4"
                  >
                    업로드
                  </label>

                  <input
                    name="side_banner4"
                    type="file"
                    id="side_banner4"
                    onChange={_onChange}
                    placeholder={"jpg, png, 794x1024px, maximum file size 1MB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: "#252525" }}>
        {" "}
        콘텐츠 미삽입 시 샘플로 등록된 콘텐츠(이미지 또는 영상)으로 출렵됩니다.
      </p>
      <button className="virtual-setting-btn" onClick={_contentSave}>
        SAVE
      </button>
    </div>
  );
};

export default BoardRoomTable;
