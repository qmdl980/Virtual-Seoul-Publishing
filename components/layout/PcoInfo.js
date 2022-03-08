import React from "react";
import ReactMoment from "react-moment";
import "moment-timezone";
import util from "../../utils/util";
import styled from "styled-components";

const InfoTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100%;
  margin-bottom: 70px;

  .infoTitle {
    font-size: 20px;
  }
`;

const InfoContent = styled.div`
  width: 90%;
  padding: 13px 0px;

  display: inline;
  border-bottom: 1px solid rgb(228, 228, 228);

  .infoItem {
    display: inline;
  }

  .infoField {
    display: inline-block;
    width: 200px;
  }

  .infoValue {
    display: inline-block;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PcoInfo = ({ columns, title, detailData }) => {
  if (util.isEmptyObject(detailData)) return null;

  return (
    <>
      <InfoTitle>{title}</InfoTitle>
      <InfoContainer>
        {!util.isEmpty(detailData.idx) &&
          columns.map((prop, index) => {
            return (
              <InfoContent key={"info_" + prop.label}>
                <div className="infoItem">
                  <div className="infoField">{prop.label}</div>
                  {prop.label === "created_at" ? (
                    <div className="infoValue">
                      <ReactMoment format="YYYY-MM-DD HH:mm">
                        {detailData[prop.label]}
                      </ReactMoment>
                    </div>
                  ) : (
                    <div className="infoValue">{detailData[prop.label]}</div>
                  )}
                </div>
              </InfoContent>
            );
          })}
      </InfoContainer>
    </>
  );
};

export default React.memo(PcoInfo);
