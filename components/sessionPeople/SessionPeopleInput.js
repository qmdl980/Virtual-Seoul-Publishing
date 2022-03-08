import React, { useState, useEffect } from "react";
import util from "../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import styled from "styled-components";
import CmsModalContainer from "../common/container/CmsModalContainer";
import { columns } from "./SessionPeopleList";
import { gql, useQuery, useMutation } from "@apollo/client";

const SesseionInput = ({ form, setForm, _save, openEditor, setOpenEditor }) => {
  // select box 용.
  const SESSION_PEOPLE_LIST_QUERY = gql`
    query sessionPaging($event_idx: Int) {
      sessionPaging(event_idx: $event_idx, limit: 999999, offset: 0) {
        sessionList {
          idx
          schedule_idx
          title
          schedule {
            idx
            step
          }
        }
      }
      peoplePaging(limit: 999999, offset: 0) {
        peopleList {
          idx
          code
          email
          name
        }
      }
    }
  `;
  const [sessionList, setSessionList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);

  const { loading, error, data, refetch } = useQuery(
    SESSION_PEOPLE_LIST_QUERY,
    {}
  );
  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    if (data) {
      setSessionList(data.sessionPaging.sessionList);
      const peopleData = [...data.peoplePaging.peopleList];

      // 이름 오름차순 정렬
      peopleData.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() === b.name.toLowerCase()) return 0;
      });

      setPeopleList(peopleData);
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
                {type === "referer" && refererNum === "1" && (
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
                      {sessionList &&
                        sessionList.map((session, index) => {
                          return (
                            <option key={index} value={session.idx}>
                              {session.title}
                            </option>
                          );
                        })}
                    </select>
                  </>
                )}

                {type === "referer" && refererNum === "2" && (
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
                      {peopleList &&
                        peopleList.map((people, index) => {
                          return (
                            <option key={index} value={people.idx}>
                              {people.name} / {people.email}
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
              </li>
            );
          })}
      </CmsModalContainer>
    </>
  );
};

export default SesseionInput;
