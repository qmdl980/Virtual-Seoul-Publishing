import React, { useState, useEffect } from "react";
import util from "../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import styled from "styled-components";
import CmsModalContainer from "../common/container/CmsModalContainer";
import { columns } from "./PeopleList";
import { gql, useQuery, useMutation } from "@apollo/client";

const PeopleInput = ({ form, setForm, _save, openEditor, setOpenEditor }) => {
  // select box 용.
  const EVENT_LIST_QUERY = gql`
    query {
      eventPaging(limit: 999999, offset: 0) {
        eventList {
          idx
          pco_idx
          title
          active_yn
          pco {
            idx
            name
          }
        }
      }
    }
  `;
  const [eventList, setEventList] = useState([]);

  const { loading, error, data, refetch } = useQuery(EVENT_LIST_QUERY, {
    // variables: { pco_idx: parseInt(pcoIdx, 10) },
  });
  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    if (data) {
      setEventList(data.eventPaging.eventList);
    }
  };
  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  return (
    <>
      <CmsModalContainer
        setOpenEditor={setOpenEditor}
        _save={_save}
        form={form}
      >
        {columns &&
          columns.map((col, index) => {
            let refererNum = col.refererNum;
            let type = col.type || "text";
            type = type === "link" ? "text" : type;
            const field = col.field;
            const label = col.label;
            const readonly = col.readonly || false;
            const required = col.required || false;
            const accept = col.accept || "";

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
                  {required && <span style={{ color: "red" }}>*</span>} {label}
                </label>
                {type === "checkbox" && (
                  <>
                    <input
                      type={type}
                      name={field}
                      value="N"
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
                  <>
                    <select
                      required={required}
                      name={col.origin}
                      value={form[col.origin]}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      <option value=""></option>
                      {eventList &&
                        eventList.map((event, index) => {
                          return (
                            <option key={index} value={event.idx}>
                              {event.title} / {event.active_yn}
                            </option>
                          );
                        })}
                    </select>
                  </>
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
                {type === "file" &&
                  (form[field] ? (
                    <div className="input_file_box">
                      <span className="input_file_text">
                        {console.log("form[field] ::", form[field])}
                        {form[field].name
                          ? form[field].name
                          : form[field].split("/")[
                              form[field].split("/").length - 1
                            ]}{" "}
                      </span>
                      <button
                        className="input_file_button"
                        type="button"
                        onClick={(e) => {
                          form[field].name
                            ? setForm({
                                ...form,
                                [field]: "",
                              })
                            : col.callback &&
                              col.callback({ form, field, setForm });
                        }}
                      >
                        delete
                      </button>
                    </div>
                  ) : (
                    <input
                      type={type}
                      name={field}
                      onChange={(e) => {
                        console.log("target value ::", e.target.files[0]);
                        setForm({
                          ...form,
                          [e.target.name]: e.target.files[0],
                        });
                      }}
                      readOnly={readonly}
                      required={required}
                      accept={accept}
                    />
                  ))}
              </li>
            );
          })}
      </CmsModalContainer>
    </>
  );
};

export default PeopleInput;
