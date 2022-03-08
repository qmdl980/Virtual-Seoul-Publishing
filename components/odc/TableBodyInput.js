import React from "react";

const TableBodyInput = (props) => {
  const { title, type } = props;

  return (
    <tr className="virtual-table-tr">
      <td className="virtual-table-name">{title}</td>
      <td className="virtual-table-checkbox">
        <input type={type} />
      </td>
    </tr>
  );
};

export default TableBodyInput;
