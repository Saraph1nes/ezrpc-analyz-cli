import {h, render, Component} from 'preact';
import {observer} from "mobx-react";
import {Pie} from '@ant-design/plots';
import {Button, Table} from 'antd';

import {convert2PieData} from "../utils";
import {store} from '../store';

@observer
class Chart extends Component {
  state = {
    tableDataSource: store.analyzerData
  }

  onReadyPie = (plot) => {
    plot.on('element:click', (e) => {
      const filter = store.analyzerData.filter((item) => {
        return item.name === e.data.data.type;
      });
      this.setState({
        tableDataSource: filter
      })
    });
  }

  handleShowAll = () => {
    this.setState({
      tableDataSource: store.analyzerData
    })
  }

  render() {
    const {tableDataSource} = this.state;
    const data = convert2PieData(store.analyzerData);
    const config = {
      height: 600,
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      label: {
        labelHeight: 28,
        content: '{name}',
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
    };

    const columns = [
      {
        title: '组件',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '查看代码',
        dataIndex: 'code',
        key: 'code',
        render: (text, record, index) => {
          return <Button onClick={() => {
            if (!store.projectName) return alert('获取项目名失败');
            if (!store.branchName) return alert('获取分支名失败');
            window.open(`https://gitlab.ezrpro.in/fe-biz/${store.projectName}/blob/${store.branchName}/${record.path.replace(/\\/g, "/")}`, '_blank');
          }}>查看代码</Button>
        }
      }
    ];

    return <>
      <Pie {...config} onReady={this.onReadyPie}/>
      <div style={{marginTop: '50px'}}>
        <Button onClick={this.handleShowAll}>显示全部</Button>
        <Table style={{marginTop:'20px'}} dataSource={tableDataSource} columns={columns}/>
      </div>
    </>
  }
}

export default Chart;
