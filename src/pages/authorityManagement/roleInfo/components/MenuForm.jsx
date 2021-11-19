
import React, { Component, useState} from 'react';
import { Table, Divider, Tag, Icon, Checkbox, Tree, Button } from 'antd';
class index extends Component {

    state = {
        data: [
            {
                key: "product",
                order: "1",
                title: "产品",
                data: {
                    code: "product",
                    enable_edt: "N",
                    enable_view: "Y",
                    has_edit: null,
                    has_view: "N",
                    name: "产品"
                },
                
                has_edit: null,
                has_view: "N",

                children: [
                    {
                        key: "fund_info",
                        order: "2",
                        title: "产品信息",
                        data: {
                            code: "fund_info",
                            enable_edt: "N",
                            enable_view: "Y",
                            has_edit: null,
                            has_view: "N",
                            name: "产品信息"
                        },

                        has_view: "N",
                        has_edit: null,

                        children: [
                            {
                                key: "fund_base_info",
                                order: "3",
                                title: "基本信息",
                                data: {
                                    code: "fund_base_info",
                                    enable_edt: "N",
                                    enable_view: "Y",
                                    has_edit: null,
                                    has_view: "N",
                                    name: "基本信息"
                                },
                                
                                has_view: "N",
                                has_edit: null,

                                children: [
                                    {
                                        key: "field_cplx",
                                        order: "4",
                                        title: "产品类型",
                                        data: {
                                            code: "field_cplx",
                                            enable_edt: "N",
                                            enable_view: "Y",
                                            has_edit: null,
                                            has_view: "N",
                                            name: "产品类型"
                                        },
                                        
                                        has_edit: null,
                                        has_view: "N",

                                        children: []
                                    },
                                    {
                                        key: "field_cpqc",
                                        order: "5",
                                        title: "产品全称",
                                        data: {
                                            code: "field_cpqc",
                                            enable_edt: "N",
                                            enable_view: "Y",
                                            has_edit: null,
                                            has_view: "N",
                                            name: "产品全称"
                                        },
                                        
                                        has_edit: null,
                                        has_view: "N",

                                        children: []
                                    }
                                ]
                            },
                            {
                                key: "fund_sale_info",
                                order: "26",
                                title: "销售信息",
                                data: {
                                    code: "fund_sale_info",
                                    enable_edt: "N",
                                    enable_view: "Y",
                                    has_edit: null,
                                    has_view: "N",
                                    name: "销售信息"
                                },
                                
                                has_edit: null,
                                has_view: "N",
                           
                                children: []
                            }
                        ]
                    },
                    {
                        key: "fund_role_info",
                        order: "97",
                        title: "岗位信息",
                        data: {
                            code: "fund_role_info",
                            enable_edt: "N",
                            enable_view: "Y",
                            has_edit: null,
                            has_view: "N",
                            name: "岗位信息"
                        },
                        
                        has_edit: null,
                        has_view: "N",

                        children: []
                    }
                ]
            }
        ],//数据
        columns: [], //表格columns
        permissionTableData: [],//权限树，表格数据
        editFlag: false,//是否为编辑状态
        changeData: [],//checkbox改变后得数据
        loading: true,//loading状态
        yTreeData: [],//原始树形数据
        menuChecked: true
    }

