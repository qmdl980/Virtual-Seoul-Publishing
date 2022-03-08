import React from "react";
import styled from "styled-components";

const Paging = styled.div`
  width: 100%;
  display: inline-block;
  text-align: center;
  margin-top: 15px;

  .paging_left_btn,
  .paging_right_btn,
  .paging_num_container,
  .paging_num_container .paging_num_btn {
    display: inline-block;
  }

  .paging_num_container {
    width: auto;
  }

  .paging_num_container .paging_num_btn {
    width: 27px;
    display: inline-block;
    padding: 10px 7px;
    border-left: 1px solid rgba(196, 196, 196, 0.4);
    color: rgb(61, 121, 184);
  }

  .paging_num_container .paging_num_btn.on,
  .paging_num_container .paging_num_btn:hover {
    color: #fff;
    background-color: rgb(61, 121, 184);
  }

  .paging_left_btn img,
  .paging_right_btn img {
    width: 4px;
  }

  .paging_left_btn,
  .paging_right_btn,
  .paging_num_container {
    height: 35px;
    border: 1px solid rgba(196, 196, 196, 0.4);
  }

  .paging_left_btn {
    width: 27px;
    border-radius: 5px 0px 0px 5px;
    border-right: 0px;
  }

  .paging_right_btn {
    width: 27px;
    border-radius: 0px 5px 5px 0px;
    border-left: 0px;
  }
`;

const ClientPaging = ({ offset, totalCount, setOffset, limit = 10 }) => {
  const lastPage = Math.ceil(totalCount / limit);
  console.log("totalCount ::", totalCount);
  console.log("limit ::", limit);
  const onClick = async (e) => {
    const name = e.target.name;

    if (name === "btn_left" || name === "btn_right") {
      if (name === "btn_left") {
        if (offset >= 10) {
          await setOffset(offset - 10);
        }
      }

      if (name === "btn_right") {
        if (offset < totalCount - 10) {
          await setOffset(offset + 10);
        }
      }
      return;
    }

    if (name === "btn_num") {
      await setOffset(e.target.value);
    }
  };
  return (
    <Paging>
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
      <div className="paging_num_container">
        {[...Array(Math.ceil(totalCount / limit))].map((n, index) => {
          const i = index + 1;
          const value = i === 1 ? 0 : (i - 1) * 10;

          const className = `paging_num_btn ${
            value === parseInt(offset, 10) ? "on" : ""
          }`;

          return (
            <button
              value={value}
              key={"po_" + i}
              className={className}
              name="btn_num"
              onClick={(e) => onClick(e)}
            >
              {i}
            </button>
          );
        })}
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
    </Paging>
  );
};

export default ClientPaging;
