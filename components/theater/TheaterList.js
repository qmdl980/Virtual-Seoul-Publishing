import React, { useState, useEffect } from "react";
import "moment-timezone";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import TheaterInput from "./TheaterInput";
import TableList from "../common/table/TableList";

export const THEATER_LIST_QUERY = gql`
  query theaterList($event_idx: Int!) {
    theaterList(event_idx: $event_idx) {
      idx
      event_idx
      category_name
      cover_url
      sort_order
      event {
        idx
        title
      }
    }
  }
`;
export const THEATER_QUERY = gql`
  query theater($idx: Int!) {
    theater(idx: $idx) {
      idx
      event_idx
      category_name
      cover_url
      sort_order
      event {
        idx
        title
      }
    }
  }
`;
export const CREATE_THEATER = gql`
  mutation createTheater($input: theaterInput) {
    createTheater(input: $input) {
      idx
    }
  }
`;
export const UPDATE_THEATER = gql`
  mutation updateTheater($input: theaterInput) {
    updateTheater(input: $input) {
      idx
    }
  }
`;
export const DELETE_THEATER = gql`
  mutation deleteTheater($idx: ID!) {
    deleteTheater(idx: $idx) {
      idx
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
    label: "category_name",
    field: "category_name",
    type: "link",
    linkField: "idx",
    required: true,
  },
  {
    label: "cover_url",
    field: "cover_url",
    type: "url",
    required: true,
    align: "left",
  },
  { label: "sort_order", field: "sort_order", type: "number", required: true },
  {
    label: "delete",
    type: "button",
    callback: (row) => {
      console.log("row ::", row);
      callback.delete(row);
    },
  },
];

export const theaterInput = {
  idx: { type: "int" },
  event_idx: { type: "int" },
  category_name: "",
  cover_url: "",
  sort_order: { type: "int" },
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
};

const TheaterList = ({ eventIdx, eventTitle, pageRouter }) => {
  const router = "/theater/";
  const title = "Theater";
  const listName = "theaterList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const { loading, error, data, refetch } = useQuery(THEATER_LIST_QUERY, {
    variables: { event_idx: parseInt(eventIdx, 10) },
  });

  const [mutationCreate] = useMutation(CREATE_THEATER, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      console.log("mutationCreate data ::", data);
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_THEATER, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      console.log("updatePco data ::", data);
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_THEATER, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      console.log("mutationDelete data ::", data);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const _refetchData = () => {
    refetch().then((response) => {
      console.log("refetch response ::", response);
      const list = response.data[listName];
      if (data) {
        setRows(list);
      }
    });
  };
  const setColomnLength = (cols) => {
    const t = cols.filter((col, index) => {
      return col.type !== "hidden";
    }).length;
    setColSpan(t);
  };

  const _read = () => {
    console.log("data ::", data);

    const hasError = util.hasGQLError(error);
    if (hasError) return;

    const cols = columns.filter((col, index) => {
      return col.field !== undefined;
    });
    setColomnLength(cols);

    if (data && data[listName]) {
      setRows(data[listName]);
    }
  };

  const _save = async (form) => {
    console.log("form ::", form);
    console.log("_save call.");

    const input = {};
    Object.keys(theaterInput).map((key, index) => {
      const meta = theaterInput[key];
      if (meta.type && meta.type === "int") {
        input[key] = parseInt(form[key], 10);
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
    console.log("row ::", row);
    const confirm = window.confirm(
      `Theater에 포함된
[ TheaterVod ]의 정보들도 같이 삭제되며 복구할 수 없습니다.

그래도 삭제 하시겠습니까?
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
        <TheaterInput
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
          prentIdx={[eventIdx]}
        />
    </>
  );
};

export default React.memo(TheaterList);
