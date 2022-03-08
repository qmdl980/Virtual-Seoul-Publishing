import React from "react";

const LobbyTable = ({ inputs, _onChange, _contentSave, _changeImg }) => {
  const { name, board_logo, video_cover, video_url } = inputs;
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
            <td className="virtual-table-name">간판로고</td>
            <td className="virtual-table-checkbox">
              {board_logo ? (
                <>
                  <button
                    className="input-file-button"
                    name="board_logo"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="board_logo"
                    htmlFor="board_logo"
                  >
                    업로드
                  </label>
                  <input
                    name="board_logo"
                    type="file"
                    id="board_logo"
                    onChange={_onChange}
                    placeholder={"jpg, png, 512x108px, maximum file size 20KB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">간판 CG영상 주소</td>
            <td className="virtual-table-checkbox">
              <input
                type="url"
                name="video_cover"
                value={video_cover || ""}
                style={{ width: "100%" }}
                onChange={_onChange}
              />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">간판 영상 주소</td>
            <td className="virtual-table-checkbox">
              <input
                type="url"
                name="video_url"
                placeholder={"enter streaming address"}
                value={video_url || ""}
                style={{ width: "100%" }}
                onChange={_onChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: "#252525" }}>
        {" "}
        콘텐츠 미삽입 시 샘플로 등록된 콘텐츠(이미지 또는 영상)으로 출력됩니다.
      </p>
      <button className="virtual-setting-btn" onClick={_contentSave}>
        SAVE
      </button>
    </div>
  );
};

export default LobbyTable;
