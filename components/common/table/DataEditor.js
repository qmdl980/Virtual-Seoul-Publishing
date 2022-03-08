import React, { useState, useEffect } from "react";
import util from "../../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import styled from "styled-components";
import ModalContainer from "../container/ModalContainer";

const Editor = styled.div`
  position: absolute;
  // top: 0;
  // bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  margin: auto;
  box-shadow: 5px 5px 5px 5px gray;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  display: grid;
  width: 80%;
  // height: 80%;
  grid-template-rows: 50px 1fr;

  label {
    display: block;
    color: gray;
    margin-bottom: 5px;
  }

  .editor-header {
    width: 100%;
    box-shadow: 3px 3px 3px 3px gray;
    display: flex;
    flex-direction: row-reverse;
  }

  .editor-body {
    padding: 20px;
    margin: 10px 0;
  }

  .editor-body li {
    min-height: 60px;
  }

  .editor-submit {
    background-color: #3348be;
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  input[type="text"],
  input[type="email"],
  input[type="url"],
  select {
    width: 100%;
    border-bottom: 1px solid rgb(228, 228, 228);
  }

  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    outline: 1px solid rgb(228, 228, 228);
  }

  select {
    width: 200px;
    padding: 0.4em 0.3em;
    font-family: inherit;
    background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg)
      no-repeat 95% 50%;
    border: 1px solid #999;
    border-radius: 0px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const DataEditor = ({ columns, form, setForm, _save, setOpenEditor }) => {
  return (
    <>
      <ModalContainer>
        <Editor>
          <div className="editor-header">
            <button
              type="button"
              onClick={(e) => {
                setOpenEditor(false);
              }}
              style={{ width: 50 }}
            >
              닫기
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              _save(form);
              setOpenEditor(false);
            }}
          >
            <div className="editor-body">
              {/* editor body */}
              <ul>
                {columns &&
                  columns.map((col, index) => {
                    let type = col.type || "text";
                    type = type === "link" ? "text" : type;
                    const field = col.field;
                    const label = col.label;
                    const readonly = col.readonly || false;
                    const required = col.required || false;

                    // if (type === "button")
                    //   return <button type="button">{col.label}</button>;
                    if (col.type === "hidden")
                      return (
                        <li style={{ display: "none" }} key={"hidden_" + field}>
                          <input
                            type="hidden"
                            name={field}
                            value={form[field] === null ? "" : form[field]}
                          />
                        </li>
                      );
                    if (col.type === "button") return null;
                    return (
                      <li key={"form_" + field}>
                        <label>
                          {required && <span style={{ color: "red" }}>*</span>}{" "}
                          {label}
                        </label>
                        {type === "checkbox" && (
                          <>
                            <input
                              type={type}
                              name={field}
                              value="Y"
                              checked={form[field] === "Y" ? true : false}
                              onChange={(e) => {
                                const value = e.target.checked ? "Y" : "N";
                                setForm({
                                  ...form,
                                  [e.target.name]: value,
                                });
                              }}
                              readOnly={readonly}
                              required={required}
                            />
                          </>
                        )}

                        {type === "referer" && (
                          <input
                            type={type}
                            name={field}
                            value={util.getChildValue(form, field)}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            readOnly={readonly}
                            required={required}
                          />
                        )}

                        {(type === "text" ||
                          type === "email" ||
                          type === "link" ||
                          type === "url") && (
                          <input
                            type={type}
                            name={field}
                            value={form[field] === null ? "" : form[field]}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            readOnly={readonly}
                            required={required}
                          />
                        )}

                        {type === "select" && (
                          <select
                            name={field}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            value={form[field]}
                            required={required}
                          >
                            <option value=""></option>
                            {col.selectList.map((item, index) => {
                              return (
                                <option key={"o_" + index} value={item.code}>
                                  {item.label}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        {type === "date" && (
                          <input
                            type={type}
                            name={field}
                            value={moment(form[field]).format("YYYY-MM-DD")}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            readOnly={readonly}
                            required={required}
                          />
                        )}
                        {type === "textarea" && (
                          <textarea
                            style={{ width: "100%", height: "200px" }}
                            name={field}
                            value={form[field] === null ? "" : form[field]}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />
                        )}
                        {type === "datetime" && (
                          <input
                            type={type}
                            name={field}
                            value={moment(form[field]).format(
                              "YYYY-MM-DD HH:mm"
                            )}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            readOnly={readonly}
                            required={required}
                          />
                        )}
                        {/* {type === "button" && (
                          <button
                            type="button"
                            onClick={(e) => {
                              if (col.callback) {
                                col.callback(form[field]);
                              }
                            }}
                          >
                            {col.label}
                          </button>
                        )} */}
                      </li>
                    );
                  })}
              </ul>
              <button
                type="submit"
                className="editor-submit"
                style={{ marginTop: 15 }}
              >
                저장
              </button>
            </div>
          </form>
        </Editor>
      </ModalContainer>
    </>
  );
};

export default DataEditor;
