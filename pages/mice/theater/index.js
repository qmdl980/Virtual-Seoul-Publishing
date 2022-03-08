import React, {useState, useEffect, useMemo} from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import LoadingTable from "../../../components/platformContents/TheaterCategoryTable";
import TheaterCategoryTable from "../../../components/platformContents/TheaterCategoryTable";
import {
    onChange,
    changeImg,
    read,
    refetchData,
    contentSave,
} from "../../../hooks/contentHooks";
import TheaterCheckCategoryTable from "../../../components/platformContents/TheaterCheckCategoryTable";
import TheaterBalloonTable from "../../../components/platformContents/TheaterBalloonTable";

const TheaterPage = (props) => {
    const router = "user";
    const title = "USER";
    const [inputs, setInputs] = useState({});

    // input 변경 이벤트
    const _onChange = ({target}) => onChange(target, inputs, setInputs);
    // 이미지 버튼 변경 클릭
    const _changeImg = ({target}) => changeImg(target, inputs, setInputs);


    //  저장
    const _contentSave = async () => {
        const code = event?.code;
    };

    return (
        <>
            <PcoDocHeader title={title}/>
            <div className="wrap">
                <PcoHeader/>
                <PcoNavbar/>
                <div className="contents">
                    <div className="contents__wrap">
                        <div className="image-box">
                            <img src="/images/platform/theater.png" className="react-image"/>
                        </div>

                        <details>
                            <summary style={{cursor:"pointer", fontSize:"3rem"}}>Contents 편집 사용하기</summary>
                            <TheaterCategoryTable
                                inputs={inputs}
                                _onChange={_onChange}
                                _contentSave={_contentSave}
                                _changeImg={_changeImg}
                            />
                            <TheaterCheckCategoryTable categoryName={"Category 1"}/>
                            <TheaterCheckCategoryTable categoryName={"Category 2"}/>
                            <TheaterCheckCategoryTable categoryName={"Category 3"}/>
                            <TheaterCheckCategoryTable categoryName={"Category 4"}/>
                            <TheaterCheckCategoryTable categoryName={"Category 5"}/>
                        </details>

                        <TheaterBalloonTable
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

export default React.memo(TheaterPage);