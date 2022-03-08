import React, { useState, useEffect, useCallback } from "react";
import "moment-timezone";
import ReactMoment from "react-moment";
import util from "../../../utils/util";
import TablePaging from "../../common/paging/TablePaging";

const TableList = ({
  rows,
  columns,
  pageRouter,
  router,
  colSpan,
  setForm,
  setOpenEditor,
  title,
  _refetchData,
  offset,
  totalCount,
  setOffset,
  limit,
  prentIdx,
}) => {
  const [tableBtn, setTableBtn] = useState();
  const [tableList, setTableList] = useState();
  const [tablePaging, setTablePaging] = useState();

  const typeFilter = (row, col, type) => {
    switch (type) {
      case "file":
      case "text":
      case "checkbox":
      case "url":
      case "number":
      case "email": {
        return row[col.field];
      }
      case "referer": {
        return col.readonly ? (
          util.getChildValue(row, col.field)
        ) : (
          <a href={pageRouter + col.router + "/" + row[col.origin]}>
            {util.getChildValue(row, col.field)}
          </a>
        );
      }
      case "datetime": {
        return (
          <ReactMoment format="YYYY-MM-DD HH:mm">{row[col.field]}</ReactMoment>
        );
      }
      case "date": {
        return <ReactMoment format="YYYY-MM-DD">{row[col.field]}</ReactMoment>;
      }
      case "time": {
        return row[col.field];
      }
      case "textarea": {
        return (
          row[col.field] &&
          row[col.field].split("\n").map((line, index) => {
            return <p key={index}>{line}</p>;
          })
        );
      }
      case "select": {
        return col.selectList.find((item) => {
          return item.code === row[col.field];
        }).label;
      }
      case "button": {
        return (
          <button
            className="tool__item"
            type="button"
            onClick={(e) => {
              col.callback && col.callback(row);
            }}
          >
            {col.label}
          </button>
        );
      }
      case "link": {
        return (
          <a href={pageRouter + router + row[col.linkField]}>
            {row[col.field]}
          </a>
        );
      }
    }
  };

  const _setTableBtn = () => {
    setTableBtn(
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div
          style={{
            textAlign: "right",
            lineHeight: 3,
          }}
        >
          <button
            type="button"
            className="tool__item refresh"
            onClick={(e) => {
              console.log("refresh");
              _refetchData();
            }}
          >
            새로고침
          </button>
          <button
            type="button"
            className="tool__item add"
            onClick={(e) => {
              const row = {};
              columns.map((col, index) => {
                if (
                  col.field &&
                  col.type !== "referer" &&
                  col.type !== "button" &&
                  col.type !== "hidden"
                ) {
                  row[col.field] = col.defaultValue ? col.defaultValue : "";
                }
                if (col.label === "prent_idx" && !util.isEmpty(parseInt)) {
                  col.value.map(
                    (idx, index) =>
                      (row[idx] = parseInt(prentIdx[index], 10) || 0)
                  );
                }
              });
              setForm(row);
              setOpenEditor(true);
            }}
          >
            추가
          </button>
        </div>
      </div>
    );
  };

  const _setTableList = () => {
    setTableList(() => {
      if (rows === null || rows.length === 0) {
        return (
          <div>
            <div colSpan={colSpan}>No Data.</div>
          </div>
        );
      }
      return (
        <>
          <table className="table tableContent">
            <thead>
              <tr>
                {columns &&
                  columns.map((col, index) => {
                    const field = col.field || "";
                    let type = col.type || "text";
                    if (col.editonly) type = "hidden";

                    const display = type === "hidden" ? "none" : "";
                    const whiteSpace =
                      type === "textarea" ? "nowrap" : "pre-line";
                    const width = col.width || null;

                    return (
                      <th
                        style={{
                          whiteSpace,
                          display,
                          width,
                        }}
                        key={"th_" + index + type}
                      >
                        {col.label}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                return (
                  <tr
                    key={"tr_" + index}
                    // onDoubleClick={(e) => {
                    //   setForm(row);
                    //   setOpenEditor(true);
                    // }}
                  >
                    {columns &&
                      columns.map((col, index) => {
                        let type = col.type || "text";
                        if (col.editonly) type = "hidden";
                        const display = type === "hidden" ? "none" : "";
                        const whiteSpace =
                          type === "textarea" ? "nowrap" : "pre-line";
                        const textAlign = col.align
                          ? col.align
                          : col.field === "title" || col.field === "contents"
                          ? "left"
                          : "";
                        const width = col.width || null;

                        return (
                          <td
                            style={{ whiteSpace, display, textAlign, width }}
                            className="cms-td"
                            key={"tb_" + col.field + "_" + index}
                          >
                            {typeFilter(row, col, type)}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      );
    });
  };

  const _setTablePaging = () => {
    if (totalCount > 1 && !util.isEmpty(offset)) {
      setTablePaging(
        <TablePaging
          offset={offset}
          totalCount={totalCount}
          setOpenEditor={setOpenEditor}
          setOffset={setOffset}
          _refetchData={_refetchData}
          limit={limit}
        />
      );
    }
  };

  useEffect(() => {
    _setTableBtn();
    _setTableList();
    _setTablePaging();
  }, [rows]);

  return (
    <>
      {tableBtn}
      {tableList}
      {tablePaging}
    </>
  );
};

export default React.memo(TableList);
