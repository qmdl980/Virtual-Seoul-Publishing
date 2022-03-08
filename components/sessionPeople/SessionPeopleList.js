import React, { useState, useEffect } from "react";
import "moment-timezone";
import moment from "moment";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import SessionPeopleInput from "./SessionPeopleInput";
import TableList from "../common/table/TableList";

export const SESSION_PEOPLE_LIST_QUERY = gql`
  query sessionPeoplePaging(
    $event_idx: Int
    $session_idx: Int
    $people_idx: Int
    $offset: Int
  ) {
    sessionPeoplePaging(
      event_idx: $event_idx
      session_idx: $session_idx
      people_idx: $people_idx
      offset: $offset
    ) {
      totalCount
      limit
      offset
      sessionPeopleList {
        idx
        session_idx
        people_idx
        role
        session {
          idx
          title
        }
        people {
          idx
          name
        }
      }
    }
  }
`;

export const SESSION_PEOPLE_QUERY = gql`
  query sessionPeople($idx: Int!) {
    sessionPeople(idx: $idx) {
      idx
      session_idx
      people_idx
      role
      session {
        idx
        title
      }
      people {
        idx
        name
      }
    }
  }
`;

export const CREATE_SESSION_PEOPLE = gql`
  mutation createSessionPeople($input: sessionPeopleInput) {
    createSessionPeople(input: $input) {
      idx
      session_idx
      people_idx
      role
    }
  }
`;

export const UPDATE_SESSION_PEOPLE = gql`
  mutation updateSessionPeople($input: sessionPeopleInput) {
    updateSessionPeople(input: $input) {
      idx
      session_idx
      people_idx
      role
    }
  }
`;

export const DELETE_SESSION_PEOPLE = gql`
  mutation deleteSessionPeople($idx: ID!) {
    deleteSessionPeople(idx: $idx) {
      idx
      session_idx
      people_idx
      role
    }
  }
`;

export const columns = [
  {
    label: "idx",
    field: "idx",
    type: "link",
    linkField: "idx",
    readonly: true,
    width: "100px",
  },
  {
    label: "prent_idx",
    field: "prent_idx",
    type: "hidden",
    value: ["session_idx","people_idx"],
  },
  {
    label: "session.title",
    field: "session.title",
    origin: "session_idx",
    type: "referer",
    refererNum: "1",
    router: "/session",
    required: true,
  },
  {
    label: "Invited Speaker",
    field: "people.name",
    origin: "people_idx",
    router: "/people",
    type: "referer",
    refererNum: "2",
    required: true,
  },
  {
    label: "role",
    field: "role",
    type: "select",
    selectList: [
      { label: "moderator", code: "moderator" },
      { label: "first_author", code: "first_author" },
      { label: "co_author", code: "co_author" },
    ],
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
export const session_peopleInput = {
  idx: { type: "int" },
  session_idx: { type: "int" },
  people_idx: { type: "int" },
  role: "",
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const SessionPeopleList = ({ eventIdx, peopleIdx, sessionIdx, pageRouter }) => {
  // console.log("sessionIdx", sessionIdx);

  const router = "/sessionPeople/";
  const title = "Speaker Role";
  const listName = "sessionPeopleList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(
    SESSION_PEOPLE_LIST_QUERY,
    {
      variables: {
        event_idx: parseInt(eventIdx, 10),
        session_idx: parseInt(sessionIdx, 10),
        people_idx: parseInt(peopleIdx, 10),
        offset: parseInt(offset, 10),
      },
    }
  );

  const [mutationCreate] = useMutation(CREATE_SESSION_PEOPLE, {
    onError: (error) => {
      console.log("mutationCreate error!", error);
    },
    onCompleted: (data) => {
      console.log("mutationCreate data ::", data);
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_SESSION_PEOPLE, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      console.log("updatePco data ::", data);
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_SESSION_PEOPLE, {
    onError: (error) => {
      console.log("mutationDelete error!", error);
      window.alert(error);
      return;
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
      const list = response.data.sessionPeoplePaging[listName] || [];
      if (data) {
        if (
          util.isEmpty(response.data.sessionPeoplePaging.totalCount) ||
          util.isEmpty(response.data.sessionPeoplePaging.limit)
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
          setLimit(response.data.sessionPeoplePaging.limit);
          setTotalCount(response.data.sessionPeoplePaging.totalCount);
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

    if (data && data.sessionPeoplePaging[listName]) {
      setRows(data.sessionPeoplePaging[listName] || []);
      setLimit(data.sessionPeoplePaging.limit);
      setTotalCount(data.sessionPeoplePaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("form ::", form);
    console.log("_save call.");

    const input = {};
    Object.keys(session_peopleInput).map((key, index) => {
      const meta = session_peopleInput[key];
      if (meta.type && meta.type === "int") {
        input[key] = parseInt(form[key], 10);
      } else if (meta.type && meta.type === "date") {
        input[key] = moment(form[key]).format("YYYYMMDD");
      } else {
        input[key] = form[key];
      }
    });

    if (util.isEmpty(form.idx)) {
      console.log("input ::", input);
      mutationCreate({ variables: { input } });
    } else {
      console.log("input ::", input);
      mutationUpdate({ variables: { input } });
    }
  };

  // + callback override
  callback.delete = async (row) => {
    console.log("row ::", row);
    const confirm = window.confirm(
      `Session People에 포함된 정보들이 같이 삭제되며 복구할 수 없습니다.
                        
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
        <SessionPeopleInput
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

export default SessionPeopleList;
