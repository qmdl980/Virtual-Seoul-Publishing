import React from "react";
import TableBodyInput from "./TableBodyInput";

const PlatformContentsWorkshopRoom = () => {
  const title1 = ["가로 배너(중앙)"];

  const title2 = ["측면 배너 1", "측면 배너 2", "측면 배너 3", "측면 배너 4"];

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
            <td className="virtual-table-name">Boardroom / 보드룸</td>
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
          {title1.map(function (obj, idx) {
            return (
              <TableBodyInput
                key={idx}
                title={obj}
                type="file"
              ></TableBodyInput>
            );
          })}
        </tbody>
      </table>

      <table id="virtual-table">
        <tbody>
          {title2.map(function (obj, idx) {
            return (
              <TableBodyInput
                key={idx}
                title={obj}
                type="file"
              ></TableBodyInput>
            );
          })}
        </tbody>
      </table>
      <button className="virtual-setting-btn">SAVE</button>
    </div>
  );
};

export default PlatformContentsWorkshopRoom;
