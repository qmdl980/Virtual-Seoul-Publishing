import React, { useState, useEffect } from "react";
import util from "../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import styled from "styled-components";
import CmsModalContainer from "../common/container/CmsModalContainer";
import { columns } from "./SessionList";
import { gql, useQuery, useMutation } from "@apollo/client";

const SesseionInput = ({
  form,
  setForm,
  _save,
  openEditor,
  setOpenEditor,
  eventIdx,
}) => {
  // select box 용.
  const SCHEDULE_LIST_QUERY = gql`
    query schedulePaging($event_idx: Int) {
      schedulePaging(event_idx: $event_idx, limit: 999999, offset: 0) {
        scheduleList {
          idx
          event_idx
          step
          schedule_date
          event {
            idx
            title
          }
        }
      }
    }
  `;
  const [scheduleList, setScheduleList] = useState([]);

  const optionHour = [];
  const optionMin = [];

  for (let i = 0; i < 24; i++) {
    optionHour.push((i < 10 && "0" + i) || i);
  }

  for (let i = 0; i < 60; i++) {
    optionMin.push((i < 10 && "0" + i) || i);
  }

  const { loading, error, data, refetch } = useQuery(SCHEDULE_LIST_QUERY, {
    variables: {
      event_idx: parseInt(eventIdx, 10) || 0,
    },
  });
  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    if (data) {
      setScheduleList(data.schedulePaging.scheduleList);
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
                      {scheduleList &&
                        scheduleList.map((schedule, index) => {
                          return (
                            <option key={index} value={schedule.idx}>
                              {schedule.schedule_date} / {schedule.step}
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
                {type === "time" && (
                  <>
                    <select
                      name={field}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          [e.target.name]:
                            (e.target.value || "00") +
                            ":" +
                            (form[field].split(":")[1] || "00"),
                        });
                      }}
                      value={form[field].split(":")[0]}
                      required={required}
                    >
                      <option value=""></option>
                      {optionHour &&
                        optionHour.map((item) => {
                          return (
                            <option key={"ho_" + item} value={item}>
                              {item + "시"}
                            </option>
                          );
                        })}
                    </select>{" "}
                    <select
                      name={field}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          [e.target.name]:
                            (form[field].split(":")[0] || "00") +
                            ":" +
                            (e.target.value || "00"),
                        });
                      }}
                      value={form[field].split(":")[1]}
                      required={required}
                    >
                      <option value=""></option>
                      {optionMin &&
                        optionMin.map((item) => {
                          return (
                            <option key={"mo_" + item} value={item}>
                              {item + "분"}
                            </option>
                          );
                        })}
                    </select>
                  </>
                )}
              </li>
            );
          })}
      </CmsModalContainer>
    </>
  );
};

export default SesseionInput;
