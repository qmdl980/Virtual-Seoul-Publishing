import React from "react";

const PlatformContentsLoading = () => {
  return (
    <div id="virtual-container">
      <table id="virtual-table">
        <thead>
          <tr>
            <th className="virtual-table-th">선택</th>
            <th className="virtual-table-th">항목</th>
            <th className="virtual-table-th">파일</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox"></td>
            <td className="virtual-table-name">로딩배경</td>
            <td className="virtual-table-checkbox">
              <input type="file" />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox"></td>
            <td className="virtual-table-name">좌측로고</td>
            <td className="virtual-table-checkbox">
              <input type="file" />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input type="checkbox" name="venue" value="" />
            </td>
            <td className="virtual-table-name">우측로고</td>
            <td className="virtual-table-checkbox">
              <input type="file" />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input type="checkbox" name="venue" value="" />
            </td>
            <td className="virtual-table-name">로딩메세지</td>
            <td className="virtual-table-checkbox">
              <input type="text" />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="virtual-setting-btn">SAVE</button>
    </div>
  );
};

export default PlatformContentsLoading;
