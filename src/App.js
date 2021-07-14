import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Layout, DatePicker, Table, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import moment from 'moment';
import './App.css';
import 'antd/dist/antd.css';
function App() {
  const { Header, Content, Footer } = Layout;
  const { RangePicker } = DatePicker;
  const [productsRandomData, setProductsRandomData] = useState([]);
  const [selectedProductsRandomData, setSelectedProductsRandomData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const columnData =
    [
      {
        title: 'Date',
        dataIndex: 'date',
      },
      {
        title: 'Product',
        dataIndex: 'name',
      },
      {
        title: 'Value',
        dataIndex: 'value',
      },
    ];

  useEffect(() => {
    selectedProductsRandomData.map(item => console.log('map >> ',item.date.toString()));
    setLabels(selectedProductsRandomData.map(item => moment(item.date).format('DD/MM/YYYY')));
  }, [selectedProductsRandomData])

  const onChange = (e) => {
    if (!e) {
      return;
    }
    const [startDate, endDate] = e;
    setStartDate(startDate);
    setEndDate(endDate);
    setProductsRandomData(generateTheRandomProductData({
      startDate,
      endDate
    }));
    setSelectedProductsRandomData(generateTheRandomProductData({
      startDate,
      endDate
    }));
  }

  const generateTheRandomProductData = ({ startDate, endDate }) => {
    var productDetailsArray = { p1: [], p2: [] };
    for (var current = moment(startDate); current.isSameOrBefore(moment(endDate)) === true; current = moment(current).add(1, 'day')) {
      productDetailsArray.p1.push({
        name: 'P1',
        value: moment(current).isAfter(moment(new Date())) ? Math.floor(Math.random() * 100) * 0.05 : Math.floor(Math.random() * 100),
        date: moment(current).format('DD/MM/YYYY')
      })
      productDetailsArray.p2.push({
        name: 'P2',
        value:  moment(current).isAfter(moment(new Date())) ? Math.floor(Math.random() * 100) * 0.05 : Math.floor(Math.random() * 100),
        date: moment(current).format('DD/MM/YYYY')
      })
    }
    return productDetailsArray.p1.concat(productDetailsArray.p2)
  }

  const randomizeButtonClicked = () => {
    setProductsRandomData(generateTheRandomProductData({
      startDate,
      endDate
    }));
    setSelectedProductsRandomData(generateTheRandomProductData({
      startDate,
      endDate
    }));
  }


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Product Value',
        data: selectedProductsRandomData.map(item => item.value),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(0,0,255)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    elements: {
      point: {
        pointStyle: 'none'
      }
    }
  };

  const LineChart = () => (
    <>
      <div className='header'>
        <h1 className='title'>Product Details</h1>
        <div className='links'>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );

  const handleMenuClick = (e) => {
    console.log('e >> ', e);
    if (e.key === '1') {
      setSelectedProductsRandomData(productsRandomData.filter(item => item.name === 'P1'))
    } else if (e.key === '2') {
      setSelectedProductsRandomData(productsRandomData.filter(item => item.name === 'P2'))
    } else {
      setSelectedProductsRandomData(productsRandomData)
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" >
        Product 1
      </Menu.Item>
      <Menu.Item key="2" >
        Product 2
      </Menu.Item>
      <Menu.Item key="3" >
        Product 1 & 2
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
        Randomize Product Data
        </Header>
        <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
          <div className="site-layout-content">
            <div style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              flexBasis: '50%'
            }}>
              <span style={{ textAlign: 'start', fontWeight: 400 }}>Select date range</span>
              <RangePicker picker="date" onChange={onChange} />
              <br />
              <LineChart />
              <Dropdown overlay={menu}>
                <Button style={{ marginTop: '10px' }}>
                  Select Product <DownOutlined />
                </Button>
              </Dropdown>
              <br />
            </div>
            <div style={{
              width: '50%', paddingLeft: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
              <Table
                columns={columnData}
                dataSource={productsRandomData}
                pagination={false}
                scroll={{ y: 200 }}
              />
              <Button
                style={{
                  marginTop: '10px'
                }}
                type="primary"
                onClick={randomizeButtonClicked}
              >
                Randomize
              </Button>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Help | FAQ | Resources</Footer>
      </Layout>,
    </div >
  );
}

export default App;
