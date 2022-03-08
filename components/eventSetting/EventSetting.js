import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import util from "../../utils/util";
// import TourVodInput from "../tourVod/TourVodInput";

export const EVENT_SETTING = gql`
  query eventSettingNewPasswordMessage($event_idx: Int!) {
    eventSettingNewPasswordMessage(event_idx: $event_idx) {
      idx
      event_idx
      new_password_title
      new_password_message
    }
    eventSettingLoginBlockMessageBeforeEvent(event_idx: $event_idx) {
      idx
      event_idx
      login_block_message_before_event
    }
    eventSettingLoginBlockMessageAfterEvent(event_idx: $event_idx) {
      idx
      event_idx
      login_block_message_after_event
    }
    eventSettingIntro(event_idx: $event_idx) {
      event_idx
      intro_cover_url
      intro_loading_url
      intro_loading_text
    }
    eventSettingMenu(event_idx: $event_idx) {
      event_idx
      menu_survey
      menu_copyright
    }
    eventSettingLobby(event_idx: $event_idx) {
      event_idx
      logo_url
      video_url
    }
    eventSettingLiveBanner(event_idx: $event_idx) {
      event_idx
      live_banner_url1
      live_banner_url2
      live_banner_url3
      live_banner_url4
      live_banner_url5
      live_banner_url6
    }
    eventSettingVodBanner(event_idx: $event_idx) {
      event_idx
      vod_banner_url1
      vod_banner_url2
      vod_banner_url3
      vod_banner_url4
    }
    eventSettingTour(event_idx: $event_idx) {
      event_idx
      tour_top_banner_url
      tour_category_cover_url1
      tour_category_cover_url2
      tour_category_cover_url3
      tour_category_cover_url4
      tour_category_cover_url5
      tour_footer_brochure_banner
    }
  }
`;

export const SAVE_EVENT_SETTING_NEW_PASSWORD_MESSAGE = gql`
  mutation saveEventSettingNewPasswordMessage(
    $input: eventSettingNewPasswordMessageInput
  ) {
    saveEventSettingNewPasswordMessage(input: $input) {
      idx
      event_idx
      new_password_title
      new_password_message
    }
  }
`;

export const SAVE_EVENT_SETTING_LOGIN_BLOCK_MESSAGE_BEFORE_EVENT = gql`
  mutation saveEventSettingLoginBlockMessageBeforeEvent(
    $input: eventSettingLoginBlockMessageBeforeEventInput
  ) {
    saveEventSettingLoginBlockMessageBeforeEvent(input: $input) {
      idx
      event_idx
      login_block_message_before_event
    }
  }
`;

export const SAVE_EVENT_SETTING_LOGIN_BLOCK_MESSAGE_AFTER_EVENT = gql`
  mutation saveEventSettingLoginBlockMessageAfterEvent(
    $input: eventSettingLoginBlockMessageAfterEventInput
  ) {
    saveEventSettingLoginBlockMessageAfterEvent(input: $input) {
      idx
      event_idx
      login_block_message_after_event
    }
  }
`;

export const SAVE_EVENT_SETTING_INTRO = gql`
  mutation saveEventSettingIntro($input: eventSettingIntroInput) {
    saveEventSettingIntro(input: $input) {
      event_idx
      intro_cover_url
      intro_loading_url
      intro_loading_text
    }
  }
`;

export const SAVE_EVENT_SETTING_MENU = gql`
  mutation saveEventSettingMenu($input: eventSettingMenuInput) {
    saveEventSettingMenu(input: $input) {
      event_idx
      menu_survey
      menu_copyright
    }
  }
`;

export const SAVE_EVENT_SETTING_LOBBY = gql`
  mutation saveEventSettingLobby($input: eventSettingLobbyInput) {
    saveEventSettingLobby(input: $input) {
      event_idx
      logo_url
      video_url
    }
  }
`;

export const SAVE_EVENT_SETTING_LIVE_BANNER = gql`
  mutation saveEventSettingLiveBanner($input: eventSettingLiveBannerInput) {
    saveEventSettingLiveBanner(input: $input) {
      event_idx
      live_banner_url1
      live_banner_url2
      live_banner_url3
      live_banner_url4
      live_banner_url5
      live_banner_url6
    }
  }
`;

