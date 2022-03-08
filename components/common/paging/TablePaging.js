import React, { useCallback } from "react";

const TablePaging = ({
  offset,
  totalCount,
  setOpenEditor,
  setOffset,
  _refetchData,
  limit,
}) => {
  const lastPage = Math.ceil(totalCount / limit);
  const onClick = useCallback(
    async (e) => {
      const name = e.target.name;

      if (name === "btn_left") {
        if (offset >= 10) {
          setOpenEditor(false);
          await setOffset(offset - 10);
          await _refetchData();
        }
      }

      if (name === "btn_right") {
        if (offset < totalCount - 10) {
          setOpenEditor(false);
          await setOffset(offset + 10);
          await _refetchData();
        }
      }
    },
    [offset, totalCount, limit]
  );
  return (
    <div className="paging_container">
      <button
        className="paging_left_btn"
        name="btn_left"
        onClick={(e) => onClick(e)}
      >
        <img
          name="btn_left"
          onClick={(e) => onClick(e)}
          src="/assets/btn_paging_left.png"
        />
      </button>
      <div className="paging_select_container">
        <select
          className="paging_select_box"
          value={offset < totalCount ? offset : offset - 1}
          onChange={async (e) => {
            setOpenEditor(false);
            await setOffset(parseInt(e.target.value, 10));
            await _refetchData();
          }}
          style={offset >= 90 ? { padding: "5px 3px" } : { padding: "5px 7px" }}
        >
          {[...Array(Math.ceil(totalCount / limit))].map((n, index) => {
            const i = index + 1;
            return (
              <option value={i === 1 ? 0 : (i - 1) * 10} key={"po_" + i}>
                {i}
              </option>
            );
          })}
        </select>
        &nbsp;&nbsp; of &nbsp;&nbsp;&nbsp;&nbsp;
        {lastPage}
      </div>
      <button
        className="paging_right_btn"
        name="btn_right"
        onClick={(e) => onClick(e)}
      >
        <img
          name="btn_right"
          onClick={(e) => onClick(e)}
          src="/assets/btn_paging_right.png"
        />
      </button>
    </div>
  );
};

export default React.memo(TablePaging);
