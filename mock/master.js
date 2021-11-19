// const getBucketInfo = (req, res) => {
//   res.json({

//     current: 1,
//     data: [
//       {
//         "code": "A2",
//         "cName": "转进口",
//         "eName": "IN",
//         "fullName": "TAX",
//         "d": null
//       }
//     ],
//     pageSize: "20",
//     success: true,
//     total: 100
//   });
// };

// export default {
//   'GET /api/bucketInfoQuery': getBucketInfo,
// };


/**
 *
 * @param bucketInfoQuery  查询列表
 * @param bucketInfoUpdate 编辑保存
 * @param bucketInfoSearchInit 查询初始化
 *
 */
const bucketInfoQuery = (req, res) => {
  res.json({
    "message": "查询成功",
    "data": {
      "total": 84,
      "list": [
        {
          "code": "A2",
          "cName": "转进口",
          "type": "test1",
          "eName": "IN",
          "fullName": "TAX",
          "d": null
        },
        {
          "code": "A2",
          "cName": "转出口",
          "type": "test2",
          "eName": "OUT",
          "fullName": "TAX",
          "d": null
        },
        {
          "code": "A2",
          "cName": "其它",
          "type": "test1",
          "eName": "QT",
          "fullName": "NBO",
          "d": null
        },

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


const bucketInfoUpdate = (req, res) => {
  res.json({
    "message": "查询成功",
    "data": 1,
    "status": "200"
  });
}

const bucketInfoSearchInit = (req, res) => {
  res.json({
    "message": "查询成功",
    "data": {
      "typeList": {
        // 0: { text: 'test1', status: 'test1' },
        // 1: { text: 'test2', status: 'test2' },

        "all": { text: '全部' },
        "test1": { text: 'test1' },
        "test2": { text: 'test2' },
      }
    },
    "status": "200"
  });
}
const bucketUpdateInit = (req, res) => {
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
  'GET /api/bucketInfoQuery': bucketInfoQuery,
  'PUT /api/bucketInfoUpdate': bucketInfoUpdate,
  'GET /api/bucketInfoSearchInit': bucketInfoSearchInit,
  'GET /api/bucketUpdateInit': bucketUpdateInit,

};
