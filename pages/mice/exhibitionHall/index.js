import React, { useState, useEffect, useMemo } from "react";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import util from "../../../utils/util";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import ExhibitionHallBannerTable from "../../../components/platformContents/ExhibitionHallBannerTable";
import ExhibitionHallKioskTable from "../../../components/platformContents/ExhibitionHallKioskTable";
import ExhibitionHallVideoTable from "../../../components/platformContents/ExhibitionHallVideoTable";
import {
  onChange,
  changeImg,
  read,
  refetchData,
  contentSave,
} from "../../../hooks/contentHooks";
import userVar from "../../../stores/user";

export const EXHIBITION_SET_QUERY = gql`
  query {
    exhibitionSet {
      idx
      left_spon_banner1
      left_spon_banner2
      left_spon_banner3
      left_spon_banner4
      right_spon_banner1
      right_spon_banner2
      right_spon_banner3
      right_spon_banner4
      screen_video
      booth_video1
      booth_video2
      kiosk_cover1
      kiosk_cover2
      kiosk_cover3
      site_link
      floor_map
      survey_link
      booth_kiosk_cover
      brochure_url
    }
  }
`;

export const UPDATE_EXHIBITION_SET = gql`
  mutation updateExhibitionSet($input: exhibitionSetInput) {
    updateExhibitionSet(input: $input) {
      idx
      left_spon_banner1
      left_spon_banner2
      left_spon_banner3
      left_spon_banner4
      right_spon_banner1
      right_spon_banner2
      right_spon_banner3
      right_spon_banner4
      screen_video
      booth_video1
      booth_video2
      kiosk_cover1
      kiosk_cover2
      kiosk_cover3
      site_link
      floor_map
      survey_link
      booth_kiosk_cover
      brochure_url
    }
  }
`;

export const bannerInput = {
  idx: { type: "int" },
  update_type: { value: "Banner" },
  left_spon_banner1: { type: "file" },
  left_spon_banner2: { type: "file" },
  left_spon_banner3: { type: "file" },
  left_spon_banner4: { type: "file" },
  right_spon_banner1: { type: "file" },
  right_spon_banner2: { type: "file" },
  right_spon_banner3: { type: "file" },
  right_spon_banner4: { type: "file" },
};

export const videoInput = {
  idx: { type: "int" },
  update_type: { value: "Video" },
  screen_video: "",
  booth_video1: "",
  booth_video2: "",
};

export const kioskInput = {
  idx: { type: "int" },
  update_type: { value: "Kiosk" },
  kiosk_cover1: { type: "file" },
  kiosk_cover2: { type: "file" },
  kiosk_cover3: { type: "file" },
  booth_kiosk_cover: { type: "file" },
  site_link: "",
  floor_map: { type: "file" },
  survey_link: "",
  brochure_url: { type: "file" },
};

const ExhibitionHallPage = (props) => {
  const dataName = "exhibitionSet";

  const [inputs, setInputs] = useState({});
  const { event } = useReactiveVar(userVar);

  const [type, setType] = useState("Banner");

  const { loading, error, data, refetch } = useQuery(EXHIBITION_SET_QUERY, {
    variables: {},
  });

  // 업데이트 api
  const [mutationUpDate] = useMutation(UPDATE_EXHIBITION_SET, {
    onError: (error) => {
      console.log("mutationUpDate error!", error);
    },
    onCompleted: (data) => {
      _refetchData();
      window.alert("수정이 완료 되었습니다.");
    },
  });

  // 타입 버튼 클릭
  const onClickBtn = ({ target }) => {
    const { name } = target;
    setType(name);
    _refetchData();
  };

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

    let inputForm;

    if (type === "Banner") inputForm = bannerInput;
    if (type === "Video") inputForm = videoInput;
    if (type === "Kiosk") inputForm = kioskInput;

    if (util.isEmpty(inputForm)) {
      console.log("error: type error");
      return;
    }

    const input = await contentSave(inputs, inputForm, "exhibition", code);

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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className={"create-btn"}
                style={{
                  marginRight: "1vw",
                  backgroundColor: type === "Banner" && "#635dff",
                  color: type === "Banner" && "white",
                }}
                onClick={onClickBtn}
                name="Banner"
                id={"bannerBtn"}
              >
                Banner
              </button>
              <button
                className={"create-btn"}
                style={{
                  marginRight: "1vw",
                  backgroundColor: type === "Video" && "#635dff",
                  color: type === "Video" && "white",
                }}
                onClick={onClickBtn}
                name="Video"
                id={"videoBtn"}
              >
                Video
              </button>
              <button
                className={"create-btn"}
                style={{
                  marginRight: "1vw",
                  backgroundColor: type === "Kiosk" && "#635dff",
                  color: type === "Kiosk" && "white",
                }}
                onClick={onClickBtn}
                name="Kiosk"
                id={"kioskBtn"}
              >
                Kiosk
              </button>
            </div>
            <div
              id={"bannerSection"}
              style={{ display: type === "Banner" ? "block" : "none" }}
            >
              <div className="image-box">
                <img
                  src="/images/platform/coex_banner.png"
                  className="react-image"
                />
              </div>
              <ExhibitionHallBannerTable
                inputs={inputs}
                _onChange={_onChange}
                _contentSave={_contentSave}
                _changeImg={_changeImg}
              />
            </div>
            <div
              id={"videoSection"}
              style={{ display: type === "Video" ? "block" : "none" }}
            >
              <div className="image-box">
                <img
                  src="/images/platform/coex_video.png"
                  className="react-image"
                />
              </div>
              <ExhibitionHallVideoTable
                inputs={inputs}
                _onChange={_onChange}
                _contentSave={_contentSave}
                _changeImg={_changeImg}
              />
            </div>
            <div
              id={"kioskSection"}
              style={{ display: type === "Kiosk" ? "block" : "none" }}
            >
              <div className="image-box">
                <img
                  src="/images/platform/coex_kiosk.png"
                  className="react-image"
                />
              </div>
              <ExhibitionHallKioskTable
                inputs={inputs}
                _onChange={_onChange}
                _contentSave={_contentSave}
                _changeImg={_changeImg}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ExhibitionHallPage);
