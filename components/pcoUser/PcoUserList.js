import React, { useState, useEffect } from "react";
import ReactMoment from "react-moment";
import "moment-timezone";
import util from "../../utils/util";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import PcoUserInput from "./PcoUserInput";
import TableList from "../common/table/TableList";

export const PCO_USER_LIST_QUERY = gql`
  query pcoUserPaging($pco_idx: Int, $offset: Int) {
    pcoUserPaging(pco_idx: $pco_idx, offset: $offset) {
      totalCount
      limit
      offset
      pcoUserList {
        idx
        pco_idx
        name
        email
        password
        created_at
        active_yn
        pco {
          idx
          name
          summary
          active_yn
          created_at
        }
      }
    }
  }
`;
export const PCO_USER_QUERY = gql`
  query pcoUser($idx: Int!) {
    pcoUser(idx: $idx) {
      idx
      pco_idx
      name
      email
      password
      created_at
      active_yn
      pco {
        idx
        name
      }
    }
  }
`;
export const CREATE_PCO_USER = gql`
  mutation createPcoUser($input: pcoUserInput) {
    createPcoUser(input: $input) {
      idx
      pco_idx
      name
      email
      password
      created_at
      active_yn
    }
  }
`;
export const UPDATE_PCO_USER = gql`
  mutation updatePcoUser($input: pcoUserInput) {
    updatePcoUser(input: $input) {
      idx
      pco_idx
      name
      email
      password
      created_at
      active_yn
    }
  }
`;
export const DELETE_PCO_USER = gql`
  mutation deletePcoUser($idx: ID!) {
    deletePcoUser(idx: $idx) {
      idx
      pco_idx
      name
      email
      password
      created_at
      active_yn
    }
  }
`;

export const FORMAT_PCO_USER_PASSWORD = gql`
  mutation formatPcoUserPassword($input: pcoUserFormayPassword) {
    formatPcoUserPassword(input: $input) {
      idx
      email
    }
  }
`;
export const columns = [
  { label: "idx", field: "idx", readonly: true },
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
    router: "/pco",
  },
  {
    label: "name",
    field: "name",
    required: true,
    type: "link",
    linkField: "idx",
  },
  { label: "email", field: "email", type: "email", required: true },
  {
    label: "active_yn",
    field: "active_yn",
    type: "checkbox",
    defaultValue: "Y",
  },
  {
    label: "created_at",
    field: "created_at",
    type: "datetime",
    readonly: true,
  },
  {
    label: "비밀번호 초기화",
    field: "_1", // button prefix is '_' and field is unique
    type: "button",
    callback: (row) => {
      callback.resetPass(row);
    },
  },
  {
    label: "delete",
    field: "_2",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];
export const pcoUserInput = {
  idx: { type: "int" },
  pco_idx: { type: "int" },
  name: "",
  email: "",
  password: "",
  created_at: "",
  active_yn: "",
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const PcoUserList = ({ pcoIdx, pageRouter }) => {
  const router = "/pcoUser/";
  const title = "PCO User";
  const listName = "pcoUserList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(PCO_USER_LIST_QUERY, {
    variables: { pco_idx: parseInt(pcoIdx, 10), offset: parseInt(offset, 10) },
  });

  const [mutationCreate] = useMutation(CREATE_PCO_USER, {
    onError: (error) => {
      console.log("mutationCreate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_PCO_USER, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_PCO_USER, {
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
  
  const [formatPassword] = useMutation(FORMAT_PCO_USER_PASSWORD, {
    onError: (error) => {
      console.log("formatPassword error!", error);
      window.alert(error);
      return;
    },
    onCompleted: (data) => {
      window.alert("비밀번호가 초기화 되었습니다.");
      _refetchData();
    },
  });

  const _refetchData = () => {
    refetch().then((response) => {
      const list = response.data.pcoUserPaging[listName];
      if (data) {
        if (
          util.isEmpty(response.data.pcoUserPaging.totalCount) ||
          util.isEmpty(response.data.pcoUserPaging.limit)
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
          setLimit(response.data.pcoUserPaging.limit);
          setTotalCount(response.data.pcoUserPaging.totalCount);
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

  const _read = () => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    const cols = columns.filter((col, index) => {
      return col.field !== undefined;
    });
    setColomnLength(cols);

    if (data && data.pcoUserPaging[listName]) {
      setRows(data.pcoUserPaging[listName]);
      setLimit(data.pcoUserPaging.limit);
      setTotalCount(data.pcoUserPaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("_save call.");

    const input = {};
    Object.keys(pcoUserInput).map((key, index) => {
      const meta = pcoUserInput[key];
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
    const confirm = window.confirm("Delete ?");
    if (confirm) {
      mutationDelete({ variables: { idx: row.idx } });
    }
  };
  callback.resetPass = async (row) => {
    const confirm = window.confirm("Reset Password ?");
    if (confirm) {
      const payload = {};

      payload.idx = row.idx;
      payload.email = row.email;

      await formatPassword({ variables: { input: payload}});

    }
  };
  // - callback override

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  return (
    <>
      {openEditor && (
        <PcoUserInput
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
        prentIdx={[pcoIdx]}
      />
    </>
  );
};

export default PcoUserList;
