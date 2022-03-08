import React, { useState, useEffect } from "react";
import "moment-timezone";
import moment from "moment";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import LiveReplayInput from "./LiveReplayInput";
import TableList from "../common/table/TableList";

export const LIVE_REPLAY_LIST_QUERY = gql`
  query liveReplayPaging($event_idx: Int, $offset: Int) {
    liveReplayPaging(event_idx: $event_idx, offset: $offset) {
      totalCount
      limit
      offset
      liveReplayList {
        idx
        event_idx
        speaker_idx
        title
        type
        action_url
        sort_order
        speaker {
          idx
          name
          email
        }
        event {
          idx
          title
        }
      }
    }
  }
`;

export const LIVE_REPLAY_QUERY = gql`
  query liveReplay($idx: Int!) {
    liveReplay(idx: $idx) {
      idx
      event_idx
      speaker_idx
      title
      type
      action_url
      sort_order
      speaker {
        idx
        name
        email
      }
      event {
        idx
        title
      }
    }
  }
`;

export const CREATE_LIVE_REPLAY = gql`
  mutation createLiveReplay($input: liveReplayInput) {
    createLiveReplay(input: $input) {
      idx
      event_idx
      speaker_idx
      title
      type
      action_url
      sort_order
    }
  }
`;

export const UPDATE_LIVE_REPLAY = gql`
  mutation updateLiveReplay($input: liveReplayInput) {
    updateLiveReplay(input: $input) {
      idx
      event_idx
      speaker_idx
      title
      type
      action_url
      sort_order
    }
  }
`;

export const DELETE_LIVE_REPLAY = gql`
  mutation deleteLiveReplay($idx: ID!) {
    deleteLiveReplay(idx: $idx) {
      idx
      event_idx
      speaker_idx
      title
      type
      action_url
      sort_order
    }
  }
`;

export const columns = [
  { label: "idx", field: "idx", readonly: true, width: "100px" },
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
    readonly: true,
  },
  {
    label: "speaker.name",
    field: "speaker.name",
    type: "referer",
    origin: "speaker_idx",
    router: "/people",
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
    label: "action_url",
    field: "action_url",
    type: "url",
    align: "left",
    required: true,
  },
  {
    label: "sort_order",
    field: "sort_order",
    required: true,
  },
  {
    label: "delete",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];
export const liveReplayInput = {
  idx: { type: "int" },
  event_idx: { type: "int" },
  speaker_idx: { type: "int" },
  title: "",
  action_url: "",
  sort_order: { type: "int" },
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const LivePlayList = ({ eventIdx, pageRouter, eventTitle }) => {
  const router = "/liveReplay/";
  const title = "Live Replay";
  const listName = "liveReplayList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(LIVE_REPLAY_LIST_QUERY, {
    variables: {
      event_idx: parseInt(eventIdx, 10),
      offset: parseInt(offset, 10),
    },
  });

  const [mutationCreate] = useMutation(CREATE_LIVE_REPLAY, {
    onError: (error) => {
      console.log("mutationCreate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_LIVE_REPLAY, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_LIVE_REPLAY, {
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
      const list = response.data.liveReplayPaging[listName];
      if (data) {
        if (
          util.isEmpty(response.data.liveReplayPaging.totalCount) ||
          util.isEmpty(response.data.liveReplayPaging.limit)
        ) {
          if (offset > 1) {
            setOffset(offset - limit);
            _refetchData();
          } else {
            setRows(list || []);
            setOffset(offset);
          }
        } else {
          setRows(list || []);
          setLimit(response.data.liveReplayPaging.limit);
          setTotalCount(response.data.liveReplayPaging.totalCount);
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

    console.log("liveReplayData ::", data);
    if (data && data.liveReplayPaging[listName]) {
      setRows(data.liveReplayPaging[listName]);
      setLimit(data.liveReplayPaging.limit);
      setTotalCount(data.liveReplayPaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("_save call.");

    const input = {};
    Object.keys(liveReplayInput).map((key, index) => {
      const meta = liveReplayInput[key];
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
      `LiveReplay에 포함된
정보들이 같이 삭제되며 복구할 수 없습니다.
            
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
        <LiveReplayInput
          eventIdx={eventIdx}
          columns={columns}
          form={form}
          setForm={setForm}
          _save={_save}
          openEditor={openEditor}
          setOpenEditor={setOpenEditor}
          eventTitle={eventTitle}
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

export default LivePlayList;
