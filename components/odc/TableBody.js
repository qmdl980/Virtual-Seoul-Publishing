import React from "react";

const TableBody = (props) => {
  const rendering = () => {
    const result = [];
    result.push(
      <tr className="virtual-table-tr" key="0">
        <td className="virtual-table-name">
          {props.venues[0].nameEN}
          <br />({props.venues[0].nameKR})
        </td>
        <td className="virtual-table-venue">
          {props.venues[0].venueKR}
          <br />({props.venues[0].venueEN})
        </td>
        <td rowSpan={props.venues.length}>
          <span className="virtual-table-main-function">
            {props.functions.main}
          </span>
          {props.functions.detail.map(function (obj, i) {
            return (
              <li className="virtual-table-detail-function" key={i}>
                {obj}
              </li>
            );
          })}
        </td>
        <td className="virtual-table-checkbox">
          <input
            type="checkbox"
            name={props.venues[0].venueName}
            checked={
              props?.checkBox?.[props.venues[0].venueName] === "Y"
                ? true
                : false
            }
            onChange={props.onChecked}
          />
        </td>
      </tr>
    );

    for (let i = 1; i < props.venues.length; i++) {
      result.push(
        <tr className="virtual-table-tr" key={i}>
          <td className="virtual-table-name">
            {props.venues[i].nameEN}
            <br />({props.venues[i].nameKR})
          </td>
          <td className="virtual-table-venue">
            {props.venues[i].venueKR}
            <br />({props.venues[i].venueEN})
          </td>
          <td className="virtual-table-checkbox">
            <input
              type="checkbox"
              name={props.venues[i].venueName}
              checked={
                props?.checkBox?.[props.venues[i].venueName] === "Y"
                  ? true
                  : false
              }
              onChange={props.onChecked}
            />
          </td>
        </tr>
      );
    }

    return result;
  };

  return <React.Fragment>{rendering()}</React.Fragment>;
};

export default TableBody;
