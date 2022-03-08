import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import LoadingTable from "../../../components/platformContents/LoadingTable";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  onChange,
  changeImg,
  read,
  refetchData,
  contentSave,
} from "../../../hooks/contentHooks";
import userVar from "../../../stores/user";

export const LOADING_SET_QUERY = gql`
  query {
    loadingSet {
      idx
      background_img
      left_logo_yn
      left_logo
      right_logo_yn
      right_logo
      message
    }
  }
`;

export const UPDATE_LOADING_SET = gql`
  mutation updateLoadingSet($input: loadingSetInput) {
    updateLoadingSet(input: $input) {
      idx
      event_idx
      background_img
      left_logo_yn
      left_logo
      right_logo_yn
      right_logo
      message
    }
  }
`;

export const inputForm = {
  idx: { type: "int" },
  background_img: { type: "file" },
  left_logo_yn: "",
  left_logo: { type: "file" },
  right_logo_yn: "",
  right_logo: { type: "file" },
  message: "",
};

const LoadingPage = (props) => {
  const dataName = "loadingSet";

  const [inputs, setInputs] = useState({});
  const { event } = useReactiveVar(userVar);

  const { loading, error, data, refetch } = useQuery(LOADING_SET_QUERY, {
    variables: {},
  });

  // 이벤트 정보 업데이트 api
  const [mutationUpDate] = useMutation(UPDATE_LOADING_SET, {
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
    const input = await contentSave(inputs, inputForm, "loading", code);
    // if (input === "err") return;
    const result = await mutationUpDate({ variables: { input } });
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
              <img src="/images/platform/loading.png" className="react-image" />
            </div>
            <LoadingTable
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

export default React.memo(LoadingPage);
