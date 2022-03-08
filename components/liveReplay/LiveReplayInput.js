import React, { useState, useEffect } from "react";
import util from "../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import styled from "styled-components";
import CmsModalContainer from "../common/container/CmsModalContainer";
import { columns } from "./LiveReplayList";
import { gql, useQuery, useMutation } from "@apollo/client";

const LiveReplayInput = ({
  form,
  setForm,
  _save,
  openEditor,
  setOpenEditor,
  eventTitle,
}) => {
  // select box 용.
  const PEOPLE_LIST_QUERY = gql`
    query {
      peoplePaging(limit: 999999, offset: 0) {
        peopleList {
          idx
          code
          email
          photo_url
          name
          title
          department
          country
          biodata
          download_url
        }
      }
    }
  `;
  const [peopleList, setPeopleList] = useState([]);

  const optionHour = [];
  const optionMin = [];

  for (let i = 0; i < 24; i++) {
    optionHour.push((i < 10 && "0" + i) || i);
  }

  for (let i = 0; i < 60; i++) {
    optionMin.push((i < 10 && "0" + i) || i);
  }

  const { loading, error, data, refetch } = useQuery(PEOPLE_LIST_QUERY);

  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    if (data) {
      const peopleData = [...data.peoplePaging.peopleList];

      console.log("peopleData ::", peopleData);
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
                {type === "referer" &&
                  (readonly ? (
                    eventTitle
                  ) : (
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
                  ))}

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
    </>
  );
};

export default React.memo(LiveReplayInput);
