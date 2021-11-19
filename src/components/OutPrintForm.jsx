

import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Modal, Button, Select, Descriptions, Badge, Table, Divider, Card ,Image} from 'antd';
import { connect } from 'umi';

const OutPrintForm = (props) => {
  // const [form] = Form.useForm();
  const [printDivCss, setPrintDivCss] = useState({
    'height': '100%',
    // 'position': 'absolute',
    'width': '100%',
    'top': '0px',
    'background-color': 'white',
    'z-index': '-100',
    // 'display': 'none'
    // 'overflow': 'hidden'
  });

  
  const {Data ,IdName} = props;





  return (

<div id={IdName} style={{
  position:'absolute',
  marginLeft:'-3%',
  width:'100%',
  height:'100%',
  top:0,
  backgroundColor:'white',
  zIndex:-100,
}}>

        <div style = {{
          width:'100%',
          height:'100%',
          zIndex:-99
          }}>

      {/* -------------------------1-------------------- */}
            <div style={{
              position:'absolute',
              top:'30%',
              left:'10%'
            }}>{Data.sysDate}</div> 
            
            <div style={{
              position:'absolute',
              top:'30%',
              right:'15%'
            }}>{Data.no}</div> 
            {/* -------------------------2-------------------- */}

            
<div style={{
              position:'absolute',
              top:'33%',
              left:'20%'
            }}>{Data.customer}</div> 


<div style={{
              position:'absolute',
              top:'33%',
              right:'25%'
            }}>{Data.crrNo}</div> 
   {/* -------------------------3-------------------- */}

<div style={{
              position:'absolute',
              top:'37%',
              left:'20%'
            }}>{Data.vehicle}</div> 


<div style={{
              position:'absolute',
              top:'35%',
              right:'11%'
            }}>{Data.doNo}</div> 

               {/* -------------------------4-------------------- */}

<div style={{
              position:'absolute',
              top:'41%',
              left:'16%'
            }}>{Data.inOut == 'in' ? '入' : ''}</div> 


<div style={{
              position:'absolute',
              top:'41%',
              right:'38%'
            }}>{Data.inOut == 'out' ? '出' : ''}</div> 

        

    {/* -------------------------5-------------------- */}

    <div style={{
              position:'absolute',
              top:'46%',
              left:'23%'
            }}>{Data.commodity}</div> 


<div style={{
              position:'absolute',
              top:'46%',
              right:'23%'
            }}>{Data.tank}</div> 



 {/* -------------------------6-------------------- */}

 <div style={{
              position:'absolute',
              top:'49%',
              left:'23%'
            }}>{Data.time1}</div> 


<div style={{
              position:'absolute',
              top:'49%',
              right:'40%'
            }}>{Data.weight1}</div> 


{/* -------------------------7-------------------- */}

<div style={{
              position:'absolute',
              top:'53%',
              left:'23%'
            }}>{Data.time2}</div> 

<div style={{
              position:'absolute',
              top:'53%',
              right:'40%'
            }}>{Data.weight2}</div> 

{/* -------------------------8-------------------- */}



<div style={{
              position:'absolute',
              top:'57%',
              right:'40%'
            }}>{Data.netWeight}</div> 



            
{/* -------------------------10-------------------- */}



<div style={{
              position:'absolute',
              top:'63%',
              left:'13%'
            }}>{Data.commodity}</div> 

<div style={{
              position:'absolute',
              top:'63%',
              left:'27%'
            }}>{Data.drums}</div> 


<div style={{
              position:'absolute',
              top:'63%',
              left:'41%'
            }}>{Data.packing}</div> 

<div style={{
              position:'absolute',
              top:'63%',
              left:'57%'
            }}>{Data.netWeight}</div> 


<div style={{
              position:'absolute',
              top:'63%',
              left:'75%'
            }}>{Data.oldNew}</div> 


<div style={{
              position:'absolute',
              top:'63%',
              left:'84%'
            }}>{Data.slop}</div> 

<div style={{
              position:'absolute',
              top:'63%',
              left:'92%'
            }}>{Data.note}</div> 



{/* -------------------------11-------------------- */}


<div style={{
              position:'absolute',
              top:'66%',
              left:'13%'
            }}>*****************</div> 



{/* -------------------------13-------------------- */}


<div style={{
              position:'absolute',
              top:'72%',
              left:'21%'
            }}>{Data.delivered}</div> 

            
            

<div style={{
              position:'absolute',
              top:'71%',
              left:'51%'
            }}>{Data.sealNo}</div> 




{/* -------------------------15-------------------- */}


<div style={{
              position:'absolute',
              top:'76%',
              left:'20%'
            }}>{Data.remarks}</div> 





{/* -------------------------16-------------------- */}


<div style={{
              position:'absolute',
              top:'91%',
              right:'25%'
            }}>{Data.idNo}</div> 


          </div>

          



   

          

        </div>





  );
};


export default connect(({ dispatch }) => ({ dispatch }))(OutPrintForm);

