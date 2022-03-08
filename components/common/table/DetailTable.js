import React from "react";
import util from "../../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import styled from "styled-components";

const DtailTable = ({
  form,
  setForm,
  _save,
  openDetail,
  setOpenDetail,
  title,
  columns,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <div>
          <div>
            <button
              style={{ fontSize: "50px", position: "absolute" }}
              onClick={() => setOpenDetail(false)}
            >
              {"<"}
            </button>
          </div>
          <div style={{ textAlign: "center", width: "100%" }}>
            <h2>{title}</h2>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: " 1fr 1fr" }}>
        {columns?.map((col, index) => {
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
              <div style={{ display: "none" }} key={"hidden_" + field}>
                <input
                  type="hidden"
                  name={field}
                  value={form[field] === null ? "" : form[field]}
                />
              </div>
            );
          if (col.type === "button") return null;
          return (
            <div
              key={"form_" + field}
              style={{
                fontSize: "20px",
                padding: "30px",
                borderBottom: "1px solid black",
                margin: "5px 0px",
              }}
              align="center"
            >
              <div style={{ display: "inline-block" }}>
                {required && <span style={{ color: "red" }}>*</span>} {label}
              </div>
              <div style={{ display: "inline-block", marginLeft: "50px" }}>
                {type === "checkbox" && (
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
                )}
                {type === "referer" && (
                  <input
                    type={type}
                    name={field}
                    value={util.getChildValue(form, field) || ""}
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
                    style={{ width: "100%", border: "none" }}
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
              </div>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          _save(form);
          setOpenDetail(false);
        }}
        style={{ margin: "0 auto" }}
      >
        <button
          type="submit"
          className="editor-submit"
          style={{
            border: "1px solid black",
            width: "100px",
            marginTop: "30px",
            padding: "5px",
          }}
        >
          저장
        </button>
      </form>
    </div>
  );
};

export default DtailTable;
