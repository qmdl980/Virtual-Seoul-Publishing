import React, { useState, useEffect } from "react";
import util from "../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import styled from "styled-components";
import CmsModalContainer from "../common/container/CmsModalContainer";
import { columns } from "./NoticeList";
import { gql, useQuery, useMutation } from "@apollo/client";

const NoticeInput = ({
  form,
  setForm,
  _save,
  openEditor,
  setOpenEditor,
  eventTitle,
}) => {
  return (
    <CmsModalContainer setOpenEditor={setOpenEditor} _save={_save} form={form}>
      {columns &&
        columns.map((col, index) => {
          let type = col.type || "text";
          type = type === "link" ? "text" : type;
          const field = col.field;
          const label = col.label;
          const readonly = col.readonly || false;
          const required = col.required || false;

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
                {required && <span style={{ color: "red" }}>*</span>} {label}
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
              {type === "referer" && eventTitle}

              {(type === "text" ||
                type === "email" ||
                type === "link" ||
                type === "number" ||
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
                  {console.log("selectList :: ", col.selectList)}
                  {col.selectList.map((item, index) => {
                    // console.log("form[field] ::", form[field]);
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
                  value={moment(form[field]).format("YYYY-MM-DD HH:mm")}
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
            </li>
          );
        })}
    </CmsModalContainer>
  );
};

export default React.memo(NoticeInput);
