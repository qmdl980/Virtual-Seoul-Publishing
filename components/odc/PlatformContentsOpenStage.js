import React from "react";

const PlatformContentsOpenStage = () => {
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
            <td className="virtual-table-name">Open Stage / 오픈 스테이지</td>
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
            <td className="virtual-table-name">벌룬 배너</td>
            <td className="virtual-table-checkbox">
              <input type="file" />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input type="checkbox" name="venue" value="" />
            </td>
            <td className="virtual-table-name">(좌)다시보기)</td>
            <td className="virtual-table-checkbox">
              <input type="file" />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input type="checkbox" name="venue" value="" />
            </td>
            <td className="virtual-table-name">(우)다시보기</td>
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

export default PlatformContentsOpenStage;
