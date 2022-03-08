import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import ConferenceHallTable from "../../../components/platformContents/ConferenceHallTable";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  onChange,
  changeImg,
  read,
  refetchData,
  contentSave,
} from "../../../hooks/contentHooks";
import userVar from "../../../stores/user";

export const CONFERENCE_SET_QUERY = gql`
  query {
    conferenceSet {
      idx
      name
      left_banner
      right_banner
      replay_yn
      replay_cover
      profile_yn
      profile_cover
    }
  }
`;

export const UPDATE_CONFERENCE_SET = gql`
  mutation updateConferenceSet($input: conferenceSetInput) {
    updateConferenceSet(input: $input) {
      idx
      name
      left_banner
      right_banner
      replay_yn
      replay_cover
      profile_yn
      profile_cover
    }
  }
`;

export const conferenceInput = {
  idx: { type: "int" },
  name: "",
  left_banner: { type: "file" },
  right_banner: { type: "file" },
  replay_yn: "",
  replay_cover: { type: "file" },
  profile_yn: "",
  profile_cover: { type: "file" },
};

const ConferenceHallPage = (props) => {
  const dataName = "conferenceSet";

  const [inputs, setInputs] = useState({});
  const { event } = useReactiveVar(userVar);

  const { loading, error, data, refetch } = useQuery(CONFERENCE_SET_QUERY, {
    variables: {},
  });

  // 이벤트 정보 업데이트 api
  const [mutationUpDate] = useMutation(UPDATE_CONFERENCE_SET, {
    onError: (error) => {
      console.log("mutationUpDate error!", error);
    },
    onCompleted: (data) => {
      _refetchData();
      window.alert("수정이 완료 되었습니다.");
    },
  });

  // input 변경 이벤트
  const _onChange = ({ target }) => onChange(target, inputs, setInputs);
  // 이미지 버튼 변경 클릭
  const _changeImg = ({ target }) => changeImg(target, inputs, setInputs);
  // 데이터 가져오기
  const _read = () => read(inputs, setInputs, data, dataName);
  // 새로 불러오기
  const _refetchData = () => refetchData(refetch, dataName, inputs, setInputs);

  // 저장
  const _contentSave = async () => {
    const code = event?.code;
    const input = await contentSave(
      inputs,
      conferenceInput,
      "conference",
      code
    );
    // console.log("input ::", input);
    // if (input === "err") return;
    const result = await mutationUpDate({ variables: { input: input } });
  };

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  if (loading || !inputs?.idx) return <></>;

  return (
    <>
      <PcoDocHeader />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <div className="image-box">
              <img
                src="/images/platform/conference_Hall.png"
                className="react-image"
              />
            </div>
            <ConferenceHallTable
              inputs={inputs}
              _onChange={_onChange}
              _contentSave={_contentSave}
              _changeImg={_changeImg}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ConferenceHallPage);
