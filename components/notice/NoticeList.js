import React, { useState, useEffect } from "react";
import "moment-timezone";
import moment from "moment";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import NoticeInput from "./NoticeInput";
import TableList from "../common/table/TableList";

export const NOTICE_LIST_QUERY = gql`
  query noticePaging($event_idx: Int, $offset: Int) {
    noticePaging(event_idx: $event_idx, offset: $offset) {
      totalCount
      limit
      offset
      noticeList {
        idx
        event_idx
        title
        contents
        created_at
        event {
          idx
          title
        }
      }
    }
  }
`;

export const NOTICE_QUERY = gql`
  query notice($idx: Int!) {
    notice(idx: $idx) {
      idx
      event_idx
      title
      contents
      created_at
      event {
        idx
        title
      }
    }
  }
`;

export const CREATE_NOTICE = gql`
  mutation createNotice($input: noticeInput) {
    createNotice(input: $input) {
      idx
      event_idx
      title
      contents
      created_at
    }
  }
`;

export const UPDATE_NOTICE = gql`
  mutation updateNotice($input: noticeInput) {
    updateNotice(input: $input) {
      idx
      event_idx
      title
      contents
      created_at
    }
  }
`;

export const DELETE_NOTICE = gql`
  mutation deleteNotice($idx: ID!) {
    deleteNotice(idx: $idx) {
      idx
      event_idx
      title
      contents
      created_at
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
    label: "title",
    field: "title",
    type: "link",
    linkField: "idx",
    required: true,
  },
  { label: "contents", field: "contents", type: "textarea" },
  {
    label: "created_at",
    field: "created_at",
    readonly: true,
    type: "datetime",
  },
  {
    label: "delete",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];
export const noticeInput = {
  idx: { type: "int" },
  event_idx: { type: "int" },
  title: "",
  contents: "",
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const NoticeList = ({ eventIdx, pageRouter, eventTitle }) => {
  const router = "/notice/";
  const title = "Notice";
  const listName = "noticeList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(NOTICE_LIST_QUERY, {
    variables: {
      event_idx: parseInt(eventIdx, 10),
      offset: parseInt(offset, 10),
    },
  });

  const [mutationCreate] = useMutation(CREATE_NOTICE, {
    onError: (error) => {
      console.log("mutationCreate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_NOTICE, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_NOTICE, {
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
      const list = response.data.noticePaging[listName];
      if (data) {
        if (
          util.isEmpty(response.data.noticePaging.totalCount) ||
          util.isEmpty(response.data.noticePaging.limit)
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
          setLimit(response.data.noticePaging.limit);
          setTotalCount(response.data.noticePaging.totalCount);
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

    console.log("noticeData ::", data);
    if (data && data.noticePaging[listName]) {
      setRows(data.noticePaging[listName]);
      setLimit(data.noticePaging.limit);
      setTotalCount(data.noticePaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("_save call.");

    const input = {};
    Object.keys(noticeInput).map((key, index) => {
      const meta = noticeInput[key];
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
      `Notice 포함된
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
        <NoticeInput
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

export default NoticeList;
