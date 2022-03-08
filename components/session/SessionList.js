import React, { useState, useEffect } from "react";
import "moment-timezone";
import moment from "moment";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import SessionInput from "./SessionInput";
import TableList from "../common/table/TableList";

export const SESSION_LIST_QUERY = gql`
  query sessionPaging($event_idx: Int, $schedule_idx: Int, $offset: Int) {
    sessionPaging(
      event_idx: $event_idx
      schedule_idx: $schedule_idx
      offset: $offset
    ) {
      totalCount
      limit
      offset
      sessionList {
        idx
        schedule_idx
        type
        code
        open_time
        close_time
        sort_order
        category
        location
        title
        summary
        warning
        zoom_meeting_number
        zoom_meeting_password
        schedule {
          idx
          step
        }
      }
    }
  }
`;

export const SESSION_QUERY = gql`
  query session($idx: Int!) {
    session(idx: $idx) {
      idx
      schedule_idx
      type
      code
      open_time
      close_time
      sort_order
      category
      location
      title
      summary
      warning
      zoom_meeting_number
      zoom_meeting_password
      schedule {
        idx
        step
      }
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation createSession($input: sessionInput) {
    createSession(input: $input) {
      idx
      schedule_idx
      type
      code
      open_time
      close_time
      sort_order
      category
      location
      title
      summary
      warning
      zoom_meeting_number
      zoom_meeting_password
    }
  }
`;

export const UPDATE_SESSION = gql`
  mutation updateSession($input: sessionInput) {
    updateSession(input: $input) {
      idx
      schedule_idx
      type
      code
      open_time
      close_time
      sort_order
      category
      location
      title
      summary
      warning
      zoom_meeting_number
      zoom_meeting_password
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation deleteSession($idx: ID!) {
    deleteSession(idx: $idx) {
      idx
      schedule_idx
      type
      code
      open_time
      close_time
      sort_order
      category
      location
      title
      summary
      warning
      zoom_meeting_number
      zoom_meeting_password
    }
  }
`;

export const columns = [
  { label: "idx", field: "idx", readonly: true, width: "100px" },
  {
    label: "prent_idx",
    field: "prent_idx",
    type: "hidden",
    value: ["schedule_idx"],
  },
  {
    label: "schedule.step",
    field: "schedule.step",
    origin: "schedule_idx",
    type: "referer",
    router: "/schedule",
    required: true,
  },
  {
    label: "title",
    field: "title",
    type: "link",
    linkField: "idx",
    required: true,
  },
  {
    label: "type",
    field: "type",
    type: "select",
    selectList: [
      { label: "live", code: "live" },
      { label: "vod", code: "vod" },
      { label: "notice", code: "notice" },
      { label: "break", code: "break" },
    ],
    required: true,
  },
  { label: "code", field: "code" },
  { label: "open_time", field: "open_time", type: "time" },
  { label: "close_time", field: "close_time", type: "time" },
  { label: "category", field: "category" },
  { label: "location", field: "location" },
  { label: "summary", field: "summary", type: "textarea" },
  { label: "warning", field: "warning" },
  { label: "zoom_meeting_number", field: "zoom_meeting_number" },
  { label: "zoom_meeting_password", field: "zoom_meeting_password" },
  { label: "sort_order", field: "sort_order" },
  {
    label: "delete",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];
export const scheduleInput = {
  idx: { type: "int" },
  schedule_idx: { type: "int" },
  type: "",
  code: "",
  open_time: { type: "datetime" },
  close_time: { type: "datetime" },
  sort_order: { type: "int" },
  category: "",
  location: "",
  title: "",
  summary: "",
  warning: "",
  zoom_meeting_number: "",
  zoom_meeting_password: "",
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const SessionList = ({ eventIdx, pageRouter, scheduleIdx }) => {
  const router = "/session/";
  const title = "Session";
  const listName = "sessionList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(SESSION_LIST_QUERY, {
    variables: {
      event_idx: parseInt(eventIdx, 10),
      schedule_idx: parseInt(scheduleIdx, 10),
      offset: parseInt(offset, 10),
    },
  });

  const [mutationCreate] = useMutation(CREATE_SESSION, {
    onError: (error) => {
      console.log("mutationCreate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_SESSION, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_SESSION, {
    onError: (error) => {
      console.log("mutationDelete error!", error);
      window.alert(error);
      return;
    },
    onCompleted: (data) => {
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const _refetchData = () => {
    refetch().then((response) => {
      const list = response.data.sessionPaging[listName];
      if (data) {
        if (
          util.isEmpty(response.data.sessionPaging.totalCount) ||
          util.isEmpty(response.data.sessionPaging.limit)
        ) {
          if (offset > 1) {
            setOffset(offset - limit);
            _refetchData();
          } else {
            setRows(list);
            setOffset(offset);
          }
        } else {
          setRows(list);
          setLimit(response.data.sessionPaging.limit);
          setTotalCount(response.data.sessionPaging.totalCount);
        }
      }
    });
  };
  const setColomnLength = (cols) => {
    const t = cols.filter((col, index) => {
      return col.type !== "hidden";
    }).length;
    setColSpan(t);
  };

  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    const cols = columns.filter((col, index) => {
      return col.field !== undefined;
    });
    setColomnLength(cols);

    if (data && data.sessionPaging[listName]) {
      setRows(data.sessionPaging[listName]);
      setLimit(data.sessionPaging.limit);
      setTotalCount(data.sessionPaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("_save call.");

    const input = {};
    Object.keys(scheduleInput).map((key, index) => {
      const meta = scheduleInput[key];
      if (meta.type && meta.type === "int") {
        input[key] = parseInt(form[key], 10);
      } else if (meta.type && meta.type === "date") {
        input[key] = moment(form[key]).format("YYYYMMDD");
      } else {
        input[key] = form[key];
      }
    });

    if (util.isEmpty(form.idx)) {
      mutationCreate({ variables: { input } });
    } else {
      mutationUpdate({ variables: { input } });
    }
  };

  // + callback override
  callback.delete = async (row) => {
    const confirm = window.confirm(
      `Session에 포함된
[ session, presentation, session_people, presentation_lang ] 들의 정보들이 같이 삭제되며 복구할 수 없습니다.
            
그래도 삭제를 하시겠습니까?
                  `
    );
    if (confirm) {
      mutationDelete({ variables: { idx: row.idx } });
    }
  };
  // - callback override

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  return (
    <>
      {openEditor && (
        <SessionInput
          eventIdx={eventIdx}
          columns={columns}
          form={form}
          setForm={setForm}
          _save={_save}
          openEditor={openEditor}
          setOpenEditor={setOpenEditor}
        />
      )}
      <TableList
        rows={rows}
        columns={columns}
        pageRouter={pageRouter}
        router={router}
        colSpan={colSpan}
        setForm={setForm}
        setOpenEditor={setOpenEditor}
        title={title}
        _refetchData={_refetchData}
        offset={offset}
        totalCount={totalCount}
        setOffset={setOffset}
        limit={limit}
        prentIdx={[scheduleIdx]}
      />
    </>
  );
};

export default SessionList;
