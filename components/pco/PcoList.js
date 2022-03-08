import React, { useState, useEffect } from "react";
import ReactMoment from "react-moment";
import "moment-timezone";
import util from "../../utils/util";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import PcoInput from "./PcoInput";
// import PcoDetail from "../../components/common/table/DetailTable";
import TableList from "../common/table/TableList";

export const PCO_LIST_QUERY = gql`
  query pcoPaging($offset: Int) {
    pcoPaging(offset: $offset) {
      totalCount
      limit
      offset
      pcoList {
        idx
        name
        email
        company
        summary
        active_yn
        created_at
        event {
          code
          title
          start_date
          end_date
          domain
          type
        }
      }
    }
  }
`;
export const PCO_QUERY = gql`
  query pco($idx: Int!) {
    pco(idx: $idx) {
      idx
      name
      email
      password
      company
      summary
      active_yn
      created_at
      event {
        code
        title
        start_date
        end_date
        domain
        type
      }
    }
  }
`;
export const CREATE_PCO = gql`
  mutation createPco($input: pcoInput) {
    createPco(input: $input) {
      idx
    }
  }
`;
export const UPDATE_PCO = gql`
  mutation updatePco($input: pcoInput) {
    updatePco(input: $input) {
      idx
    }
  }
`;
export const DELETE_PCO = gql`
  mutation deletePco($idx: ID!) {
    deletePco(idx: $idx) {
      idx
    }
  }
`;
export const FORMAT_PCO_PASSWORD = gql`
  mutation formatPcoPassword($input: pcoFormayPassword) {
    formatPcoPassword(input: $input) {
      idx
      email
    }
  }
`;
export const columns = [
  { label: "idx", field: "idx", readonly: true },
  {
    label: "event-code",
    field: "event.code",
    type: "referer",
    readonly: true,
    editonly: true,
  },
  {
    label: "event-domain",
    field: "event.domain",
    type: "referer",
    readonly: true,
    editonly: true,
  },
  {
    label: "event-type",
    field: "event.type",
    type: "referer",
    readonly: true,
    editonly: true,
  },
  {
    label: "event-title",
    field: "event.title",
    type: "referer",
    readonly: true,
  },
  {
    label: "name",
    field: "name",
  },
  { label: "email", field: "email" },
  { label: "company", field: "company" },
  { label: "summary", field: "summary", type: "textarea" },
  {
    label: "active_yn",
    field: "active_yn",
    type: "checkbox",
    defaultValue: "N",
  },
  {
    label: "비밀번호 초기화",
    field: "_1",
    type: "button",
    callback: (row) => {
      callback.resetPass(row);
    },
  },
  {
    label: "created_at",
    field: "created_at",
    readonly: true,
    type: "datetime",
  },
  {
    label: "edit",
    type: "button",
    callback: (row) => {
      callback.edit(row);
    },
  },
  {
    label: "delete",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];

export const pcoInput = {
  idx: { type: "int" },
  name: "",
  email: "",
  company: "",
  summary: "",
  active_yn: "",
};
// component 내부에서 재정의함.
export const callback = {
  resetPass: () => {},
  edit: () => {},
  delete: () => {},
};

const PcoUserList = ({ pcoIdx, pageRouter }) => {
  const router = "/pco/";
  const title = "계정관리";
  const listName = "pcoList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  // const [openDetail, setOpenDetail] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(PCO_LIST_QUERY, {
    variables: { pco_idx: parseInt(pcoIdx, 10), offset: parseInt(offset, 10) },
  });

  const [mutationCreate] = useMutation(CREATE_PCO, {
    onError: (error) => {
      console.log("mutationCreate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_PCO, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_PCO, {
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
  const [formatPassword] = useMutation(FORMAT_PCO_PASSWORD, {
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
      const list = response.data.pcoPaging[listName];
      console.log("list ::", list);
      if (data) {
        if (
          util.isEmpty(response.data.pcoPaging.totalCount) ||
          util.isEmpty(response.data.pcoPaging.limit)
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
          setLimit(response.data.pcoPaging.limit);
          setTotalCount(response.data.pcoPaging.totalCount);
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

    if (data && data.pcoPaging[listName]) {
      setRows(data.pcoPaging[listName]);
      setLimit(data.pcoPaging.limit);
      setTotalCount(data.pcoPaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("_save call.");

    const input = {};
    Object.keys(pcoInput).map((key, index) => {
      const meta = pcoInput[key];
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

  callback.resetPass = async (row) => {
    const confirm = window.confirm("Reset Password ?");
    if (confirm) {
      const payload = {};

      payload.idx = row.idx;
      payload.email = row.email;
      payload.event_idx = row.event.idx;

      await formatPassword({ variables: { input: payload } });
    }
  };

  callback.delete = async (row) => {
    const confirm = window.confirm(
      `Pco에 포함된
[ pcoUser, event, event_setting, brochure, schedule, tour_vod, user, session, people, presentation, session_people, presentation_lang, people_lang ] 들의 정보들이 같이 삭제되며 복구할 수 없습니다.
                        
그래도 삭제를 하시겠습니까?
                              `
    );
    if (confirm) {
      mutationDelete({ variables: { idx: row.idx } });
    }
  };

  callback.edit = async (row) => {
    // window.location.href = `${pageRouter + router + row.idx}`;
    console.log("row ::", row);
    setForm(row);
    setOpenEditor(true);
  };

  // - callback override

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  return (
    <>
      {openEditor && (
        <PcoInput
          columns={columns}
          form={form}
          setForm={setForm}
          _save={_save}
          openEditor={openEditor}
          setOpenEditor={setOpenEditor}
          title={title}
        />
      )}
      <TableList
        rows={rows}
        pageRouter={pageRouter}
        columns={columns}
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
      {/* {openDetail && (
        <PcoDetail
          columns={columns}
          form={form}
          setForm={setForm}
          _save={_save}
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
          title={title}
          columns={columns}
        />
      )} */}
    </>
  );
};

export default PcoUserList;