export const SAVE_EVENT_SETTING_VOD_BANNER = gql`
  mutation saveEventSettingVodBanner($input: eventSettingVodBannerInput) {
    saveEventSettingVodBanner(input: $input) {
      event_idx
      vod_banner_url1
      vod_banner_url2
      vod_banner_url3
      vod_banner_url4
    }
  }
`;

export const SAVE_EVENT_SETTING_TOUR = gql`
  mutation saveEventSettingTour($input: eventSettingTourInput) {
    saveEventSettingTour(input: $input) {
      event_idx
      tour_top_banner_url
      tour_footer_brochure_banner
    }
  }
`;

const EventSettingContainer = styled.div`
  // border: 1px solid #000;
  & input {
    height: 35px;
    width: 99%;
    padding: 0 10px;
    border: 1px solid #eee;
    margin-right: 30px;
  }
  & th {
    width: 200px;
  }

  .grid-cols {
    // height: 40px;
    display: grid;
    grid-template-columns: 200px 1fr;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    // margin: 15px 0;
  }

  .grid-rows {
    grid-template-rows: 200px 1fr;
    border: 1px solid #e8e8e8;
    margin-bottom: 10px;
  }

  .save-setting {
    background-color: #3348be;
    width: 80px;
    color: #fff;
    padding: 0 10px;
    height: 40px;
    border-radius: 5px;
  }
`;

