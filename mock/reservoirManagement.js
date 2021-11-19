/**
 * 查询
 */
const Query = (req, res) => {
  res.json({
    "message": "查询成功",
    "data": {
      "total": 84,
      "list": [
        {
          "id": 1,
          "key": 1,
          "state": "1",
          "idno": "23244",
          "txtVehicle": "沪A123B2",
          "txtVehicle1": "TAX",
          "dDate": "2020-12-04 17:00:00",
          "tank": "TAX",
          "tCustomer": "IN",
          "commodity": "TAX",
          "crrNo": "IN",
          "doNo": "TAX",
        }

      ],
      "pageNum": 1,
      "pageSize": 84,
      "size": 84,
      "startRow": 0,
      "endRow": 83,
      "pages": 1,
      "prePage": 0,
      "nextPage": 0,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [
        1
      ],
      "navigateFirstPage": 1,
      "navigateLastPage": 1,
      "firstPage": 1,
      "lastPage": 1
    },
    "status": "200"
  });
};

/**
 * 罐号选择Table
 *
 */
const tankinfo = (req, res) => {
  res.json({
    "message": "查询成功",
    "data": {
      "total": 84,
      "header": [

        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: '罐号',
          dataIndex: 'tank',
        },
        {
          title: '罐主',
          dataIndex: 'tCustomer',
        },
        {
          title: '货主',
          dataIndex: 'cCustomer',
        },
        {
          title: '货品名称',
          dataIndex: 'commodity',
        },
        {
          title: '合同号',
          dataIndex: 'contractI',
        },
      ],
      "list": [
        {
          "id": 1,
          "key": 1,
          "state": "1",
          "idno": "23244",
          "txtVehicle": "IN",
          "txtVehicle1": "TAX",
          "dDate": "IN",
          "tank": "TAX",
          "tCustomer": "IN",
          "commodity": "TAX",
          "crrNo": "IN",
          "doNo": "TAX",

          "cCustomer": "cCustomer",
          "contractI": "contractI",
          "comm1": "comm1",

        },
        {
          "id": 2,
          "key": 2,
          "state": "2",
          "idno": "23244",
          "txtVehicle": "IN",
          "txtVehicle1": "TAX",
          "dDate": "IN",
          "tank": "TAX",
          "tCustomer": "IN",
          "commodity": "TAX",
          "crrNo": "IN",
          "doNo": "TAX",

          "cCustomer": "cCustomer",
          "contractI": "contractI",
          "comm1": "comm1",

        }

      ],
      "pageNum": 1,
      "pageSize": 84,
      "size": 84,
      "startRow": 0,
      "endRow": 83,
      "pages": 1,
      "prePage": 0,
      "nextPage": 0,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [
        1
      ],
      "navigateFirstPage": 1,
      "navigateLastPage": 1,
      "firstPage": 1,
      "lastPage": 1
    },
    "status": "200"
  });
}

const byccustomer = (req, res) => {
  res.json({
    "message": "查询成功",
    "data": {
      "total": 84,
      "header": [

        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: '委托书号',
          dataIndex: 'crrNo',
        },
        {
          title: '罐主',
          dataIndex: 'tCustomer',
        },
        {
          title: '货主',
          dataIndex: 'cCustomer',
        },
        {
          title: '货品名称',
          dataIndex: 'commodity',
        },
        {
          title: '合同号',
          dataIndex: 'contractI',
        },
      ],
      "list": [
        {
          "id": 1,
          "key": 1,
          "state": "1",
          "idno": "23244",
          "txtVehicle": "IN",
          "txtVehicle1": "TAX",
          "dDate": "IN",
          "tank": "TAX",
          "tCustomer": "IN",
          "commodity": "TAX",
          "crrNo": "委托书号1",
          "doNo": "TAX",

          "cCustomer": "cCustomer",
          "contractI": "contractI",
          "comm1": "comm1",

        },
        {
          "id": 2,
          "key": 2,
          "state": "2",
          "idno": "23244",
          "txtVehicle": "IN",
          "txtVehicle1": "TAX",
          "dDate": "IN",
          "tank": "TAX",
          "tCustomer": "IN",
          "commodity": "TAX",
          "crrNo": "委托书号2",
          "doNo": "TAX",

          "cCustomer": "cCustomer",
          "contractI": "contractI",
          "comm1": "comm1",

        }

      ],
      "pageNum": 1,
      "pageSize": 84,
      "size": 84,
      "startRow": 0,
      "endRow": 83,
      "pages": 1,
      "prePage": 0,
      "nextPage": 0,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [
        1
      ],
      "navigateFirstPage": 1,
      "navigateLastPage": 1,
      "firstPage": 1,
      "lastPage": 1
    },
    "status": "200"
  });
}
const vehicletxtcnodetail = (req, res) => {
  res.json({
    "message": "查询成功",
    "data": {
      "txtVehiW": '核定载重',
      "txtVehiW2": '准牵引重量',
      "txtVehiW3": '挂车重量',
      "vehiV": null,
      "vehiW1": '箱重',
    },
    "status": "200"
  });
}


const Update = (req, res) => {
  res.json({
    "message": "查询成功",
    "data": 1,
    "status": "200"
  });
}


const UpdateInit = (req, res) => {
  res.json({
    "message": "查询成功",
    "data":
    {
      "code": "A3",
      "cName": "转进口",
      "type": "test1",
      "eName": "IN",
      "fullName": "TAX",
      "d": null
    },

    "status": "200"
  });
}


export default {
  'GET /api/tankCarWarehouseManagementQuery': Query,
  'GET /api/tankinfo': tankinfo,
  'GET /api/byccustomer': byccustomer,
  'GET /api/vehicletxtcnodetail': vehicletxtcnodetail,


  'PUT /api/tankCarWarehouseManagementUpdate': Update,
  // 'GET /api/tankCarWarehouseManagementSearchInit': SearchInit,
  'GET /api/tankCarWarehouseManagementUpdateInit': UpdateInit,

};
