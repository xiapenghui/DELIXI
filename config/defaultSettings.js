const proSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  // primaryColor: '#1890ff',
  primaryColor: '#67be8e',

  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
    // loading:true
  },
  title: '',
  pwa: false,
  iconfontUrl: '',
  CORS: [],
  ip: `http://192.168.1.18`,  
  // ip: `http://192.168.1.150`,  
  // ip:`http://localhost`,
  //  ip:`http://smartflow.diskstation.me`,
  // ip: `http://10.177.34.15`,

  port: {
    yshyerp_crc: 8071,
    yshyerp_role: 8072,
    yshyerp_business: 8073,
    yshyerp_receivables: 8074,
    yshyerp_adm: 8075,
    yshyerp_dock: 8076,
    yshyerp_fax: 8077,
    yshyerp_djoborder: 8078,
    yshyerp_vehicle: 8079,
    yshyerp_oilwater: 8080,
    yshyerp_location: 8081,
    yshyerp_invoice: 8082,
    sspalds_role: 8073,
    sspalds_role: 8088,
    // yshyerp_sspa: 9100,
    // yshyerp_sspa: 23111
  },


  table: {
    paginationConfig: {
      PageIndex: 1, //当前页数
      PageSize: 10, // 表格每页显示多少条数据
      Total: 0,
      ShowSizeChanger: true, // 是否可以修改每页显示多少条数据
      PageSizeOptions: ['10', '20', '50', '100'], // 指定每页可以显示多少条
    },
    formItemLayout: {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    },
  },
  modal: {
    maskStyles: {
      mask: true, //不需要遮罩，就用false
      maskClosable: false,  //默认是true,点击空白处不关闭，把这里设置为false
      maskStyle: { backgroundColor: 'rgba(254, 254, 254, 0.5)' },  //记得这里传值是object 所以是两个括号
      // style: { boxShadow: '10px 10px 10px 10px rgba(0,0,0,0.5), 10px 10px 20px 10px rgba(0,0,0,0.5)' }
    },

  },
  form: {
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    onlyDateFormat: 'YYYY-MM-DD',
  },
};
export default proSettings;
