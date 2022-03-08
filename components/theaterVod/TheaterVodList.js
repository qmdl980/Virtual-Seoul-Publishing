import React, { useState, useEffect } from "react";
import "moment-timezone";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import TheaterVodInput from "./TheaterVodInput";
import TableList from "../common/table/TableList";

export const THEATER_VOD_LIST_QUERY = gql`
  query theaterVodList($theater_idx: Int) {
    theaterVodList(theater_idx: $theater_idx) {
      idx
      theater_idx
      title
      cover_url
      vod_url
      summary
      sort_order
      theater {
        idx
        category_name
      }
    }
  }
`;
export const THEATER_VOD_QUERY = gql`
  query theaterVod($idx: Int!) {
    theaterVod(idx: $idx) {
      idx
      theater_idx
      title
      cover_url
      vod_url
      summary
      sort_order
      theater {
        idx
        category_name
      }
    }
  }
`;
export const CREATE_THEATER_VOD = gql`
  mutation createTheaterVod($input: theaterVodInput) {
    createTheaterVod(input: $input) {
      idx
    }
  }
`;
export const UPDATE_THEATER_VOD = gql`
  mutation updateTheaterVod($input: theaterVodInput) {
    updateTheaterVod(input: $input) {
      idx
    }
  }
`;
export const DELETE_THEATER_VOD = gql`
  mutation deleteTheaterVod($idx: ID!) {
    deleteTheaterVod(idx: $idx) {
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
    value: ["theater_idx"],
  },
  {
    label: "theater.category_name",
    field: "theater.category_name",
    type: "referer",
    origin: "theater_idx",
    router: "/theater",
    readonly: true,
  },
  {
    label: "title",
    field: "title",
    type: "link",
    linkField: "idx",
    required: true,
  },
  {
    label: "vod_url",
    field: "vod_url",
    type: "url",
    align: "left",
    auto_button: true,
    auto_button_name: "커버 자동 생성",
  },
  {
    label: "cover_url",
    field: "cover_url",
    type: "url",
    align: "left",
    placeholder: "URL 자동 생성시 vod_url을 입력 하면 자동으로 작성 됩니다.",
  },
  {
    label: "summary",
    field: "summary",
    type: "textarea",
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

export const theaterVodInput = {
  idx: { type: "int" },
  theater_idx: { type: "int" },
  title: "",
  cover_url: "",
  vod_url: "",
  summary: "",
  sort_order: { type: "int" },
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
};

const TheaterVodList = ({ theaterIdx, theaterTitle, pageRouter }) => {
  const router = "/theaterVod/";
  const title = "TheaterVod";
  const listName = "theaterVodList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const { loading, error, data, refetch } = useQuery(THEATER_VOD_LIST_QUERY, {
    variables: { theater_idx: parseInt(theaterIdx, 10) },
  });

  const [mutationCreate] = useMutation(CREATE_THEATER_VOD, {
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
  const [mutationUpdate] = useMutation(UPDATE_THEATER_VOD, {
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
  const [mutationDelete] = useMutation(DELETE_THEATER_VOD, {
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
    Object.keys(theaterVodInput).map((key, index) => {
      const meta = theaterVodInput[key];
      console.log("key::", key);
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
      `Theater Vod에 포함된
정보들이 삭제되며 복구할 수 없습니다.

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
        <TheaterVodInput
          columns={columns}
          form={form}
          setForm={setForm}
          _save={_save}
          openEditor={openEditor}
          setOpenEditor={setOpenEditor}
          theaterTitle={theaterTitle}
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
          prentIdx={[theaterIdx]}
        />
    </>
  );
};

export default React.memo(TheaterVodList);
