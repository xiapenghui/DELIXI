import React from 'react'
import { Modal } from 'antd'
import './index.less'
import globalConfig from '../../../../../config/defaultSettings';
const maskStyles = globalConfig.modal.maskStyles


export class ModalComponents extends React.Component {



  handleOk = (modalType) => {
    this.props.handleAdd(modalType)
  }
  render() {


    const { 
      addModalVisible,
      handleModalClose,
      addModalValue,
      editModalVisible,
      editModalValue,
      detailsModalVisible,
      deleteModalVisible,
      detailsModalValue,
      handleAdd,
      ModalWidth,
      EditData } = this.props


    const handleOk = this.handleOk


    return (
      <div>
        <Modal
          title="新建"
          // visible={addModalVisible}
          visible={false}
          width={ModalWidth || 520}
          onOk={() => handleOk('create')}
          onCancel={() => handleModalClose('addModalVisible')}
          {...maskStyles}
        >
          {addModalValue}
        </Modal>
        <Modal
          title="修改"
          // visible={editModalVisible}
          visible={false}
          width={ModalWidth || 520}
          onOk={() => handleOk('edit')}
          onCancel={() => handleModalClose('editModalVisible')}
          {...maskStyles}
        >
          {editModalValue}
        </Modal>
        <Modal
          title="详细"
          visible={detailsModalVisible}
          width={ModalWidth || 520}
          onOk={() => handleModalClose('detailsModalVisible')}
          onCancel={() => handleModalClose('detailsModalVisible')}
          {...maskStyles}
        >
          {detailsModalValue}
        </Modal>

        <Modal
          title="删除提示"
          visible={deleteModalVisible}
          onOk={() => handleOk('delete')}
          onCancel={() => handleModalClose('deleteModalVisible')}
          {...maskStyles}
        >
          <p>确认删除吗？？</p>
        </Modal>
      </div>
    )
  }
}