    componentDidMount() {
        this.getRolePermissonTree();
    }
    //给子级添加父级Key
    addParentKeyWrapper = (tree) => {
        //深度克隆
        const data = JSON.parse(JSON.stringify(tree));
        function addParentKey(data, parentKey) {
            data.forEach(ele => {
                const { children } = ele;
                ele.data.parent_code = parentKey;
                if (children) {//如果唯一标识不是code可以自行改变
                    addParentKey(children, ele.data.code)
                }
            })
        }
        addParentKey(data, null); //一开始为null,根节点没有父级
        return data;
    }
    getRolePermissonTree = () => { //项目中这里是请求接口
        this.setState({
            loading: true
        })
        let { data, menuChecked} = this.state; //实际上这个data是从接口来的
        let parentData = this.addParentKeyWrapper(data);//添加父级属性
        this.initData(parentData, "has_view");
        this.initData(parentData, "has_edit");
        let copyData = JSON.stringify(parentData); //备份原始数据
        let col = [
            {
                title: '菜单名称',
                // dataIndex: 'data.name'
                dataIndex: 'title'
            },
            {
                title: '查看权限',
                // dataIndex: 'data.has_view',
                dataIndex: 'has_view',
                render: (text, record) => {
                    return (
                        <>
                            <Checkbox //参考antd Checkbox API
                                // checked={text == "Y" ? true : false}//是否选中
                                checked={menuChecked}
                                // disabled={true}//是否仅用
                                onChange={this.onChange}
                                indeterminate={record['has_viewindeterminate'] ? true : false} //全选与反选状态
                            >
 
                            </Checkbox>
                        </>
                    )
                }
            },
            {
                title: '查看权限',
                // dataIndex: 'data.has_edit',
                dataIndex: 'has_edit',
                render: (text, record) => {
                    return (
                        <>
                            <Checkbox //参考antd Checkbox API
                                // checked={text == "Y" ? true : false}//是否选中
                                checked={menuChecked}
                                // disabled={true}//是否仅用
                                onChange={this.onChange}
                                indeterminate={record['has_editindeterminate'] ? true : false} //全选与反选状态
                            >
 
                            </Checkbox>
                        </>
                    )
                }
            }
        ]
        this.setState({
            permissionTableData: parentData,
            loading: false,
            yTreeData: copyData,
            columns: col
        })
    }
    //初始化数据
    initData = (data, type) => {
        data.map((item) => {
            // console.log(item)
            item[type + 'indeterminate'] = false;
            if (item.children.length > 0) {
                this.initData(item.children, type)
                // console.log(item.children, "999")
                let allSelect = item.children.every((item1) => {
                    return item1.data[type] == "Y" && item1[type + "indeterminate"] == false;
                })
                let someSelect = item.children.some((item1) => {
                    return item1.data[type] == "Y";
                })
                if (allSelect) {
                    item.data[type] = "Y"
                    item[type + 'indeterminate'] = false;
                } else if (someSelect) {
                    item.data[type] = "Y"
                    item[type + 'indeterminate'] = true;
                } else {
                    item.data[type] = "N"
                    item[type + 'indeterminate'] = false;
                }
            }
        })
    }
    //根据code(唯一标识)找到其值
    getItem = (code) => {
        let { permissionTableData } = this.state;
        let value;
        let loops = (data, code) => {
            data.map((item, index) => {
                if (item.data.code == code) {
                    value = item;
                }
                if (item.children.length > 0) {
                    loops(item.children, code);
                }
            })
        }
        loops(permissionTableData, code);
        return value;
    }
 
