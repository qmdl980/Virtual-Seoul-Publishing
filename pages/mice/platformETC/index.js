import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import ETCTable from "../../../components/platformContents/ETCTable";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  onChange,
  changeImg,
  read,
  refetchData,
  contentSave,
} from "../../../hooks/contentHooks";
import userVar from "../../../stores/user";

export const NAVIGATION_SET_QUERY = gql`
  query {
    navigationSet {
      idx
      event_logo
      guide_yn
      guide_url
      channeltalk_yn
      channeltalk_key
      playground_yn
      stamp_yn
    }
  }
`;

export const UPDATE_NAVIGATION_SET = gql`
  mutation updateNavigationSet($input: navigationSetInput) {
    updateNavigationSet(input: $input) {
      idx
      event_logo
      guide_yn
      guide_url
      channeltalk_yn
      channeltalk_key
      playground_yn
      stamp_yn
    }
  }
`;

export const openStageInput = {
  idx: { type: "int" },
  event_logo: { type: "file" },
  guide_yn: "",
  guide_url: "",
  channeltalk_yn: "",
  channeltalk_key: "",
  playground_yn: "",
  stamp_yn: "",
};

const NavigationPage = (props) => {
  const dataName = "navigationSet";

  const [inputs, setInputs] = useState({});
  const { event } = useReactiveVar(userVar);

  const { loading, error, data, refetch } = useQuery(NAVIGATION_SET_QUERY, {
    variables: {},
  });

  // 이벤트 정보 업데이트 api
  const [mutationUpDate] = useMutation(UPDATE_NAVIGATION_SET, {
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
    const input = await contentSave(inputs, openStageInput, "navigation", code);

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
              <img src="/images/platform/etc.png" className="react-image" />
            </div>
            <ETCTable
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

export default React.memo(NavigationPage);
