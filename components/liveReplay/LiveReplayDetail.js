import React from "react";
import ReactMoment from "react-moment";
import "moment-timezone";
import util from "../../utils/util";
import styled from "styled-components";
import { columns } from "./NoticeList";

const NoticeDetail = ({ title, detail, pageRouter }) => {
  //key={"info_" + prop.label}
  // console.log("PcoInfo :: call ::", detail);

  if (util.isEmptyObject(detail)) return null;

  return (
    <>
      <div className="detail_container">
        <h1>{title}</h1>
        <div className="info_container">
          {columns.map((col, index) => {
            if (col.type === "button" || col.type === "hidden") return null;
            const type = col.type || "text";
            return (
              <div className="info_content" key={"info_" + col.label}>
                <div className="infoItem">
                  <div className="infoField">{col.label}</div>
                  <div className="infoValue">
                    {type === "datetime" && (
                      <ReactMoment format="YYYY-MM-DD HH:mm">
                        {detail[col.field]}
                      </ReactMoment>
                    )}
                    {(type === "text" ||
                      type === "checkbox" ||
                      type === "url" ||
                      type === "link" ||
                      type === "select" ||
                      type === "number" ||
                      type === "email") &&
                      detail[col.field]}
                    {type === "referer" && (
                      <a
                        href={
                          pageRouter + col.router + "/" + detail[col.origin]
                        }
                      >
                        {util.getChildValue(detail, col.field)}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default React.memo(NoticeDetail);