    //checkbox循环事件  flag是否选中 code唯一标识  type查看或者编辑
    changeFlag = (flag, code, type) => {
        let { permissionTableData } = this.state;
        //递归循环
        let loops = (data, flag, code, type) => {
            data.map((item, index) => {
                if (item.data.code == code) {
                    item.data[type] = flag ? "Y" : "N";
                    item[type + 'indeterminate'] = false;
                    if (item.data.parent_code) {
                        //子级选中父级也选中
                        let childAndParent_Select = (code, type) => {
                            let parent = this.getItem(code);
                            if (parent.children.length > 0) {
                                let all = parent.children.every((item1) => {
                                    return item1.data[type] == "Y"&&item1[type + "indeterminate"] == false;
                                })
                                let some = parent.children.some((item1) => {
                                    return item1.data[type] == "Y";
                                })
                                if (all) {
                                    parent[type + 'indeterminate'] = false;
                                    parent.data[type] = "Y"
                                } else if (some) {
                                    parent[type + 'indeterminate'] = true;
                                    parent.data[type] = "Y"
                                } else {
                                    parent[type + 'indeterminate'] = false;
                                    parent.data[type] = "N"
                                }
                            }
                            if (parent.data.parent_code) {
                                childAndParent_Select(parent.data.parent_code, type)
                            }
                        }
                        childAndParent_Select(item.data.parent_code, type);
                    }
                    if (item.children.length > 0) {
                        //父亲选中，子级全选中，实现全选反选
                        let parentAndChild_Select = (data, flag, type) => {
                            data.map((item1, index) => {
                                item1.data[type] = flag ? "Y" : "N";
                                item1[type + 'indeterminate'] = false;
                                if (item1.children.length > 0) {
                                    parentAndChild_Select(item1.children, flag, type);
                                }
                            })
                        }
                        parentAndChild_Select(item.children, flag, type);
                    }
                }
 
                if (item.children.length > 0) {
                    loops(item.children, flag, code, type);
                }
            })
        }
        loops(permissionTableData, flag, code, type);
        this.setState({
            permissionTableData: permissionTableData
        }, () => {
            console.log(this.state)
        })
    }
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        // setCoverChecked(e.target.checked)
        this.setState({
            menuChecked: e.target.checked
        })
      }
    //查看checkbox onchange事件 e--chekcbox值 code当前唯一标识
    ViewonChange = (e, code, type) => {
        let flag = e.target.checked;
        this.changeFlag(flag, code, type);
    }
    //编辑checkbox onchange事件 e--chekcbox值 code当前唯一标识
    EditonChange = (e, code, type) => {
        let flag = e.target.checked;
        this.changeFlag(flag, code, type);
    }
    //Y与N和true/false的转换
    transformation = (text) => {
        if (text == "Y") {
            return false;
        } else if (text == "N") {
            return true;
        } else {
            return false;
        }
    }
 
    //编辑配置
    editMenu = () => {
        let col = [
            {
                title: '菜单名称',
                // dataIndex: 'data.name'
                dataIndex: 'name'
            },
            {
                title: '查看权限',
                // dataIndex: 'data.has_view',
                dataIndex: 'has_view',
                render: (text, record) => {
                    return (
                        <>
                            <Checkbox //参考antd Checkbox API
                                checked={text == "Y" ? true : false}//是否选中
                                disabled={this.transformation(record.data.enable_view)}//是否仅用
                                onChange={(e) => this.ViewonChange(e, record.data.code, "has_view")}//change事件
                                indeterminate={record['has_viewindeterminate'] ? true : false} //全选与反选状态
                            >
 
                            </Checkbox>
                        </>
                    )
                }
            },
            {
                title: '查看权限',
                // dataIndex: 'data.has_edit',
                dataIndex: 'has_edit',
                render: (text, record) => {
                    return (
                        <>
                            <Checkbox //参考antd Checkbox API
                                checked={text == "Y" ? true : false}//是否选中
                                disabled={this.transformation(record.data.enable_edit)}//是否仅用
                                onChange={(e) => this.EditonChange(e, record.data.code, "has_edit")}//change事件
                                indeterminate={record['has_editindeterminate'] ? true : false} //全选与反选状态
                            >
 
                            </Checkbox>
                        </>
                    )
                }
            }
        ]
        this.setState({
            editFlag: true,
            columns: col
        })
    }
    //扁平化数组（tree）变为一维数组
    FlatArray = (data, val) => {
        if (data.length == 0) {
            return [];
        }
        let arr = [];
        data.map((item) => {
            arr.push(item.data);
            if (item.children.length > 0) {
                arr = arr.concat(this.FlatArray(item.children));
            }
        })
        return arr;
    }
    //保存
    saveMenu = () => {
        let { permissionTableData, yTreeData, menuChecked } = this.state;
        let col = [
            {
                title: '菜单名称',
                dataIndex: 'data.name'
            },
            {
                title: '查看权限',
                dataIndex: 'data.has_view',
                render: (text, record) => {
                    return (
                        <>
                            <Checkbox //参考antd Checkbox API
                                // checked={text == "Y" ? true : false}//是否选中
                                checked={menuChecked}
                                // disabled={true}//是否仅用
                                onChange={this.onChange}
                                indeterminate={record['has_viewindeterminate'] ? true : false} //全选与反选状态
                            >
 
                            </Checkbox>
                        </>
                    )
                }
            },
            {
                title: '查看权限',
                dataIndex: 'data.has_edit',
                render: (text, record) => {
                    return (
                        <>
                            <Checkbox //参考antd Checkbox API
                                // checked={text == "Y" ? true : false}//是否选中
                                checked={menuChecked}
                                // disabled={true}//是否仅用
                                onChange={this.onChange}
                                indeterminate={record['has_editindeterminate'] ? true : false} //全选与反选状态
                            >
 
                            </Checkbox>
                        </>
                    )
                }
            }
        ]
        this.setState({
            editFlag: false,
            columns: col
        })
    }
    //对比差异 传两个数组找出变化的项
    ContrastDifferences = (data1, data) => {
        if (data1.length == 0 || data.length == 0) {
            return [];
        }
        let changeArr = [];
        data1.map((item, index) => {
            if (item.has_view != data[index].has_view || item.has_edit != data[index].has_edit) {
                changeArr.push(item);
            }
        })
        return changeArr;
    }
    render() {
        const { columns, permissionTableData, loading, editFlag } = this.state;
        console.log('wjj', columns, permissionTableData, loading, editFlag )
        return (
            <div>
 
                {
                    editFlag ? <Button onClick={this.saveMenu}>保存</Button> : <Button onClick={this.editMenu}>编辑</Button>
                }
                <Table //参考antd Table API
                    columns={columns} //表格表头
                    dataSource={permissionTableData}//表格数据
                    loading={loading} //loading状态
                    scroll={{ y: 400, x: 1000 }} //滚动
                    pagination={false} //分页
                ></Table>
            </div>
        )
    }
 
}
export default index;