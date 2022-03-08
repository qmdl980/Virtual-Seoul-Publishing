import React from "react";

const PlatformContentsLobby = () => {
  return (
    <div id="virtual-container">
      <table id="virtual-table">
        <thead>
          <tr>
            <th className="virtual-table-th">메뉴 이름 변경</th>
            <th className="virtual-table-th">영문</th>
            <th className="virtual-table-th">한글</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">Lobby / 로비</td>
            <td className="virtual-table-checkbox">
              <input type="text" />
            </td>
            <td className="virtual-table-checkbox">
              <input type="text" />
            </td>
          </tr>
        </tbody>
      </table>

      <table id="virtual-table">
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">간판로고</td>
            <td className="virtual-table-checkbox">
              <input type="file" />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">간판 CG 영상 주소</td>
            <td className="virtual-table-checkbox">
              <input type="file" />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">간판 영상 주소</td>
            <td className="virtual-table-checkbox">
              <input type="file" />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="virtual-setting-btn">SAVE</button>
    </div>
  );
};

export default PlatformContentsLobby;
