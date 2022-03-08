import React, {useState, useEffect, useMemo} from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import {
    onChange,
    changeImg,
    read,
    refetchData,
    contentSave,
} from "../../../hooks/contentHooks";
import PRBoothBrochureTable from "../../../components/platformContents/PRBoothBrochureTable";
import {useMutation, useQuery, useReactiveVar} from "@apollo/client";
import userVar from "../../../stores/user";
import util from "../../../utils/util";
import {bannerInput, EXHIBITION_SET_QUERY, kioskInput, UPDATE_EXHIBITION_SET, videoInput} from "../exhibitionHall";
import PRBoothBannerTable from "../../../components/platformContents/PRBoothBannerTable";
import PRBoothKioskTable from "../../../components/platformContents/PRBoothKioskTable";


const PRBoothPage = (props) => {
    const dataName = "PRBoothSet";

    const [inputs, setInputs] = useState({});
    const {event} = useReactiveVar(userVar);

    const [type, setType] = useState("Brochure");


    // 타입 버튼 클릭
    const onClickBtn = ({target}) => {
        const {name} = target;
        setType(name);
        //_refetchData();
    };

    // input 변경 이벤트
    const _onChange = ({target}) => onChange(target, inputs, setInputs);
    // 이미지 버튼 변경 클릭
    const _changeImg = ({target}) => changeImg(target, inputs, setInputs);
    // 데이터 가져오기
    const _read = () => read(inputs, setInputs, data, dataName);
    // 새로 불러오기
    //const _refetchData = () => refetchData(refetch, dataName, inputs, setInputs);

    // 저장
    const _contentSave = async () => {
        /*const code = event?.code;

        let inputForm;

        if (type === "Banner") inputForm = bannerInput;
        if (type === "Video") inputForm = videoInput;
        if (type === "Kiosk") inputForm = kioskInput;

        if (util.isEmpty(inputForm)) {
            console.log("error: type error");
            return;
        }

        const input = await contentSave(inputs, inputForm, "exhibition", code);

        const result = await mutationUpDate({ variables: { input: input } });*/
    };


    return (
        <>
            <PcoDocHeader title={"title"}/>
            <div className="wrap">
                <PcoHeader/>
                <PcoNavbar/>
                <div className="contents">
                    <div className="contents__wrap">
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <button
                                className={"create-btn"}
                                style={{
                                    marginRight: "1vw",
                                    backgroundColor: type === "Brochure" && "#635dff",
                                    color: type === "Brochure" && "white",
                                }}
                                onClick={onClickBtn}
                                name="Brochure"
                                id={"brochureBtn"}
                            >
                                Brochure
                            </button>
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

                        <div id={"brochureSection"}
                             style={{display: type === "Brochure" ? "block" : "none"}}>
                            <div className="image-box">
                                <img src="/images/platform/seoul_booth_brochure.png" className="react-image"/>
                            </div>
                            <PRBoothBrochureTable
                                inputs={inputs}
                                _onChange={_onChange}
                                _contentSave={_contentSave}
                                _changeImg={_changeImg}
                            />
                        </div>

                        <div id={"bannerSection"}
                             style={{display: type === "Banner" ? "block" : "none"}}>
                            <div className="image-box">
                                <img src="/images/platform/seoul_booth_banner.png" className="react-image"/>
                            </div>
                            <PRBoothBannerTable
                                inputs={inputs}
                                _onChange={_onChange}
                                _contentSave={_contentSave}
                                _changeImg={_changeImg}
                            />
                        </div>

                        <div id={"kioskSection"}
                             style={{display: type === "Kiosk" ? "block" : "none"}}>
                            <div className="image-box">
                                <img src="/images/platform/seoul_booth_kiosk.png" className="react-image"/>
                            </div>
                            <PRBoothKioskTable
                                inputs={inputs}
                                _onChange={_onChange}
                                _contentSave={_contentSave}
                                _changeImg={_changeImg}/>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(PRBoothPage);