const EventSetting = ({ eventIdx }) => {
  const [newPasswordTitle, setNewPasswordTitle] = useState(
    "Your password has been reset."
  );
  const [newPasswordMessage, setNewPasswordMessage] = useState(
    "New Password : #NEW_PASSWORD#"
  );
  const [loginBlockMessageBeforeEvent, setLoginBlockMessageBeforeEvent] =
    useState("행사 진행 전입니다.");
  const [loginBlockMessageAfterEvent, setLoginBlockMessageAfterEvent] =
    useState("모든 행사가 종료되었습니다.");

  const [introCoverUrl, setIntroCoverUrl] = useState("");
  const [introLoadingUrl, setIntroLoadingUrl] = useState("");
  const [introLoadingText, setIntroLoadingText] = useState("");

  // menu related : survey / copyright
  const [menuSurvey, setMenuSurvey] = useState("");
  const [menuCopyright, setMenuCopyright] = useState("");

  const [lobbyLogoUrl, setLobbyLogoUrl] = useState("");
  const [lobbyVideoUrl, setLobbyVideoUrl] = useState("");

  const [liveBannerUrl1, setLiveBannerUrl1] = useState("");
  const [liveBannerUrl2, setLiveBannerUrl2] = useState("");
  const [liveBannerUrl3, setLiveBannerUrl3] = useState("");
  const [liveBannerUrl4, setLiveBannerUrl4] = useState("");
  const [liveBannerUrl5, setLiveBannerUrl5] = useState("");
  const [liveBannerUrl6, setLiveBannerUrl6] = useState("");

  const [vodBannerUrl1, setVodBannerUrl1] = useState("");
  const [vodBannerUrl2, setVodBannerUrl2] = useState("");
  const [vodBannerUrl3, setVodBannerUrl3] = useState("");
  const [vodBannerUrl4, setVodBannerUrl4] = useState("");
  const [vodBannerUrl5, setVodBannerUrl5] = useState("");
  const [vodBannerUrl6, setVodBannerUrl6] = useState("");

  const [tourTopBannerUrl, setTourTopBannerUrl] = useState("");
  const [tourCategoryCoverUrl1, setTourCategoryCoverUrl1] = useState("");
  const [tourCategoryCoverUrl2, setTourCategoryCoverUrl2] = useState("");
  const [tourCategoryCoverUrl3, setTourCategoryCoverUrl3] = useState("");
  const [tourCategoryCoverUrl4, setTourCategoryCoverUrl4] = useState("");
  const [tourCategoryCoverUrl5, setTourCategoryCoverUrl5] = useState("");
  const [tourFooterBrochureBannerUrl, setTourFooterBrochureBannerUrl] =
    useState("");

  const [selectedCategoryKey, setSelectedCategoryKey] = useState("");
  const saveNewPasswordMessage = () => {
    if (util.isEmpty(newPasswordMessage)) {
      window.alert("[임시 비밀번호 문구]를 입력하세요.");
      return;
    }

    const passwordRe = /\#NEW\_PASSWORD\#/gi;

    if (!passwordRe.exec(newPasswordMessage)) {
      window.alert(
        "[임시 비밀번호 문구]에 '#NEW_PASSWORD#'라는 문구를 포함 시켜주세요."
      );
      return;
    }

    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.new_password_title = newPasswordTitle;
    form.new_password_message = newPasswordMessage;

    saveNewPasswordMessageQL({ variables: { input: form } });
  };

  const saveLoginBlockMessageBeforeEvent = () => {
    if (util.isEmpty(loginBlockMessageBeforeEvent)) {
      window.alert("[로그인 불가 안내 문구 - 행사 전]를 입력하세요.");
      return;
    }
    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.login_block_message_before_event = loginBlockMessageBeforeEvent;

    saveLoginBlockMessageBeforeEventQL({ variables: { input: form } });
  };

  const saveLoginBlockMessageAfterEvent = () => {
    if (util.isEmpty(loginBlockMessageAfterEvent)) {
      window.alert("[로그인 불가 안내 문구 - 행사 종료]를 입력하세요.");
      return;
    }
    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.login_block_message_after_event = loginBlockMessageAfterEvent;

    saveLoginBlockMessageAfterEventQL({ variables: { input: form } });
  };

  const saveIntro = () => {
    if (util.isEmpty(introCoverUrl)) {
      window.alert("[커버 이미지]를 입력하세요.");
      return;
    }
    if (util.isEmpty(introLoadingUrl)) {
      window.alert("[로딩 이미지]를 입력하세요.");
      return;
    }

    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.intro_cover_url = introCoverUrl;
    form.intro_loading_url = introLoadingUrl;
    form.intro_loading_text = introLoadingText;

    saveIntroQL({ variables: { input: form } });
  };

  const saveMenu = () => {
    if (util.isEmpty(menuSurvey)) {
      window.alert("[Survey 경로]를 입력하세요.");
      return;
    }
    if (util.isEmpty(menuCopyright)) {
      window.alert("[Copyright 문구]를 입력하세요.");
      return;
    }

    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.menu_survey = menuSurvey;
    form.menu_copyright = menuCopyright;

    saveMenuQL({ variables: { input: form } });
  };

  const saveLobbyVod = () => {
    console.log("saveLobbyVod Call.");
    if (util.isEmpty(lobbyLogoUrl)) {
      window.alert("[동영상 로고]를 입력하세요.");
      return;
    }
    if (util.isEmpty(lobbyVideoUrl)) {
      window.alert("[동영상 경로]를 입력하세요.");
      return;
    }

    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.logo_url = lobbyLogoUrl;
    form.video_url = lobbyVideoUrl;

    saveLobbyQL({ variables: { input: form } });
  };

  const saveLiveBanner = () => {
    console.log("saveLiveBanner Call.");
    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.live_banner_url1 = liveBannerUrl1;
    form.live_banner_url2 = liveBannerUrl2;
    form.live_banner_url3 = liveBannerUrl3;
    form.live_banner_url4 = liveBannerUrl4;
    form.live_banner_url5 = liveBannerUrl5;
    form.live_banner_url6 = liveBannerUrl6;
    saveLiveBannerQL({ variables: { input: form } });
  };

  const saveVodBanner = () => {
    console.log("saveVodBanner Call.");
    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.vod_banner_url1 = vodBannerUrl1;
    form.vod_banner_url2 = vodBannerUrl2;
    form.vod_banner_url3 = vodBannerUrl3;
    form.vod_banner_url4 = vodBannerUrl4;

    saveVodBannerQL({ variables: { input: form } });
  };

  const saveTour = () => {
    console.log("saveTour Call.");
    const form = {};
    form.event_idx = parseInt(eventIdx, 10);
    form.tour_top_banner_url = tourTopBannerUrl;
    form.tour_category_cover_url1 = tourCategoryCoverUrl1;
    form.tour_category_cover_url2 = tourCategoryCoverUrl2;
    form.tour_category_cover_url3 = tourCategoryCoverUrl3;
    form.tour_category_cover_url4 = tourCategoryCoverUrl4;
    form.tour_category_cover_url5 = tourCategoryCoverUrl5;
    form.tour_footer_brochure_banner = tourFooterBrochureBannerUrl;

    saveTourQL({ variables: { input: form } });
  };

  const {
    loading,
    error,
    data,
    refetch: refetchData,
  } = useQuery(EVENT_SETTING, {
    variables: { event_idx: parseInt(eventIdx, 10) },
  });

  const [saveNewPasswordMessageQL] = useMutation(
    SAVE_EVENT_SETTING_NEW_PASSWORD_MESSAGE,
    {
      onError: (error) => {
        // UNAUTHENTICATED -> token 없음. ForbiddenError -> token의 권한 이슈 -> login again.

        window.alert(error);
      },
      onCompleted: (data) => {
        refetchData().then((response) => {
          const { data } = response;
          if (data.eventSettingNewPasswordMessage) {
            if (data.eventSettingNewPasswordMessage.new_password_title)
              setNewPasswordTitle(
                data.eventSettingNewPasswordMessage.new_password_title
              );

            if (data.eventSettingNewPasswordMessage.new_password_message)
              setNewPasswordMessage(
                data.eventSettingNewPasswordMessage.new_password_message
              );
          }
        });
        window.alert("저장되었습니다.");
      },
    }
  );

  const [saveLoginBlockMessageBeforeEventQL] = useMutation(
    SAVE_EVENT_SETTING_LOGIN_BLOCK_MESSAGE_BEFORE_EVENT,
    {
      onError: (error) => {
        window.alert(error);
      },
      onCompleted: (data) => {
        refetchData().then((response) => {
          const { data } = response;
          if (data.eventSettingLoginBlockMessageBeforeEvent) {
            setLoginBlockMessageBeforeEvent(
              data.eventSettingLoginBlockMessageBeforeEvent
                .login_block_message_before_event
            );
          }
        });
        window.alert("저장되었습니다.");
      },
    }
  );

  const [saveLoginBlockMessageAfterEventQL] = useMutation(
    SAVE_EVENT_SETTING_LOGIN_BLOCK_MESSAGE_AFTER_EVENT,
    {
      onError: (error) => {
        window.alert(error);
      },
      onCompleted: (data) => {
        refetchData().then((response) => {
          const { data } = response;
          if (data.eventSettingLoginBlockMessageAfterEvent) {
            setLoginBlockMessageAfterEvent(
              data.eventSettingLoginBlockMessageAfterEvent
                .login_block_message_after_event
            );
          }
        });
        window.alert("저장되었습니다.");
      },
    }
  );

  const [saveIntroQL] = useMutation(SAVE_EVENT_SETTING_INTRO, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      refetchData().then((response) => {
        const { data } = response;
        if (data.eventSettingIntro) {
          setIntroCoverUrl(data.eventSettingIntro.intro_cover_url);
          setIntroLoadingUrl(data.eventSettingIntro.intro_loading_url);
          setIntroLoadingText(data.eventSettingIntro.intro_loading_text);
        }
      });
      window.alert("저장되었습니다.");
    },
  });

  const [saveMenuQL] = useMutation(SAVE_EVENT_SETTING_MENU, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      refetchData().then((response) => {
        const { data } = response;
        if (data.eventSettingMenu) {
          setMenuSurvey(data.eventSettingMenu.menu_survey);
          setMenuCopyright(data.eventSettingMenu.menu_copyright);
        }
      });
      window.alert("저장되었습니다.");
    },
  });

  const [saveLobbyQL] = useMutation(SAVE_EVENT_SETTING_LOBBY, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      refetchData().then((response) => {
        const { data } = response;
        if (data.eventSettingLobby) {
          setLobbyLogoUrl(data.eventSettingLobby.logo_url);
          setLobbyVideoUrl(data.eventSettingLobby.video_url);
        }
      });
      window.alert("저장되었습니다.");
    },
  });

  const [saveLiveBannerQL] = useMutation(SAVE_EVENT_SETTING_LIVE_BANNER, {
    onError: (error) => {
      window.alert(error);
    },
    onCompleted: (data) => {
      refetchData().then((response) => {
        const { data } = response;
        if (data.eventSettingLiveBanner) {
          if (data.eventSettingLiveBanner.live_banner_url1)
            setLiveBannerUrl1(data.eventSettingLiveBanner.live_banner_url1);
          if (data.eventSettingLiveBanner.live_banner_url2)
            setLiveBannerUrl2(data.eventSettingLiveBanner.live_banner_url2);
          if (data.eventSettingLiveBanner.live_banner_url3)
            setLiveBannerUrl3(data.eventSettingLiveBanner.live_banner_url3);
          if (data.eventSettingLiveBanner.live_banner_url4)
            setLiveBannerUrl4(data.eventSettingLiveBanner.live_banner_url4);
          if (data.eventSettingLiveBanner.live_banner_url5)
            setLiveBannerUrl5(data.eventSettingLiveBanner.live_banner_url5);
          if (data.eventSettingLiveBanner.live_banner_url6)
            setLiveBannerUrl6(data.eventSettingLiveBanner.live_banner_url6);
        }
      });
      window.alert("저장되었습니다.");
    },
  });

  const [saveVodBannerQL] = useMutation(SAVE_EVENT_SETTING_VOD_BANNER, {
    onError: (error) => {
      window.alert(error);
    },
    onCompleted: (data) => {
      refetchData().then((response) => {
        const { data } = response;
        if (data.eventSettingLiveBanner) {
          if (data.eventSettingVodBanner.vod_banner_url1)
            setVodBannerUrl1(data.eventSettingVodBanner.vod_banner_url1);
          if (data.eventSettingVodBanner.vod_banner_url2)
            setVodBannerUrl2(data.eventSettingVodBanner.vod_banner_url2);
          if (data.eventSettingVodBanner.vod_banner_url3)
            setVodBannerUrl3(data.eventSettingVodBanner.vod_banner_url3);
          if (data.eventSettingVodBanner.vod_banner_url4)
            setVodBannerUrl4(data.eventSettingVodBanner.vod_banner_url4);
        }
      });
      window.alert("저장되었습니다.");
    },
  });

  const [saveTourQL] = useMutation(SAVE_EVENT_SETTING_TOUR, {
    onError: (error) => {
      window.alert(error);
    },
    onCompleted: (data) => {
      refetchData().then((response) => {
        const { data } = response;
        if (data.eventSettingTour) {
          setTourTopBannerUrl(data.eventSettingTour.tour_top_banner_url);
          setTourCategoryCoverUrl1(
            data.eventSettingTour.tour_category_cover_url1
          );
          setTourCategoryCoverUrl2(
            data.eventSettingTour.tour_category_cover_url2
          );
          setTourCategoryCoverUrl3(
            data.eventSettingTour.tour_category_cover_url3
          );
          setTourCategoryCoverUrl4(
            data.eventSettingTour.tour_category_cover_url4
          );
          setTourCategoryCoverUrl5(
            data.eventSettingTour.tour_category_cover_url5
          );
          setTourFooterBrochureBannerUrl(
            data.eventSettingTour.tour_footer_brochure_banner
          );
        }
      });
      window.alert("저장되었습니다.");
    },
  });

  const _read = () => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    if (data.eventSettingNewPasswordMessage.new_password_title) {
      setNewPasswordTitle(
        data.eventSettingNewPasswordMessage.new_password_title
      );
    }

    if (data.eventSettingNewPasswordMessage.new_password_message) {
      setNewPasswordMessage(
        data.eventSettingNewPasswordMessage.new_password_message
      );
    }

    if (data.eventSettingLoginBlockMessageBeforeEvent) {
      setLoginBlockMessageBeforeEvent(
        data.eventSettingLoginBlockMessageBeforeEvent
          .login_block_message_before_event
      );
    }

    if (data.eventSettingLoginBlockMessageAfterEvent) {
      setLoginBlockMessageAfterEvent(
        data.eventSettingLoginBlockMessageAfterEvent
          .login_block_message_after_event
      );
    }

    if (data.eventSettingIntro) {
      setIntroCoverUrl(data.eventSettingIntro.intro_cover_url);
      setIntroLoadingUrl(data.eventSettingIntro.intro_loading_url);
      setIntroLoadingText(data.eventSettingIntro.intro_loading_text);
    }

    if (data.eventSettingMenu) {
      setMenuSurvey(data.eventSettingMenu.menu_survey);
      setMenuCopyright(data.eventSettingMenu.menu_copyright);
    }

    if (data.eventSettingLobby) {
      setLobbyLogoUrl(data.eventSettingLobby.logo_url);
      setLobbyVideoUrl(data.eventSettingLobby.video_url);
    }

    if (data.eventSettingLiveBanner) {
      if (data.eventSettingLiveBanner.live_banner_url1)
        setLiveBannerUrl1(data.eventSettingLiveBanner.live_banner_url1);
      if (data.eventSettingLiveBanner.live_banner_url2)
        setLiveBannerUrl2(data.eventSettingLiveBanner.live_banner_url2);
      if (data.eventSettingLiveBanner.live_banner_url3)
        setLiveBannerUrl3(data.eventSettingLiveBanner.live_banner_url3);
      if (data.eventSettingLiveBanner.live_banner_url4)
        setLiveBannerUrl4(data.eventSettingLiveBanner.live_banner_url4);
      if (data.eventSettingLiveBanner.live_banner_url5)
        setLiveBannerUrl5(data.eventSettingLiveBanner.live_banner_url5);
      if (data.eventSettingLiveBanner.live_banner_url6)
        setLiveBannerUrl6(data.eventSettingLiveBanner.live_banner_url6);
    }

    if (data.eventSettingVodBanner) {
      if (data.eventSettingVodBanner.vod_banner_url1)
        setVodBannerUrl1(data.eventSettingVodBanner.vod_banner_url1);
      if (data.eventSettingVodBanner.vod_banner_url2)
        setVodBannerUrl2(data.eventSettingVodBanner.vod_banner_url2);
      if (data.eventSettingVodBanner.vod_banner_url3)
        setVodBannerUrl3(data.eventSettingVodBanner.vod_banner_url3);
      if (data.eventSettingVodBanner.vod_banner_url4)
        setVodBannerUrl4(data.eventSettingVodBanner.vod_banner_url4);
    }

    if (data.eventSettingTour) {
      if (data.eventSettingTour.tour_top_banner_url)
        setTourTopBannerUrl(data.eventSettingTour.tour_top_banner_url);
      if (data.eventSettingTour.tour_category_cover_url1)
        setTourCategoryCoverUrl1(
          data.eventSettingTour.tour_category_cover_url1
        );
      if (data.eventSettingTour.tour_category_cover_url2)
        setTourCategoryCoverUrl2(
          data.eventSettingTour.tour_category_cover_url2
        );
      if (data.eventSettingTour.tour_category_cover_url3)
        setTourCategoryCoverUrl3(
          data.eventSettingTour.tour_category_cover_url3
        );
      if (data.eventSettingTour.tour_category_cover_url4)
        setTourCategoryCoverUrl4(
          data.eventSettingTour.tour_category_cover_url4
        );
      if (data.eventSettingTour.tour_category_cover_url5)
        setTourCategoryCoverUrl5(
          data.eventSettingTour.tour_category_cover_url5
        );
      if (data.eventSettingTour.tour_footer_brochure_banner)
        setTourFooterBrochureBannerUrl(
          data.eventSettingTour.tour_footer_brochure_banner
        );
    }
  };

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  if (loading) return <div>Loading..</div>;

  return (
    <>
      <div className="grid-rows">
        <div className="grid-cols">
          <div>
            <h2 className="setting_title">임시 비밀번호 문구</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              className="save-setting"
              type="button"
              onClick={saveNewPasswordMessage}
            >
              저장
            </button>
          </div>
        </div>
        <div>
          <input
            type="text"
            name="newPasswordTitle"
            value={newPasswordTitle || ""}
            placeholder={"Email Title"}
            onChange={(e) => {
              setNewPasswordTitle(e.target.value);
            }}
          />
          <textarea
            style={{ width: "100%", height: 200, padding: "10px 10px" }}
            value={newPasswordMessage || ""}
            onChange={(e) => {
              setNewPasswordMessage(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid-rows">
        <div className="grid-cols">
          <div>
            <h2 className="setting_title">로그인 불가 안내 문구 - 행사 전</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              className="save-setting"
              type="button"
              onClick={saveLoginBlockMessageBeforeEvent}
            >
              저장
            </button>
          </div>
        </div>
        <div>
          <textarea
            style={{ width: "100%", height: 200, padding: "10px 10px" }}
            value={loginBlockMessageBeforeEvent || ""}
            onChange={(e) => {
              setLoginBlockMessageBeforeEvent(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid-rows">
        <div className="grid-cols">
          <div>
            <h2 className="setting_title">로그인 불가 안내 문구 - 행사 종료</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              className="save-setting"
              type="button"
              onClick={saveLoginBlockMessageAfterEvent}
            >
              저장
            </button>
          </div>
        </div>
        <div>
          <textarea
            style={{ width: "100%", height: 200, padding: "10px 10px" }}
            value={loginBlockMessageAfterEvent || ""}
            onChange={(e) => {
              setLoginBlockMessageAfterEvent(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid-rows">
        <form
          name="lobbyForm"
          onSubmit={(e) => {
            e.preventDefault();
            saveIntro();
            return false;
          }}
        >
          <div className="grid-cols">
            <div>
              <h2 className="setting_title">Intro</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                className="save-setting"
                type="submit"
                // onClick={saveLobbyVod}
              >
                저장
              </button>
            </div>
          </div>
          <div>
            <table className="table">
              <tbody className="not_col_tbody">
                <tr>
                  <th style={{ color: "#000" }}>커버 이미지</th>
                  <td>
                    <input
                      type="url"
                      name="introCoverUrl"
                      value={introCoverUrl || ""}
                      onChange={(e) => {
                        setIntroCoverUrl(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>로딩 이미지</th>
                  <td>
                    <input
                      type="url"
                      name="introLoadingUrl"
                      value={introLoadingUrl || ""}
                      onChange={(e) => {
                        setIntroLoadingUrl(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>로딩 안내문</th>
                  <td>
                    <input
                      type="text"
                      name="introLoadingText"
                      value={introLoadingText || ""}
                      onChange={(e) => {
                        setIntroLoadingText(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
      {/* menu 관련. */}
      <div className="grid-rows">
        <form
          name="menuForm"
          onSubmit={(e) => {
            e.preventDefault();
            saveMenu();
            return false;
          }}
        >
          <div className="grid-cols">
            <div>
              <h2 className="setting_title">Menu</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <button className="save-setting" type="submit">
                저장
              </button>
            </div>
          </div>
          <div>
            <table className="table">
              <tbody className="not_col_tbody">
                <tr>
                  <th style={{ color: "#000" }}>Survey 경로</th>
                  <td>
                    <input
                      type="url"
                      name="menuSurvey"
                      value={menuSurvey || ""}
                      onChange={(e) => {
                        setMenuSurvey(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>Copyright 문구</th>
                  <td>
                    <input
                      type="text"
                      name="menuCopyright"
                      value={menuCopyright || ""}
                      onChange={(e) => {
                        setMenuCopyright(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>

      <div className="grid-rows">
        <form
          name="lobbyForm"
          onSubmit={(e) => {
            e.preventDefault();
            saveLobbyVod();
            return false;
          }}
        >
          <div className="grid-cols">
            <div>
              <h2 className="setting_title">Lobby</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                className="save-setting"
                type="submit"
                // onClick={saveLobbyVod}
              >
                저장
              </button>
            </div>
          </div>
          <div>
            <table className="table">
              <tbody className="not_col_tbody">
                <tr>
                  <th style={{ color: "#000" }}>동영상 로고</th>
                  <td>
                    <input
                      type="url"
                      name="lobbyLogoUrl"
                      value={lobbyLogoUrl || ""}
                      onChange={(e) => {
                        setLobbyLogoUrl(e.target.value);
                      }}
                      onBlur={async (e) => {
                        const { vodUrl } = await util.urlChange(e.target.value);
                        console.log("vodUrl ::", vodUrl);
                        if (!util.isEmpty(vodUrl)) setLobbyLogoUrl(vodUrl);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>동영상 경로</th>
                  <td>
                    <input
                      type="url"
                      name="lobbyVideoUrl"
                      value={lobbyVideoUrl || ""}
                      onChange={(e) => {
                        setLobbyVideoUrl(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>

      <div className="grid-rows">
        <form
          name="liveBannerForm"
          onSubmit={(e) => {
            e.preventDefault();
            saveLiveBanner();
            return false;
          }}
        >
          <div className="grid-cols">
            <div>
              <h2 className="setting_title">Live Session</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <button className="save-setting" type="submit">
                저장
              </button>
            </div>
          </div>
          <div>
            <table className="table">
              <tbody className="not_col_tbody">
                <tr>
                  <th style={{ color: "#000" }}>배너 1</th>
                  <td>
                    <input
                      type="url"
                      name="liveBannerUrl1"
                      value={liveBannerUrl1 || ""}
                      onChange={(e) => {
                        setLiveBannerUrl1(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>배너 2</th>
                  <td>
                    <input
                      type="url"
                      name="liveBannerUrl2"
                      value={liveBannerUrl2 || ""}
                      onChange={(e) => {
                        setLiveBannerUrl2(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>배너 3</th>
                  <td>
                    <input
                      type="url"
                      name="liveBannerUrl3"
                      value={liveBannerUrl3 || ""}
                      onChange={(e) => {
                        setLiveBannerUrl3(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>배너 4</th>
                  <td>
                    <input
                      type="url"
                      name="liveBannerUrl4"
                      value={liveBannerUrl4 || ""}
                      onChange={(e) => {
                        setLiveBannerUrl4(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>배너 5</th>
                  <td>
                    <input
                      type="url"
                      name="liveBannerUrl5"
                      value={liveBannerUrl5 || ""}
                      onChange={(e) => {
                        setLiveBannerUrl5(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>배너 6</th>
                  <td>
                    <input
                      type="url"
                      name="liveBannerUrl6"
                      value={liveBannerUrl6 || ""}
                      onChange={(e) => {
                        setLiveBannerUrl6(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
      {/* {openTourVodInput && (
        <TourVodInput
          eventIdx={eventIdx}
          categoryKey={selectedCategoryKey}
          setOpenTourVodInput={setOpenTourVodInput}
        />
      )} */}

      <div className="grid-rows">
        <form
          name="vodBannerForm"
          onSubmit={(e) => {
            e.preventDefault();
            saveVodBanner();
            return false;
          }}
        >
          <div className="grid-cols">
            <div>
              <h2 className="setting_title">VOD Session</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <button className="save-setting" type="submit">
                저장
              </button>
            </div>
          </div>
          <div>
            <table className="table">
              <tbody className="not_col_tbody">
                <tr>
                  <th style={{ color: "#000" }}>배너 1</th>
                  <td>
                    <input
                      type="url"
                      name="vodBannerUrl1"
                      value={vodBannerUrl1 || ""}
                      onChange={(e) => {
                        setVodBannerUrl1(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>배너 2</th>
                  <td>
                    <input
                      type="url"
                      name="vodBannerUrl2"
                      value={vodBannerUrl2 || ""}
                      onChange={(e) => {
                        setVodBannerUrl2(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>배너 3</th>
                  <td>
                    <input
                      type="url"
                      name="vodBannerUrl3"
                      value={vodBannerUrl3 || ""}
                      onChange={(e) => {
                        setVodBannerUrl3(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>배너 4</th>
                  <td>
                    <input
                      type="url"
                      name="vodBannerUrl4"
                      value={vodBannerUrl4 || ""}
                      onChange={(e) => {
                        setVodBannerUrl4(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>

      <div className="grid-rows">
        <form
          name="tourForm"
          onSubmit={(e) => {
            e.preventDefault();
            saveTour();
            return false;
          }}
        >
          <div className="grid-cols">
            <div>
              <h2 className="setting_title">Tour</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <button className="save-setting" type="submit">
                저장
              </button>
            </div>
          </div>
          <div>
            <table className="table">
              <tbody className="not_col_tbody">
                <tr>
                  <th style={{ color: "#000" }}>상단 배너</th>
                  <td colSpan="2">
                    <input
                      type="url"
                      name="tourTopBannerUrl"
                      value={tourTopBannerUrl || ""}
                      onChange={(e) => {
                        setTourTopBannerUrl(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#000" }}>브로셔 배너</th>
                  <td colSpan="2">
                    <input
                      type="url"
                      name="tourFooterBrochureBannerUrl"
                      value={tourFooterBrochureBannerUrl || ""}
                      onChange={(e) => {
                        setTourFooterBrochureBannerUrl(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
};

export default EventSetting;
