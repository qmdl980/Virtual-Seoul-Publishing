import React, { useState, useEffect } from "react";
import "moment-timezone";
import moment from "moment";
import util from "../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import UserInput from "./UserInput";
import TableList from "../common/table/TableList";

export const USER_LIST_QUERY = gql`
  query userPaging($event_idx: Int, $offset: Int) {
    userPaging(event_idx: $event_idx, offset: $offset) {
      totalCount
      limit
      offset
      userList {
        idx
        event_idx
        name
        department
        title
        email
        mobile_no
        role
        lock_type
        event {
          idx
          title
        }
      }
    }
  }
`;

export const USER_QUERY = gql`
  query user($idx: Int!) {
    user(idx: $idx) {
      idx
      event_idx
      name
      department
      title
      email
      mobile_no
      role
      lock_type
      event {
        idx
        title
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: userInput) {
    createUser(input: $input) {
      idx
      event_idx
      name
      department
      title
      email
      mobile_no
      role
      lock_type
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($input: userInput) {
    updateUser(input: $input) {
      idx
      event_idx
      name
      department
      title
      email
      mobile_no
      role
      lock_type
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($idx: ID!) {
    deleteUser(idx: $idx) {
      idx
      event_idx
      name
      department
      title
      email
      mobile_no
      role
      lock_type
    }
  }
`;

export const FORMAT_USER_PASSWORD = gql`
  mutation formatUserPassword($input: userFormayPassword) {
    formatUserPassword(input: $input) {
      idx
      email
      event_idx
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
    required: true,
  },
  {
    label: "name",
    field: "name",
    type: "link",
    linkField: "idx",
    required: true,
  },
  { label: "department", field: "department" },
  { label: "title", field: "title" },
  { label: "email", field: "email", required: true, align: "left" },
  { label: "mobile_no", field: "mobile_no" },
  {
    label: "role",
    field: "role",
    type: "select",
    selectList: [
      { label: "staff", code: "staff" },
      { label: "user", code: "user" },
      // { label: "sponsor", code: "sponsor" },
      // { label: "admin", code: "admin" },
      // { label: "seller", code: "seller" },
      // { label: "buyer", code: "buyer" },
    ],
  },
  {
    label: "lock_type",
    field: "lock_type",
    type: "select",
    selectList: [
      { label: "로그인 가능", code: "N" },
      { label: "로그인 불가 - 행사 전", code: "B" },
      { label: "로그인 불가 - 행사 종료", code: "E" },
    ],
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
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];
export const userInput = {
  idx: { type: "int" },
  event_idx: { type: "int" },
  name: "",
  department: "",
  title: "",
  email: "",
  mobile_no: "",
  password: "",
  temp_password: "",
  role: "",
  lock_type: "",
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
};

const UserList = ({ eventIdx, pageRouter }) => {
  const router = "/user/";
  const title = "User";
  const listName = "userList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(USER_LIST_QUERY, {
    variables: {
      event_idx: parseInt(eventIdx, 10),
      offset: parseInt(offset, 10),
    },
  });

  const [mutationCreate] = useMutation(CREATE_USER, {
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
  const [mutationUpdate] = useMutation(UPDATE_USER, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      console.log("updatePco data ::", data);
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_USER, {
    onError: (error) => {
      console.log("mutationDelete error!", error);
      window.alert(error);
      return;
    },
    onCompleted: (data) => {
      console.log("mutationDelete data ::", data);
      _refetchData();
    },
  });

  const [formatPassword] = useMutation(FORMAT_USER_PASSWORD, {
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
      console.log("refetch response ::", response);
      const list = response.data.userPaging[listName] || [];
      if (data) {
        if (
          util.isEmpty(response.data.userPaging.totalCount) ||
          util.isEmpty(response.data.userPaging.limit)
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
          setLimit(response.data.userPaging.limit);
          setTotalCount(response.data.userPaging.totalCount);
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

    if (data && data.userPaging[listName]) {
      console.log("_read Data ::", data);
      setRows(data.userPaging[listName] || []);
      setLimit(data.userPaging.limit);
      setTotalCount(data.userPaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("form ::", form);
    console.log("_save call.");

    const input = {};
    Object.keys(userInput).map((key, index) => {
      const meta = userInput[key];
      if (meta.type && meta.type === "int") {
        input[key] = parseInt(form[key], 10);
      } else if (meta.type && meta.type === "date") {
        input[key] = moment(form[key]).format("YYYYMMDD");
      } else if (key === "role" && form[key] === "") {
        // defalt 값 주기
        input[key] = "user";
      } else if (key === "lock_type" && form[key] === "") {
        input[key] = "N";
      } else {
        input[key] = form[key];
      }
    });

    if (util.isEmpty(form.idx)) {
      console.log("input ::", input);
      mutationCreate({ variables: { input } });
    } else {
      mutationUpdate({ variables: { input } });
    }
  };

  // + callback override
  callback.delete = async (row) => {
    console.log("row ::", row);
    const confirm = window.confirm(
      `User에 포함된 정보들이 같이 삭제되며 복구할 수 없습니다.
            
그래도 삭제를 하시겠습니까?
                  `
    );
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
      payload.event_idx = row.event.idx;

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
        <UserInput
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

export default UserList;
