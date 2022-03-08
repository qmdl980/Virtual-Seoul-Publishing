import React, { useState, useEffect } from "react";
import "moment-timezone";
import moment from "moment";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import PresentationInput from "./PresentationInput";
import TableList from "../common/table/TableList";

export const PRESENTATION_LIST_QUERY = gql`
  query presentationPaging(
    $event_idx: Int
    $session_idx: Int
    $people_idx: Int
    $offset: Int
  ) {
    presentationPaging(
      event_idx: $event_idx
      session_idx: $session_idx
      people_idx: $people_idx
      offset: $offset
    ) {
      totalCount
      limit
      offset
      presentationList {
        idx
        session_idx
        speaker_idx
        code
        open_time
        close_time
        sort_order
        title
        abstract
        action_type
        action_url
        cover_url
        session {
          idx
          title
        }
        speaker {
          idx
          name
        }
      }
    }
  }
`;

export const PRESENTATION_QUERY = gql`
  query presentation($idx: Int!) {
    presentation(idx: $idx) {
      idx
      session_idx
      speaker_idx
      code
      open_time
      close_time
      sort_order
      title
      abstract
      action_type
      action_url
      cover_url
      session {
        idx
        title
      }
      speaker {
        idx
        name
      }
    }
  }
`;

export const CREATE_PRESENTATION = gql`
  mutation createPresentation($input: presentationInput) {
    createPresentation(input: $input) {
      idx
      session_idx
      speaker_idx
      code
      open_time
      close_time
      sort_order
      title
      abstract
      action_type
      action_url
      cover_url
    }
  }
`;

export const UPDATE_PRESENTATION = gql`
  mutation updatePresentation($input: presentationInput) {
    updatePresentation(input: $input) {
      idx
      session_idx
      speaker_idx
      code
      open_time
      close_time
      sort_order
      title
      abstract
      action_type
      action_url
      cover_url
    }
  }
`;

export const DELETE_PRESENTATION = gql`
  mutation deletePresentation($idx: ID!) {
    deletePresentation(idx: $idx) {
      idx
      session_idx
      speaker_idx
      code
      open_time
      close_time
      sort_order
      title
      abstract
      action_type
      action_url
      cover_url
    }
  }
`;
export const columns = [
  { label: "idx", field: "idx", readonly: true, width: "100px" },
  {
    label: "prent_idx",
    field: "prent_idx",
    type: "hidden",
    value: ["session_idx","speaker_idx"],
  },
  {
    label: "session.title",
    field: "session.title",
    type: "referer",
    refererNum: "1",
    origin: "session_idx",
    router: "/session",
    required: true,
  },
  {
    label: "Invited Speaker",
    field: "speaker.name",
    type: "referer",
    refererNum: "2",
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
  { label: "code", field: "code" },
  { label: "open_time", field: "open_time", type: "time" },
  { label: "close_time", field: "close_time", type: "time" },
  { label: "sort_order", field: "sort_order" },
  { label: "abstract", field: "abstract", type: "textarea", align: "left" },
  { label: "cover_url", field: "cover_url", type: "url", align: "left" },
  {
    label: "action_type",
    field: "action_type",
    type: "select",
    selectList: [
      { label: "live", code: "live" },
      { label: "vod", code: "vod" },
    ],
    required: true,
  },
  { label: "action_url", field: "action_url", type: "url", align: "left" },

  {
    label: "delete",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];

export const presentationInput = {
  idx: { type: "int" },
  session_idx: { type: "int" },
  speaker_idx: { type: "int" },
  code: "",
  open_time: { type: "datetime" },
  close_time: { type: "datetime" },
  sort_order: { type: "int" },
  title: "",
  abstract: "",
  action_type: "",
  action_url: "",
  cover_url: "",
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const PresentationList = ({ eventIdx, peopleIdx, sessionIdx, pageRouter }) => {
  const router = "/presentation/";
  const title = "Presentation";
  const listName = "presentationList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(PRESENTATION_LIST_QUERY, {
    variables: {
      event_idx: parseInt(eventIdx, 10),
      session_idx: parseInt(sessionIdx, 10),
      people_idx: parseInt(peopleIdx, 10),
      offset: parseInt(offset, 10),
    },
  });

  const [mutationCreate] = useMutation(CREATE_PRESENTATION, {
    onError: (error) => {
      console.log("mutationCreate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_PRESENTATION, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_PRESENTATION, {
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
      const list = response.data.presentationPaging[listName];
      if (data) {
        if (
          util.isEmpty(response.data.presentationPaging.totalCount) ||
          util.isEmpty(response.data.presentationPaging.limit)
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
          setLimit(response.data.presentationPaging.limit);
          setTotalCount(response.data.presentationPaging.totalCount);
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

    if (data && data.presentationPaging[listName]) {
      setRows(data.presentationPaging[listName]);
      setLimit(data.presentationPaging.limit);
      setTotalCount(data.presentationPaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("_save call.");

    const input = {};
    Object.keys(presentationInput).map((key, index) => {
      const meta = presentationInput[key];
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
      `Presentation에 포함된
[ presentation, presentation_lang ] 들의 정보들이 같이 삭제되며 복구할 수 없습니다.
                  
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
        <PresentationInput
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
          prentIdx={[sessionIdx,peopleIdx]}
        />
    </>
  );
};

export default PresentationList;
