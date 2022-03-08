import React from "react";

const TablePagination = (props) => {
  const { totalCount, limit, offset, changeTableIndex } = props;
  const indexCount = Math.ceil(totalCount / limit);

  if (indexCount === 1) {
    return null;
  }

  const rendering = () => {
    const result = [];
    for (let i = 1; i <= indexCount; i++) {
      if (Math.floor(offset / limit) + 1 === i) {
        result.push(
          <a
            href="#"
            className="active"
            key={i}
            onClick={() => changeTableIndex(i)}
          >
            {i}
          </a>
        );
      } else {
        result.push(
          <a href="#" key={i} onClick={() => changeTableIndex(i)}>
            {i}
          </a>
        );
      }
    }

    return result;
  };

  return (
    <div className="pagination">
      <a href="#">&laquo;</a>
      {rendering()}
      <a href="#">&raquo;</a>
    </div>
  );
};

export default TablePagination;
