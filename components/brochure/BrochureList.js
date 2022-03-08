import React, { useState, useEffect } from "react";
import "moment-timezone";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import BrochureInput from "./BrochureInput";
import TableList from "../common/table/TableList";

export const BROCHURE_LIST_QUERY = gql`
  query brochureList($event_idx: Int!) {
    brochureList(event_idx: $event_idx) {
      idx
      event_idx
      cover_url
      download_url
      sort_order
      event {
        idx
        title
      }
    }
  }
`;
export const BROCHURE_QUERY = gql`
  query brochure($idx: Int!) {
    brochure(idx: $idx) {
      idx
      event_idx
      cover_url
      download_url
      sort_order
    }
  }
`;
export const CREATE_BROCHURE = gql`
  mutation createBrochure($input: brochureInput) {
    createBrochure(input: $input) {
      idx
    }
  }
`;
export const UPDATE_BROCHURE = gql`
  mutation updateBrochure($input: brochureInput) {
    updateBrochure(input: $input) {
      idx
    }
  }
`;
export const DELETE_BROCHURE = gql`
  mutation deleteBrochure($idx: ID!) {
    deleteBrochure(idx: $idx) {
      idx
    }
  }
`;
export const columns = [
  { label: "idx", field: "idx", readonly: true, width: "100px" },
  { label: "event_idx", field: "event_idx", type: "hidden" },
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
    label: "cover_url",
    field: "cover_url",
    type: "url",
    required: true,
    align: "left",
  },
  {
    label: "download_url",
    field: "download_url",
    type: "url",
    required: true,
    align: "left",
  },
  { label: "sort_order", field: "sort_order", type: "number", required: true },
  {
    label: "delete",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];

export const brochureInput = {
  idx: { type: "int" },
  event_idx: { type: "int" },
  cover_url: "",
  download_url: "",
  sort_order: { type: "int" },
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
};

const BrochureList = ({ eventIdx, eventTitle, pageRouter }) => {
  const router = "brochure";
  const title = "Brochure";
  const listName = "brochureList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const { loading, error, data, refetch } = useQuery(BROCHURE_LIST_QUERY, {
    variables: { event_idx: parseInt(eventIdx, 10) },
  });

  const [mutationCreate] = useMutation(CREATE_BROCHURE, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_BROCHURE, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      setOpenEditor(false);
      if (hasError) return;
    },
    onCompleted: (data) => {
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_BROCHURE, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
      if (hasError) return;
    },
    onCompleted: (data) => {
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const _refetchData = () => {
    refetch().then((response) => {
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
    const input = {};
    Object.keys(brochureInput).map((key, index) => {
      const meta = brochureInput[key];
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
    const confirm = window.confirm(
      `Brochure에 포함된
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
        <BrochureInput
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

export default React.memo(BrochureList);
