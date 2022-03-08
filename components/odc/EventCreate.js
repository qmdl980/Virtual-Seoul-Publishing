import ToolTip from "./ToolTip";
import TitleForm from "./TitleForm";
import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import dynamic from "next/dynamic";
const PostEditor = dynamic(() => import("../editor/Editor"), { ssr: false });

const EventCreate = ({ inputs, onChange, privacyRef, userRef }) => {
  const {
    title,
    code,
    start_date,
    end_date,
    domain,
    language,
    privacy_consent,
    user_consent,
    type,
    readOnly,
  } = inputs;

  return (
    <div>
      <TitleForm
        title="행사 정보 입력"
        detail="행사 상세정보를 입력하세요."
      ></TitleForm>

      <div
        style={{
          display: "inline-block",
          textAlign: "center",
          margin: "0px 20px",
        }}
      >
        <div style={{ marginTop: "3vh" }}>
          <div
            style={{
              display: "inline-block",
              justifyContent: "center",
              marginRight: "20px",
            }}
          >
            <p className="inputTitle">행사명 *</p>
            <input
              className={"inputBox1"}
              name="title"
              type={"text"}
              value={title || ""}
              onChange={onChange}
            ></input>
          </div>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <p className="inputTitle">행사코드 *</p>
            <input
              style={{ backgroundColor: readOnly && "rgb(220,220,220)" }}
              className={"inputBox1"}
              type={"text"}
              name="code"
              value={code || ""}
              onChange={onChange}
              readOnly={readOnly}
            ></input>
          </div>
          <ToolTip
            text={
              "PSA시스템을 함께 사용하시는 경우, PSA시스템에 입력하셨던 행사 코드와 동일하게 설정해주세요.\n PSA시스템의 데이터를 확인하실 수 있습니다."
            }
          ></ToolTip>
        </div>
        <div style={{ marginTop: "1vh", marginRight: "20px" }}>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <p className="inputTitle">시작일 *</p>
            <input
              className={"inputBox1"}
              type={"date"}
              name="start_date"
              onChange={onChange}
              value={moment(start_date).format("YYYY-MM-DD") || ""}
            ></input>
          </div>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <p className="inputTitle">종료일 *</p>
            <input
              className={"inputBox1"}
              type={"date"}
              name="end_date"
              onChange={onChange}
              value={moment(end_date).format("YYYY-MM-DD") || ""}
            ></input>
          </div>
        </div>
        <div style={{ marginTop: "1vh" }}>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <p className="inputTitle">행사도메인</p>
            <input
              style={{ backgroundColor: readOnly && "rgb(220,220,220)" }}
              className={"inputBox2"}
              type={"text"}
              name="domain"
              onChange={onChange}
              value={domain || ""}
              placeholder="https://domain.virtualseoul.or.kr"
              readOnly={readOnly}
            ></input>
          </div>
          <ToolTip
            text={
              "행사 도메인은 virtualseoul.or.kr의 sub domain으로 생성됩니다.\n" +
              "자체 도메인으로 설정을 하고 싶으시면, 서울관광 재단 담당자에게 연락 주세요.(vsp@sto.or.kr / 02-3788-0896)\n"
            }
          ></ToolTip>
        </div>
        <div style={{ marginTop: "10px", marginRight: "20px" }}>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <p className="inputTitle">기준시간대</p>
            <div className={"inputBox1"}>
              <p className={"customText"}>GMT +09 KOREA</p>
            </div>
          </div>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <p className="inputTitle">언어 선택 *</p>
            <select
              className={"inputBox1"}
              name={"language"}
              id={"select_language"}
              onChange={onChange}
              defaultValue={language || ""}
            >
              <option value="">언어 선택</option>
              <option value="KOR">한국어</option>
              <option value="ENG">영어</option>
              <option value="KOR+ENG">한국어 + 영어</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: "1vh" }}>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <p className="inputTitle">참가자 등록 *</p>
            <select
              className={"inputBox2"}
              name={"type"}
              id={"select-agreement"}
              onChange={onChange}
              defaultValue={type || ""}
            >
              <option value="">참가자 등록</option>
              <option value="unsingin">참가자DB 직접 등록</option>
              <option value="singin">버추얼 서울에서 회원가입 및 로그인</option>
              <option value="unlogin">별도 로그인 없이 버추얼 서울 접속</option>
            </select>
          </div>
          <ToolTip
            text={
              "로그인이 필요한 무료 행사의 경우는 회원가입에 필요한 ‘개인정보 이용동의서’ 및 ‘유저 정보 활용 동의서＇를 입력해 주세요.\n" +
              "유료행사(Ticketed)는 본 플랫폼에서 회원가입을 하지 않으며 별도 수집된 회원 DB를 업로드하여 사용합니다.\n" +
              "유,무료 동시 진행하는 행사는 ‘Ticketed’로 이벤트를 생성하시면 됩니다.\n"
            }
          ></ToolTip>

          <div
            className={"agreement-section"}
            id={"agreement-section"}
            style={{ display: type === "singin" && "inline-block" }}
          >
            <p className="inputTitle">개인정보 이용 동의서</p>
            <PostEditor value={privacy_consent} Ref={privacyRef} />
            {/* <textarea
              className={"agreement-input"}
              placeholder={"- 개인정보 이용 동의서 입력 -"}
              name="privacy_consent"
              value={privacy_consent || ""}
              onChange={onChange}
            /> */}
            <p className="inputTitle">유저 정보 활용 동의서</p>
            <PostEditor value={user_consent} Ref={userRef} />
            {/* <textarea
              className={"agreement-input"}
              placeholder={"- 유저 정보 활용 동의서 -"}
              name="user_consent"
              value={user_consent || ""}
              onChange={onChange}
            /> */}
          </div>
        </div>
      </div>

      <div style={{ height: "3vh" }}></div>
    </div>
  );
};
export default EventCreate;
