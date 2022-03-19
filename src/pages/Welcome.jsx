import React from 'react'
import { Player } from 'video-react';
import { Carousel } from 'antd'
import url from '../assets/bgi2.png';

import './Welcome.less'

const imgs = [
  url,
  'http://47.99.130.140/imgs/wallhaven-p8r1e9.jpg',
  'http://47.99.130.140/imgs/wallhaven-e7zyy8.jpg',
  'http://47.99.130.140/imgs/wallhaven-6k9e7q.jpg',
  'http://47.99.130.140/imgs/photo.jpg',
]

class Home extends React.Component {
  render() {
    return (
      <div  className='home'>
        {/* <video src="http://10.177.34.15:23111/Resource/movie.mp4" width="100%"   enableProgressGesture="false" objectFit="fill" controls="false" autoplay="autoplay" loop='loop'></video> */}
        {/* <video src="http://192.168.1.18:9000/Resource/movie.mp4" width="100%" enableProgressGesture="false" objectFit="fill" controls="false" autoplay="autoplay" loop='loop'></video> */}
        {/* <img src={imgs.url1} alt="" style={{width:'100%',height:'88vh'}}/> */}
      </div>
    )
  }
}

export default Home

// import React from "react";
// import { Button } from "antd";
// import { getLodop } from "../utils/LodopFuncs";

// class Home extends React.Component {
//   // printPageView = () => {
//   //   // LODOP.PRINT_INIT("react使用打印插件CLodop");  //打印初始化
//   //   // let strStyle = `<style> 打印的样式需要写在这里，下面引入</style> `;
//   //   // LODOP.ADD_PRINT_HTM(100, "5%", "90%", 450, strStyle + document.getElementById("print").innerHTML);
//   //   // LODOP.PREVIEW();  //最后一个打印(预览)语句

//   // };

//   printPageView = () => {
//     CreatePrintPage();
//     LODOP.PRINT_DESIGN();
//     function CreatePrintPage() {
//       var arr = [
//         "22345678905",
//         "12345678901",
//         "12345678906",
//         "12345678902",
//         "12345678907",
//       ];
//       for (var i = 0; i < arr.length; i++) {
//         console.log(i * 30);
//         console.log(arr[i]);
//         LODOP.ADD_PRINT_BARCODE((i + 1) * 60, 34, 307, 47, "128A", arr[i]);
//       }
//     }
//   };

//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.printPageView}>
//           打印123
//         </Button>
//         <div id="print" style={{ display: "none" }}>
//           <p align="center">
//             <b face="宋体" size="3">
//               科学家123
//             </b>
//           </p>
//           <p align="left">
//             <b face="宋体" size="3">
//               　地址：中国北京社会科学院附近东大街西胡同
//             </b>
//           </p>
//           <p align="left">
//             <b face="宋体" size="3">
//               　电话：010-88811888
//             </b>
//           </p>
//         </div>
//       </div>
//     );
//   }
// }
// export default Home;
