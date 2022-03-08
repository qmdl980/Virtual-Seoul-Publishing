import React from "react";

const TitleForm = (props) => {
  return (
      <div className="title-form-flex-container">
        <div className="tag-rect" />
        <div className="list-title">{props.title}</div>
        <div className="list-detail">{props.detail}</div>
      </div>
  );
};

export default TitleForm;
