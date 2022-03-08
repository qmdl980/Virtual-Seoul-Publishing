import React, { useState, useEffect } from "react";
import ReactMoment from "react-moment";
import "moment-timezone";
import util from "../../../utils/util";

const DetailView = ({ title, detail, pageRouter, columns }) => {
  const [detailContent, setDetailContent] = useState();

  const typeFilter = (col, type) => {
    switch (type) {
      case "text":
      case "time":
      case "checkbox":
      case "url":
      case "link":
      case "select":
      case "number":
      case "email": {
        return detail[col.field];
      }
      case "referer": {
        return (
          <a href={pageRouter + col.router + "/" + detail[col.origin]}>
            {util.getChildValue(detail, col.field)}
          </a>
        );
      }
      case "textarea": {
        return (
          detail[col.field] &&
          detail[col.field].split("\n").map((line, index) => {
            return <p key={index}>{line}</p>;
          })
        );
      }
      case "datetime": {
        return (
          <ReactMoment format="YYYY-MM-DD HH:mm">
            {detail[col.field]}
          </ReactMoment>
        );
      }
      case "date": {
        return (
          <ReactMoment format="YYYY-MM-DD">{detail[col.field]}</ReactMoment>
        );
      }
    }
  };

  const _setDetailContent = () => {
    let width = null;
    if (title.length > 7) width = "300px";
    setDetailContent(
      <div className="detail_container">
        <h1 style={{ width }}>{title}</h1>
        <div className="info_container">
          {columns.map((col, index) => {
            if (col.type === "button" || col.type === "hidden") return null;

            const type = col.type || "text";
            return (
              <div className="info_content" key={"info_" + col.label}>
                <div className="infoItem">
                  <div className="infoField">{col.label}</div>
                  <div className="infoValue">{typeFilter(col, type)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (util.isEmptyObject(detail)) return setDetailContent(null);
    _setDetailContent();
  }, [detail]);

  return <>{detailContent}</>;
};

export default React.memo(DetailView);
