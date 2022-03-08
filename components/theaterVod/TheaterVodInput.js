import React, { useState, useEffect } from "react";
import util from "../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import styled from "styled-components";
import CmsModalContainer from "../common/container/CmsModalContainer";
import { columns } from "./TheaterVodList";
import { gql, useQuery, useMutation } from "@apollo/client";

const TheaterVodInput = ({
  form,
  setForm,
  _save,
  openEditor,
  setOpenEditor,
  theaterTitle,
}) => {
  const coverUrl = () => {
    const cover_url = util.imageUrl(form.vod_url);
    console.log("cover_url ::", cover_url);

    if (!util.isEmpty(cover_url)) {
      setForm({
        ...form,
        ["cover_url"]: cover_url,
      });
    }
  };

  return (
    <>
      <CmsModalContainer
        setOpenEditor={setOpenEditor}
        _save={_save}
        form={form}
      >
        {columns &&
          columns.map((col, index) => {
            let type = col.type || "text";
            type = type === "link" ? "text" : type;
            const field = col.field;
            const label = col.label;
            const readonly = col.readonly || false;
            const required = col.required || false;
            const placeholder = col.placeholder || null;

            // if (type === "button")
            //   return <button type="button">{col.label}</button>;
            if (col.type === "hidden")
              return (
                <li style={{ display: "none" }} key={"hidden_" + field}>
                  <input
                    type="hidden"
                    name={field}
                    value={!form[field] ? "" : form[field]}
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
                {type === "referer" && theaterTitle}

                {(type === "text" ||
                  type === "email" ||
                  type === "link" ||
                  type === "number" ||
                  type === "url") && (
                  <>
                    {col.auto_button ? (
                      <>
                        <input
                          type={type}
                          name={field}
                          value={!form[field] ? "" : form[field]}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          readOnly={readonly}
                          required={required}
                          placeholder={placeholder}
                        />
                        <span className="button_container">
                          <input
                            className="auto_button"
                            type="button"
                            name={"auto_button"}
                            value={col.auto_button_name || ""}
                            onClick={() => coverUrl()}
                            readOnly={readonly}
                            required={required}
                          />
                        </span>
                      </>
                    ) : (
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
                        placeholder={placeholder}
                      />
                    )}
                  </>
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
    </>
  );
};

export default React.memo(TheaterVodInput);
