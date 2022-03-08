import React, { useState, useEffect } from "react";
import "moment-timezone";
import moment from "moment";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import EventTable from "./EventTable";
import TableList from "../common/table/TableList";

export const CREATE_EVENT = gql`
  mutation createEvent($input: eventInput) {
    createEvent(input: $input) {
      idx
      pco_idx
      title
      code
      start_date
      end_date
      domain
      time_zone
      language
      type
      privacy_consent
      user_consent
      created_at
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($idx: ID!) {
    deleteEvent(idx: $idx) {
      idx
      pco_idx
      title
      code
      start_date
      end_date
      domain
      time_zone
      language
      type
      privacy_consent
      user_consent
      created_at
    }
  }
`;
export const columns = [
  { label: "idx", field: "idx", readonly: true, width: "110px" },
  {
    label: "prent_idx",
    field: "prent_idx",
    type: "hidden",
    value: ["pco_idx"],
  },
  {
    label: "pco.name",
    field: "pco.name",
    readonly: true,
    type: "referer",
    origin: "pco_idx",
    router: "pco",
  },
  {
    label: "code",
    field: "code",
    required: true,
  },
  {
    label: "title",
    field: "title",
    required: true,
    type: "link",
    linkField: "idx",
  },
  {
    label: "active_yn",
    field: "active_yn",
    type: "checkbox",
    defaultValue: "N",
  },
  {
    label: "start_date",
    field: "start_date",
    type: "date",
    required: true,
  },
  { label: "end_date", field: "end_date", type: "date", required: true },
  {
    label: "summary",
    field: "summary",
    type: "textarea",
    align: "left",
    width: 400,
  },
  {
    label: "delete",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];
export const eventInput = {
  idx: { type: "int" },
  pco_idx: { type: "int" },
  code: "",
  title: "",
  summary: "",
  start_date: { type: "date" },
  end_date: { type: "date" },
  active_yn: "",
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const EventList = () => {
  const router = "/event/";
  const title = "Event";
  const listName = "eventList";

  const [user, setUser] = useState();
  const [form, setForm] = useState({});

  // const { loading, error, data, refetch } = useQuery(EVENT_LIST_QUERY, {
  //   variables: {
  //     pco_idx: user
  //       ? parseInt(user.pco_idx, 10)
  //       : pcoIdx
  //       ? parseInt(pcoIdx, 10)
  //       : parseInt(0, 10),
  //     offset: parseInt(offset, 10),
  //   },
  // });

  // const [mutationCreate] = useMutation(CREATE_EVENT, {
  //   onError: (error) => {
  //     console.log("mutationCreate error!", error);
  //   },
  //   onCompleted: (data) => {
  //     setOpenEditor(false);
  //     _refetchData();
  //   },
  //   // refetchQueries: [{ query: PCO_LIST_QUERY }],
  // });
  // const [mutationUpdate] = useMutation(UPDATE_EVENT, {
  //   onError: (error) => {
  //     console.log("mutationUpdate error!", error);
  //   },
  //   onCompleted: (data) => {
  //     setOpenEditor(false);
  //     _refetchData();
  //   },
  // });
  // const [mutationDelete] = useMutation(DELETE_EVENT, {
  //   onError: (error) => {
  //     console.log("mutationDelete error!", error);
  //     window.alert(error);
  //     return;
  //   },
  //   onCompleted: (data) => {
  //     _refetchData();
  //   },
  //   // refetchQueries: [{ query: PCO_LIST_QUERY }],
  // });
  const _refetchData = () => {
    // if (refetch()) {
    //   refetch().then((response) => {
    //     const list = response.data.eventPaging[listName];
    //     if (data) {
    //       if (
    //         util.isEmpty(response.data.eventPaging.totalCount) ||
    //         util.isEmpty(response.data.eventPaging.limit)
    //       ) {
    //         if (offset > 1) {
    //           setOffset(offset - limit);
    //           _refetchData();
    //         } else {
    //           setRows(list || []);
    //           setOffset(offset);
    //         }
    //       } else {
    //         setRows(list || []);
    //         setLimit(response.data.eventPaging.limit);
    //         setTotalCount(response.data.eventPaging.totalCount);
    //       }
    //     }
    //   });
    // }
  };
  // const setColomnLength = (cols) => {
  //   const t = cols.filter((col, index) => {
  //     return col.type !== "hidden";
  //   }).length;
  //   setColSpan(t);
  // };

  const _read = async (prop) => {
    // const hasError = util.hasGQLError(error);
    // if (hasError) return;
    // const cols = columns.filter((col, index) => {
    //   return col.field !== undefined;
    // });
    // setColomnLength(cols);
    // if (data && data.eventPaging[listName]) {
    //   setRows(data.eventPaging[listName]);
    //   setLimit(data.eventPaging.limit);
    //   setTotalCount(data.eventPaging.totalCount);
    // }
  };

  const _save = async (form) => {
    // const input = {};
    // Object.keys(eventInput).map((key, index) => {
    //   const meta = eventInput[key];
    //   if (meta.type && meta.type === "int") {
    //     input[key] = parseInt(form[key], 10);
    //   } else if (meta.type && meta.type === "date") {
    //     input[key] = moment(form[key]).format("YYYYMMDD");
    //   } else {
    //     input[key] = form[key];
    //   }
    // });
    // if (util.isEmpty(form.idx)) {
    //   mutationCreate({ variables: { input } });
    // } else {
    //   mutationUpdate({ variables: { input } });
    // }
  };

  // + callback override
  callback.delete = async (row) => {
    //     const confirm = window.confirm(
    //       `Event에 포함된
    // [ event, event_setting, brochure, schedule, tour_vod, user, session, people, presentation, session_people, presentation_lang, people_lang ] 들의 정보들이 같이 삭제되며 복구할 수 없습니다.
    // 그래도 삭제를 하시겠습니까?
    //       `
    //     );
    //     if (confirm) {
    //       mutationDelete({ variables: { idx: row.idx } });
    //     }
  };
  // - callback override

  useEffect(() => {
    // if (pageRouter === "/pco") {
    //   const t = JSON.parse(sessionStorage.getItem("pcoUser"));
    //   setUser(t);
    // }
    setForm({
      name: "이름",
      code: "코드",
      start_date: "2021-07-07",
      end_date: "2021-07-31",
      domain: "www.naver.com",
    });
  }, []);

  // useEffect(() => {
  //   if (loading === false) _read();
  // }, [loading]);

  return (
    <>
      <EventTable
        columns={columns}
        form={form}
        setForm={setForm}
        _save={_save}
      />
    </>
  );
};

export default EventList;
