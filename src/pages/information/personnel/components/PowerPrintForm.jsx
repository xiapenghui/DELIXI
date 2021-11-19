import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Modal,
  Button,
  Select,
  Descriptions,
  Badge,
  Table,
  Divider,
  Card,
  Image,
} from "antd";
import { connect } from "umi";
import globalConfig from "../../../../../config/defaultSettings";
const PowerPrintForm = (props) => {
  const { Data, IdName } = props;

  return (
    <div
      id={IdName}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0px",
        backgroundColor: "white",
        zIndex: -100,
      }}
    >
      <div
        style={{ border: "0px solid", textAlign: "center", marginTop: "5%" }}
      >
        <h2>入仓报关完成通知</h2>
      </div>

      <div
        className="theFontCss"
        style={{ marginTop: "3%", marginBottom: "3%" }}
      >
        <span
          style={{
            width: "20%",
            marginLeft: "5%",
            padding: "0px 2em",
            borderBottom: "1px solid",
            textAlign: "center",
          }}
        >
          {Data.ccustomer}
        </span>
        公司:
      </div>
      <div
        className="theFontCss"
        style={{
          width: "90%",
          height: "30px",
          marginBottom: "3%",
          margin: "0px auto",
          textAlign: "center",
        }}
      >
        贵公司本次来船货物已在海关办理好货物入仓报关手续,有关资料如下:
      </div>
      <div>
        <table
          className="theFontCss"
          width="100%"
          border="1"
          rules="all"
          style={{
            fontWeight: 400,
            width: "95%",
            marginTop: "1%",
            margin: "0px auto",
            textAlign: "center",
          }}
        >
          <tr>
            <td style={{ width: "16.6%" }}>船名</td>
            <td style={{ width: "16.6%" }}>报关完成日期</td>
            <td style={{ width: "16.6%" }}>货物名称</td>
            <td style={{ width: "16.6%" }}>数量(吨)</td>
            <td style={{ width: "16.6%" }}>入仓单号</td>
            <td style={{ width: "16.6%" }}>报关单号</td>
          </tr>
          <tr>
            <td style={{ width: "16.6%" }}>{Data.vessel}</td>
            <td style={{ width: "16.6%" }}>{Data.date}</td>
            <td style={{ width: "16.6%" }}>{Data.commodity}</td>
            <td style={{ width: "16.6%" }}>{Data.quantity}</td>
            <td style={{ width: "16.6%" }}>{Data.inwardNo}</td>
            <td style={{ width: "16.6%" }}>1{Data.trustNo}</td>
          </tr>
        </table>
      </div>
      <div
        className="theFontCss"
        style={{ marginTop: "3%", marginBottom: "1%" }}
      >
        <div
          style={{
            width: "20%",
            marginLeft: "5%",
            padding: "0px 2em",
            textAlign: "center",
          }}
        >
          商祺!
        </div>

        <div style={{ float: "right", marginRight: "5%" }}>
          <div style={{ textAlign: "center" }}>上海亿升海运仓储有限公司</div>
          <div style={{ textAlign: "center" }}>仓管科</div>
          <div style={{ textAlign: "center" }}>
            {moment().format(globalConfig.form.onlyDateFormat)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ dispatch }) => ({ dispatch }))(PowerPrintForm);
