import React, { useState, useEffect } from "react";
import "moment-timezone";
import moment from "moment";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import ScheduleInput from "./ScheduleInput";
import TableList from "../common/table/TableList";

export const SCHEDULE_LIST_QUERY = gql`
  query schedulePaging($event_idx: Int!, $offset: Int) {
    schedulePaging(event_idx: $event_idx, offset: $offset) {
      totalCount
      limit
      offset
      scheduleList {
        idx
        event_idx
        step
        schedule_date
        event_code
        event {
          idx
          pco_idx
          title
          summary
          start_date
          end_date
          active_yn
          pco {
            idx
            name
          }
        }
      }
    }
  }
`;
export const SCHEDULE_QUERY = gql`
  query schedule($idx: Int!) {
    schedule(idx: $idx) {
      idx
      event_idx
      step
      schedule_date
      event_code
      event {
        idx
        pco_idx
        title
        summary
        start_date
        end_date
        active_yn
        pco {
          idx
          name
        }
      }
    }
  }
`;
export const CREATE_SCHEDULE = gql`
  mutation createSchedule($input: scheduleInput) {
    createSchedule(input: $input) {
      idx
      event_idx
      step
      schedule_date
      event_code
    }
  }
`;
export const UPDATE_SCHEDULE = gql`
  mutation updateSchedule($input: scheduleInput) {
    updateSchedule(input: $input) {
      idx
      event_idx
      step
      schedule_date
      event_code
    }
  }
`;
export const DELETE_SCHEDULE = gql`
  mutation deleteSchedule($idx: ID!) {
    deleteSchedule(idx: $idx) {
      idx
      event_idx
      step
      schedule_date
      event_code
    }
  }
`;
export const columns = [
  { label: "idx", field: "idx", readonly: true, width: "100px" },
  { label: "event_idx", field: "event_idx", readonly: true, type: "hidden" },
  {
    label: "prent_idx",
    field: "prent_idx",
    type: "hidden",
    value: ["event_idx"],
  },
  {
    label: "event.title",
    field: "event.title",
    type: "referer",
    origin: "event_idx",
    router: "/event",
    required: true,
  },
  {
    label: "step",
    field: "step",
    type: "link",
    linkField: "idx",
    required: true,
  },
  {
    label: "schedule_date",
    field: "schedule_date",
    type: "date",
    required: true,
  },
  { label: "event_code", field: "event_code" },
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
  event_idx: { type: "int" },
  step: { type: "int" },
  schedule_date: { type: "date" },
  event_code: "",
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const ScheduleList = ({ eventIdx, pageRouter }) => {
  const router = "/schedule/";
  const title = "Schedule";
  const listName = "scheduleList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(SCHEDULE_LIST_QUERY, {
    variables: {
      event_idx: parseInt(eventIdx, 10),
      offset: parseInt(offset, 10),
    },
  });

  const [mutationCreate] = useMutation(CREATE_SCHEDULE, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationUpdate] = useMutation(UPDATE_SCHEDULE, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_SCHEDULE, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      _refetchData();
    },
  });
  const _refetchData = () => {
    refetch().then((response) => {
      const list = response.data.schedulePaging[listName];
      if (data) {
        if (
          util.isEmpty(response.data.schedulePaging.totalCount) ||
          util.isEmpty(response.data.schedulePaging.limit)
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
          setLimit(response.data.schedulePaging.limit);
          setTotalCount(response.data.schedulePaging.totalCount);
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

    if (data && data.schedulePaging[listName]) {
      setRows(data.schedulePaging[listName]);
      setLimit(data.schedulePaging.limit);
      setTotalCount(data.schedulePaging.totalCount);
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
      `Schedule에 포함된
[ schedule, session, presentation, session_people, presentation_lang ] 들의 정보들이 같이 삭제되며 복구할 수 없습니다.

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
        <ScheduleInput
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
          prentIdx={[eventIdx]}
        />
    </>
  );
};

export default ScheduleList;
