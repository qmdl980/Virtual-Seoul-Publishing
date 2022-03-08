import React from "react";

const ExhibitionHallVideoTable = ({ inputs, _onChange, _contentSave }) => {
  const { name, screen_video, booth_video1, booth_video2 } = inputs;
  return (
    <div>
      <table id="platform-table">
        <thead>
          <tr>
            <th className="virtual-table-th" style={{ width: "30vw" }}>
              항목
            </th>
            <th className="virtual-table-th">입력</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">홍보영상</td>
            <td className="virtual-table-checkbox">
              <input
                type="text"
                name="screen_video"
                value={screen_video || ""}
                onChange={_onChange}
                style={{ width: "100%" }}
                placeholder={"enter streaming address"}
              />
            </td>
          </tr>

          <tr className="virtual-table-tr">
            <td className="virtual-table-name">주최측부스 영상1</td>
            <td className="virtual-table-checkbox">
              <input
                type="text"
                name="booth_video1"
                value={booth_video1 || ""}
                onChange={_onChange}
                style={{ width: "100%" }}
                placeholder={"enter streaming address"}
              />
            </td>
          </tr>

          <tr className="virtual-table-tr">
            <td className="virtual-table-name">주최측부스 영상2</td>
            <td className="virtual-table-checkbox">
              <input
                type="text"
                name="booth_video2"
                value={booth_video2 || ""}
                onChange={_onChange}
                style={{ width: "100%" }}
                placeholder={"enter streaming address"}
              />
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

export default ExhibitionHallVideoTable;
