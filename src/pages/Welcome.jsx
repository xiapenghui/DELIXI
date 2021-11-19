// import React from 'react';
// import { Card } from 'antd';


// export default () => (
//   <Card>欢迎使用Lean Digitization System（SSPA 生产数字平台）</Card>
// );


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
        <img src="http://www.delixi.com/upload/202109/25/202109251116314486.jpg" alt="" style={{width:'100%',height:'88vh'}}/>
      </div>
    )
  }
}

 
export default Home