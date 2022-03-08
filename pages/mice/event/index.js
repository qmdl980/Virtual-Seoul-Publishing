import React, { useState, useEffect, useRef } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
// import EventList from "../../../components/event/EventList"; 삭제
import EventCreate from "../../../components/odc/EventCreate";
import VirtualVenue from "../../../components/odc/VirtualVenue";
// import MiceContainer from "../../../components/layout/MiceContainer"; 삭제
import { gql, useQuery, useMutation } from "@apollo/client";
import userVar from "../../../stores/user";
import { eventInfoSave } from "../../../hooks/eventInfoSave";
import { eventActiveSave } from "../../../hooks/eventActiveSave";
import { eventInfoRead } from "../../../hooks/eventInfoRead";

export const EVENT_QUERY = gql`
  query {
    event {
      idx
      title
      code
      start_date
      end_date
      domain
      language
      type
      privacy_consent
      user_consent
      time_zone
      created_at
    }
    eventActive {
      idx
      conference_active
      workshop_active
      exhibition_active
      open_stage_active
      theater_active
      seoul_booth_active
      lounge_active
      business_room_active
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($input: eventInput) {
    updateEvent(input: $input) {
      idx
      title
      code
      start_date
      end_date
      domain
      language
      type
      privacy_consent
      user_consent
      time_zone
      created_at
    }
  }
`;

export const UPDATE_EVENT_ACTIVE = gql`
  mutation updateEventActive($input: eventActiveInput) {
    updateEventActive(input: $input) {
      idx
      conference_active
      workshop_active
      exhibition_active
      open_stage_active
      theater_active
      seoul_booth_active
      lounge_active
      business_room_active
    }
  }
`;

const EventListPage = (props) => {
  const [inputs, setInputs] = useState({
    readOnly: true,
  });
  const [checkBox, setCheckBox] = useState({});
  const privacyRef = useRef();
  const userRef = useRef();

  const { loading, error, data, refetch } = useQuery(EVENT_QUERY, {
    variables: {},
  });

  // 이벤트 정보 업데이트 api
  const [mutationInfoUpDate] = useMutation(UPDATE_EVENT, {
    onError: (error) => {
      console.log("mutationInfoUpDate error!", error);
    },
    onCompleted: (data) => {
      window.alert("수정이 완료 되었습니다.");
    },
  });

  // 이벤트 장소 활성화 업데이트 api
  const [mutationActiveUpDate] = useMutation(UPDATE_EVENT_ACTIVE, {
    onError: (error) => {
      console.log("mutationActiveUpDate error!", error);
    },
    onCompleted: (data) => {
      window.alert("수정이 완료 되었습니다.");
    },
  });

  const onChange = ({ target }) => {
    let { value, name } = target;

    if (name === "code")
      value = value.replace(/[^A-Z0-9-_]/gi, "").toUpperCase();

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onChecked = ({ target }) => {
    const { checked, name } = target;

    setCheckBox({
      ...checkBox,
      [name]: checked ? "Y" : "N",
    });
  };

  // 데이터 가져오기
  const _read = async (prop) => {
    if (data?.event) {
      const event = data.event;
      const eventData = eventInfoRead(event);

      setInputs({ ...inputs, ...eventData });
    }
    if (data?.eventActive) setCheckBox({ ...checkBox, ...data.eventActive });
  };

  // 이벤트 정보 저장
  const _infoSave = async () => {
    const input = eventInfoSave(inputs);
    if (input === "err") return;
    input.privacy_consent = privacyRef.current.getInstance().getHTML();
    input.user_consent = userRef.current.getInstance().getHTML();
    mutationInfoUpDate({ variables: { input } });
  };

  // 가상베뉴 메뉴 사용여부 저장
  const _activeSave = () => {
    const input = eventActiveSave(checkBox);
    mutationActiveUpDate({ variables: { input } });
  };

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  useEffect(() => {
    if (privacyRef?.current?.rootEl?.current?.style?.width) {
      privacyRef.current.rootEl.current.style.width = "700px";
    }
    // privacyRef.current.rootEl.current.style.width = "700px";
    // console.log("privacyRef ::", privacyRef.current.getInstance().getHTML());
    // console.log("userRef ::", userRef.current.getInstance().getHTML());
  }, [privacyRef]);

  if (loading || !inputs?.idx) return <></>;

  return (
    <>
      <PcoDocHeader title={"EVENT"} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <EventCreate
              inputs={inputs}
              onChange={onChange}
              privacyRef={privacyRef}
              userRef={userRef}
            ></EventCreate>
            <button
              className={"create-btn"}
              name="eventInfo"
              onClick={_infoSave}
              style={{ marginLeft: "43%" }}
            >
              저장하기
            </button>
            <VirtualVenue
              checkBox={checkBox}
              onChecked={onChecked}
            ></VirtualVenue>
            <button
              className={"create-btn"}
              name="eventActive"
              onClick={_activeSave}
              style={{ marginLeft: "43%" }}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(EventListPage);
