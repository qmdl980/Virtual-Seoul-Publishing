import React, { useState, useEffect } from "react";
import ReactMoment from "react-moment";
// import "moment-timezone";
// import moment from "moment";
import util from "../../utils/util";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import PeopleInput from "./PeopleInput";
import TableList from "../common/table/TableList";

export const PEOPLE_LIST_QUERY = gql`
  query peoplePaging($event_idx: Int, $offset: Int) {
    peoplePaging(event_idx: $event_idx, offset: $offset) {
      totalCount
      limit
      offset
      peopleList {
        idx
        event_idx
        code
        email
        photo_url
        name
        title
        department
        country
        biodata
        download_url
        event {
          idx
          title
        }
      }
    }
  }
`;

export const PEOPLE_QUERY = gql`
  query people($idx: Int!) {
    people(idx: $idx) {
      idx
      event_idx
      code
      email
      photo_url
      name
      title
      department
      country
      biodata
      download_url
      event {
        idx
        title
      }
    }
  }
`;

export const CREATE_PEOPLE = gql`
  mutation createPeople($input: peopleInput) {
    createPeople(input: $input) {
      idx
      code
      email
      photo_url
      name
      title
      department
      country
      biodata
      download_url
    }
  }
`;

export const UPDATE_PEOPLE = gql`
  mutation updatePeople($input: peopleInput) {
    updatePeople(input: $input) {
      idx
      code
      email
      photo_url
      name
      title
      department
      country
      biodata
      download_url
    }
  }
`;

export const DELETE_PEOPLE = gql`
  mutation deletePeople($idx: ID!) {
    deletePeople(idx: $idx) {
      idx
      code
      email
      photo_url
      name
      title
      department
      country
      biodata
      download_url
    }
  }
`;

export const DELETE_PEOPLE_FILE = gql`
  mutation deletePeopleFile($idx: ID!, $fieldName: String) {
    deletePeopleFile(idx: $idx, fieldName: $fieldName) {
      idx
      code
      email
      photo_url
      name
      title
      department
      country
      biodata
      download_url
    }
  }
`;
export const columns = [
  { label: "idx", field: "idx", readonly: true, width: "110px" },
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
  { label: "event_code", field: "event_code", readonly: true, type: "hidden" },
  {
    label: "name",
    field: "name",
    type: "link",
    linkField: "idx",
    required: true,
  },
  { label: "code", field: "code" },
  { label: "email", field: "email", align: "left" },
  {
    label: "photo_url",
    field: "photo_url",
    type: "file",
    align: "left",
    accept: "image/*",
    callback: (file) => {
      callback.deleteFile(file);
    },
  },
  { label: "department", field: "department" },
  {
    label: "title",
    field: "title",
  },
  { label: "country", field: "country" },
  {
    label: "download_url",
    field: "download_url",
    accept: ".pdf",
    type: "file",
    align: "left",
    callback: (file) => {
      callback.deleteFile(file);
    },
  },
  { label: "biodata", field: "biodata", type: "textarea", align: "left" },
  {
    label: "delete",
    type: "button",
    callback: (row) => {
      callback.delete(row);
    },
  },
];

export const peopleInput = {
  idx: { type: "int" },
  event_idx: { type: "int" },
  event_code: "",
  code: "",
  email: "",
  abstract: "",
  photo_url: { type: "file" },
  name: "",
  title: "",
  department: "",
  country: "",
  biodata: "",
  download_url: { type: "file" },
};
// component 내부에서 재정의함.
export const callback = {
  delete: () => {},
  resetPass: () => {},
  fileDelete: () => {},
};

const PeopleList = ({ eventIdx, eventTitle, pageRouter }) => {
  const router = "/people/";
  const title = "Invited Speaker";

  const listName = "peopleList";

  const [rows, setRows] = useState([]);
  const [colSpan, setColSpan] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState({});

  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState();

  const { loading, error, data, refetch } = useQuery(PEOPLE_LIST_QUERY, {
    variables: {
      event_idx: parseInt(eventIdx, 10),
      offset: parseInt(offset, 10),
    },
  });

  const [mutationCreate] = useMutation(CREATE_PEOPLE, {
    onError: (error) => {
      console.log("mutationCreate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const [mutationUpdate] = useMutation(UPDATE_PEOPLE, {
    onError: (error) => {
      console.log("mutationUpdate error!", error);
    },
    onCompleted: (data) => {
      setOpenEditor(false);
      _refetchData();
    },
  });
  const [mutationDelete] = useMutation(DELETE_PEOPLE, {
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

  const [mutationDeleteFile] = useMutation(DELETE_PEOPLE_FILE, {
    onError: (error) => {
      console.log("mutationFileDelete error!", error);
      window.alert(error);
      return;
    },
    onCompleted: (data) => {
      // _refetchData();
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });
  const _refetchData = () => {
    refetch().then((response) => {
      const list = response.data.peoplePaging[listName];
      if (data) {
        if (
          util.isEmpty(response.data.peoplePaging.totalCount) ||
          util.isEmpty(response.data.peoplePaging.limit)
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
          setLimit(response.data.peoplePaging.limit);
          setTotalCount(response.data.peoplePaging.totalCount);
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
    if (data && data.peoplePaging[listName]) {
      setRows(data.peoplePaging[listName]);
      setLimit(data.peoplePaging.limit);
      setTotalCount(data.peoplePaging.totalCount);
    }
  };

  const _save = async (form) => {
    console.log("_save call.");

    const input = {};
    Object.keys(peopleInput).map((key, index) => {
      const meta = peopleInput[key];
      if (meta.type && meta.type === "int") {
        input[key] = parseInt(form[key], 10);
      } else if (meta.type && meta.type === "date") {
        let t = form[key];
        t = t.replace(/\-/gi, "");
        input[key] = t; //moment(form[key]).format("YYYYMMDD");
      } else if (meta.type && meta.type === "file") {
        if (typeof form[key] === "object") {
          console.log("file ::", typeof form[key]);
          input[key] = form[key];
        }
      } else {
        input[key] = form[key];
      }
    });

    if (util.isEmpty(form.idx)) {
      await mutationCreate({ variables: { input } });
    } else {
      await mutationUpdate({ variables: { input } });
    }
  };

  // + callback override
  callback.delete = async (row) => {
    const confirm = window.confirm(
      `Invited Speaker에 포함된
[ presentation, session_people, presentation_lang, people_lang ] 들의 정보가 같이 삭제되며 복구할 수 없습니다.
      
그래도 삭제를 하시겠습니까?
            `
    );
    if (confirm) {
      mutationDelete({ variables: { idx: row.idx } });
    }
  };

  callback.deleteFile = async (file) => {
    const confirm = window.confirm(
      `Invited Speaker에 저장 되었던 ${file.field}의 사진 파일이 삭제되며 복구할 수 없습니다.
       
그래도 삭제를 하시겠습니까?
            `
    );
    if (confirm) {
      const { field, form, setForm } = file;

      console.log("idx ::", form["idx"]);

      const result = await mutationDeleteFile({
        variables: { idx: form["idx"], fieldName: field },
      });

      if (result.data.deletePeopleFile.idx) {
        setForm({
          ...form,
          [field]: "",
        });
      }
    }
  };
  // - callback override

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  return (
    <>
      {openEditor && (
        <PeopleInput
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

export default PeopleList;
