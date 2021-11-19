
import { Button } from 'antd';
import React, { Component } from 'react';
class ButtonComponent extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        // };
    }
    render() {
         return <Button  
         type="link"
         style={{padding: "0px 0px"}}
         { ...this.props} 
         />;
    }
};
export default ButtonComponent;