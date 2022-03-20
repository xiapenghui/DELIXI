import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Tree,
  Radio,
  Select,
  message,
  Divider,
  Popconfirm,
} from "antd";
import moment from "moment";
import { Link, connect } from "umi";
import TableComponents from "@/components/CRUDTable/EmptyDrumsOperationTableComponents";
import {
  SearchOutlined,
  ClearOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import globalConfig from "../../../../config/defaultSettings";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import DetailForm from "./components/DetailForm";
import { red } from "@umijs/deps/compiled/chalk";
import "../../../../src/common.css";
const formItemLayout = globalConfig.table.formItemLayout;
const TableName = "roleInfo";

const Components = ({ roleInfo, dispatch }) => {
  const TableModelsData = roleInfo;
  const {
    FromParams,
    TableData,
    pagination,
    tableLoading,
    addModalVisible,
    updateModalVisible,
    detailModalVisible,
    SelectConditionInitData,
  } = TableModelsData;

  const [form] = Form.useForm();
  let DeleteIdArray = [];

  /**
   *
   * @param handleSearch 搜索
   */
  const handleSearch = (e) => {
    form
      .validateFields()
      .then((values) => {
        const Params = {
          roleName: values.roleName,
          companyId: values.companyId,
        };
        SearchTableList(Params, 1, pagination.PageSize);
      })
      .catch((info) => {
        console.log("handleSearch Failed:", info);
      });
  };
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      roleName: form.getFieldValue("roleName"),
      companyId: form.getFieldValue("companyId"),
    };
    SearchTableList(Params, PageIndex, PageSize);
  };

  const SearchTableList = async (payload, PageIndex, PageSize) => {
    console.log("SearchTableList", payload, PageIndex, PageSize);
    // postListInit({
    //   "pageNum": params.current,
    //   "pageSize": params.pageSize,
    //   "data": {
    //   }
    // })
    await dispatch({
      type: `${TableName}/getRoleList`,
      payload: {
        data: {
          ...payload,
        },
        pageNum: PageIndex,
        pageSize: PageSize,
      },
    });
  };

  const handleAdd = (modalType) => {};

  const deleteHandler = () => {
    if (DeleteIdArray.length > 0) {
      dispatch({
        type: `${TableName}/deleteRole`,
        payload: {
          data: DeleteIdArray,
        },
      });
    } else {
      return message.error("请至少选择一条记录");
    }
  };

  const TableColumns = [
    {
      title: "角色名",
      dataIndex: "roleName",
    },
    {
      title: "公司",
      dataIndex: "companyName",
    },
  ];

  const OperationButton = () => {
    return (
      <Row>
        <Col span={24} style={{ textAlign: "right",background:"#fff",padding:"15px 20px 0 0"}}>
          <Button
            type="primary"
            onClick={() => handleModalShow("addModalVisible")}
          >
            <PlusOutlined /> 新建
          </Button>
          <Popconfirm title="确定删除吗?" onConfirm={() => deleteHandler()}>
            <Button style={{ marginLeft: "10px" }} type="primary">
              <DeleteOutlined /> 删除
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    );
  };

  const OperationColumn = [
    {
      title: "操作",
      key: new Date().valueOf(),
      fixed: "right",
      width: 150,
      render: (text, record) => (
        <span>
          <a onClick={() => handleModalShow("updateModalVisible", record)}>
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => handleModalShow("detailModalVisible", record)}
            className="ant-dropdown-link"
          >
            详情
          </a>
        </span>
      ),
    },
  ];
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      DeleteIdArray = selectedRowKeys.map((index) => {
        return parseInt(index);
      });
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
        DeleteIdArray
      );
    },
  };

  const addModalValue = () => {
    return <div>test</div>;
  };
  const editModalValue = () => {
    return <div>test</div>;
  };
  const detailsModalValue = () => {
    return <div>test</div>;
  };

  const handleResetFields = (type) => {
    form.resetFields();
  };

  /**
   * modal 开关
   */
  const ModalShowChanger = async (modalVisible, record) => {
    // 业务改变为默认每次新增模态框打开 首先清空上次缓存数据
    if (modalVisible === "addModalVisible") {
      // await resetFields(AddFormLayout)
      // handleResetFields();
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record,
        },
      });
    } else {
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record,
        },
      });
    }
  };

  const handleModalShow = (modalVisible, record = {}) => {
    ModalShowChanger(modalVisible, record);
  };
  const handleModalClose = (modalVisible) => {
    dispatch({
      type: `${TableName}/hideModal`,
      payload: modalVisible,
    });
    //从这里要调用父组件来清空Form新增表单域
    // handleResetFields('AddFormLayout')
  };
  console.log(`${TableName}-component`, TableModelsData, form);
  return (
    <PageContainer  className="formStyleTbale">
      <div className="formStyle">
        <Form
          className="ant-advanced-search-form"
          onFinish={handleSearch}
          form={form}
          name="form_in_modal"
          initialValues={{}}
        >
          <Row gutter={40}>
            <Col span={7} key={1}>
              <Form.Item
                name="roleName"
                label="角色"
                hasFeedback
                {...formItemLayout}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7} key={2}>
              <Form.Item
                name="companyId"
                label="公司"
                hasFeedback
                {...formItemLayout}
              >
                <Select showSearch>
                  {SelectConditionInitData.companyList.map(function (
                    item,
                    index
                  ) {
                    return (
                      <Select.Option key={index} value={item.key}>
                        {item.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col
              span={4}
              offset={6}
              key={3}
              style={{ display: "block", textAlign: "right" }}
            >
              <Button onClick={() => handleResetFields()}>重置</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "10px" }}
              >
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </div>


      <div>
        <TableComponents
          // TableTitle="查询表格"
          rowKey={(record) => record.id}
          expandedRowRenderNAME="test"
          expandedRowRenderKEY="SelectedStationGroup"
          tableName={TableName}
          data={TableData}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={TableColumns}
          OperationButton={OperationButton()}
          ActionColumn={OperationColumn}
          TableWidth={"100%"}
          ModalWidth={1500}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PaginationComponentsChanger={PaginationComponentsChanger}
          handleResetFields={handleResetFields}
          ModalShowChanger={ModalShowChanger}
          rowSelection={rowSelection}
        />

        <CreateForm
          tableName={TableName}
          addModalVisible={addModalVisible}
          handleModalClose={handleModalClose}
          addModalValue={addModalValue}
          handleAdd={handleAdd}
          ModalWidth={800}
          data={TableModelsData}
          dispatch={dispatch}
        />
        <UpdateForm
          tableName={TableName}
          updateModalVisible={updateModalVisible}
          handleModalClose={handleModalClose}
          handleAdd={handleAdd}
          ModalWidth={800}
          dispatch={dispatch}
          data={TableModelsData}
        />
        <DetailForm
          tableName={TableName}
          detailModalVisible={detailModalVisible}
          handleModalClose={handleModalClose}
          handleAdd={handleAdd}
          ModalWidth={800}
          dispatch={dispatch}
          data={TableModelsData}
        />
      </div>
    </PageContainer>
  );
};

export default connect(({ roleInfo }) => ({ roleInfo }))(Components);
