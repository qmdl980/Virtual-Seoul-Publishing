import React, { useState, useEffect } from "react";
import util from "../../utils/util";
import ReactMoment from "react-moment";
import "moment-timezone";
import moment from "moment";
import { columns } from "./EventList";
import { gql, useQuery, useMutation } from "@apollo/client";

const EventTable = ({
  form,
  setForm,
  _save,
  openEditor,
  setOpenEditor,
  pageRouter,
  user,
}) => {
  return (
    <>
      <div>
        <p>Please enter basic information for the event.</p>
        <div>
          <label>Event Name</label>
          <input
            type="text"
            name="name"
            value={form["name"]}
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <label>Event Code</label>
          <input
            type="text"
            name="code"
            value={form["code"]}
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={moment(form["start_date"]).format("YYYY-MM-DD")}
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <label>Event Code</label>
          <input
            type="date"
            name="end_date"
            value={moment(form["end_date"]).format("YYYY-MM-DD")}
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>Event Domain</label>
          <input
            type="url"
            name="domain"
            value={form["domain"]}
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>Time Zone</label>
          <select>
            <option value="">GMT +09 KOREA</option>
          </select>
        </div>
        <div>
          <label>Registration</label>
          <select>
            <option value="">Free(no login)</option>
            <option value="">Free(with login)</option>
            <option value="">Ticketed</option>
          </select>
        </div>
        <div>
          <label>개인정보 이용 동의서</label>
          <textarea
            name="domain"
            value={form["domain"]}
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>마케팅 활용 동의서</label>
          <textarea />
        </div>
      </div>
      {/* category */}
      <div>
        <p>
          Event Category <span>이벤트에 필요한 기능을 선택하세요</span>
        </p>
        <table>
          <thead>
            <tr>
              <th>카테고리</th>
              <th>기능</th>
              <th>가상공간</th>
              <th>선택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>컨퍼런스 Conference</th>
              <td>기능</td>
              <td>가상공간</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <th>워크샾 Workshop</th>
              <td>기능</td>
              <td>가상공간</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <th>전시장 Exhibition</th>
              <td>기능</td>
              <td>가상공간</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <th>영상 홍보관 Theater</th>
              <td>기능</td>
              <td>가상공간</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <th>홍보관 Seoul Booth</th>
              <td>기능</td>
              <td>가상공간</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <th>라운지 Lounge</th>
              <td>기능</td>
              <td>가상공간</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <th>팀빌딩 게임 Play Ground</th>
              <td>기능</td>
              <td>가상공간</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EventTable;
