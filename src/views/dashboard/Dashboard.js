import React, { useEffect } from 'react';
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router';
import { Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    const flag = localStorage.getItem('LoginProcess');
    if (flag !== 'true') {
      history.push('/Login');
    }
  }, [history]);

  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#fff',
        borderColor: '#fff',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  useEffect(() => {
    const ctx = document.getElementById('myLineChart').getContext('2d');
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: graphData,
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white'
            }
          },
          y: {
            ticks: {
              color: 'white' // y-axis labels အရောင်ကို အဖြူ ပြောင်းပါ
            }
          }
        }
      }
    });

    const pieCtx = document.getElementById('myPieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: pieData,
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white' 
            }
          }
        }
      }
    });

    return () => {
      lineChart.destroy();
      pieChart.destroy();
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div>
            <div className="numbers">2442</div>
            <div className="cardName">Views</div>
            <div className="iconBox">
              <img
                src="/image/eye.png"
                style={{
                  width: '70px',
                  height: '70px'
                }}
                alt="views"
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">94.000</div>
            <div className="cardName">Orders</div>
            <div className="iconBox">
              <img
                src="/image/cart.png"
                style={{
                  width: '90px',
                  height: '90px'
                }}
                alt="orders"
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">11345</div>
            <div className="cardName">Employee</div>
            <div className="iconBox">
              <img
                src="/image/people.png"
                style={{
                  width: '80px',
                  height: '80px',
                  alignItems: 'center'
                }}
                alt="employee"
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">$7200</div>
            <div className="cardName">Earnings</div>
            <div className="iconBox">
              <img
                src="/image/earning.png"
                style={{
                  width: '80px',
                  height: '80px'
                }}
                alt="earnings"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="graph-container">
          <canvas id="myLineChart"></canvas>
        </div>
        <div className="pie-chart-container">
          <canvas id="myPieChart"></canvas>
        </div>
      </div>

      <style jsx>{`
        .container {
          background-color: brown;
          overflow: hidden;
          padding: 20px;
        }
        .card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin: 10px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .numbers {
          font-size: 2em;
          font-weight: bold;
          color: brown;
        }
        .cardName {
          font-size: 1.5em;
          color: black;
        }
        .iconBox img {
          max-width: 80%;
        }
        .graph-container,
        .pie-chart-container {
          margin-top: 20px;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
