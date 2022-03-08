import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import OpenStageTable from "../../../components/platformContents/OpenStageTable";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  onChange,
  changeImg,
  read,
  refetchData,
  contentSave,
} from "../../../hooks/contentHooks";
import userVar from "../../../stores/user";

export const OPEN_STAGE_SET_QUERY = gql`
  query {
    openStageSet {
      idx
      name
      adballoon_cover
      replay_yn
      replay_cover
      profile_yn
      profile_cover
    }
  }
`;

export const UPDATE_OPEN_STAGE_SET = gql`
  mutation updateOpenStageSet($input: openStageSetInput) {
    updateOpenStageSet(input: $input) {
      idx
      name
      adballoon_cover
      replay_yn
      replay_cover
      profile_yn
      profile_cover
    }
  }
`;

export const openStageInput = {
  idx: { type: "int" },
  name: "",
  adballoon_cover: { type: "file" },
  replay_yn: "",
  replay_cover: { type: "file" },
  profile_yn: "",
  profile_cover: { type: "file" },
};

const OpenStagePage = (props) => {
  const dataName = "openStageSet";

  const [inputs, setInputs] = useState({});
  const { event } = useReactiveVar(userVar);

  const { loading, error, data, refetch } = useQuery(OPEN_STAGE_SET_QUERY, {
    variables: {},
  });

  // 이벤트 정보 업데이트 api
  const [mutationUpDate] = useMutation(UPDATE_OPEN_STAGE_SET, {
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
    const input = await contentSave(inputs, openStageInput, "openStage", code);
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
                src="/images/platform/open_stage.png"
                className="react-image"
              />
            </div>
            <OpenStageTable
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

export default React.memo(OpenStagePage);
