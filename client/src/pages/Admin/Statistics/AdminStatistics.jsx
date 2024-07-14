import { CommentOutlined, UserOutlined, CoffeeOutlined, EnvironmentOutlined } from "@ant-design/icons"
import { Card, Space, Statistic, Table, Tag } from 'antd'
import React from 'react'
import './AdminStatistics.css';
import useData from '@/hooks/useData';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Bar, Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// https://github.com/reactchartjs/react-chartjs-2#docs

export const AdminStatistics = () => {

  const {
		1: loadingDataUsers,
		2: dataUsers,
		4: fetchUsers,
		9: countUsers,
	} = useData('/users', null);

  const {
		1: loadingDataRecipes,
		2: dataRecipes,
		4: fetchRecipes,
		9: countRecipes,
	} = useData('/recipes', null);

  const {
		1: loadingDataThreads,
		2: dataThreads,
		4: fetchThreads,
		9: countThreads,
	} = useData('/threads', null);

  const {
		1: loadingDataMarkers,
		2: dataMarkers,
		4: fetchMarkers,
		9: countMarkers,
	} = useData('/markers', null);

  const {
		1: loadingDataCategories,
		2: dataCategories,
		4: fetchCategories,
		9: countCategories,
	} = useData('/categories', null);
  
  return (
    <div className="container">
      <div className="cardBox">
          <div className="card">
            <DashboardCard
              icon={<UserOutlined style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 30,
                fontSize: '2.5em',
                padding: 10
              }} />}
              title={<span style={{ fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'Sora' }}>Usuarios Registrados</span>}
              value={countUsers} />
          </div>
          <div className="card">
            <DashboardCard
              icon={<CoffeeOutlined style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 30,
                fontSize: '2.5em',
                padding: 8
              }} />}
              title={<span style={{ fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'Sora' }}>Recetas Publicadas</span>}
              value={countRecipes} />
          </div>
          <div className="card">
            <DashboardCard
              icon={<CommentOutlined style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 30,
                fontSize: '2.5em',
                padding: 8
              }} />}
              title={<span style={{ fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'Sora' }}>Hilos Creados</span>}
              value={countThreads} />
          </div>
          <div className="card">
            <DashboardCard
              icon={<EnvironmentOutlined style={{
                color: "purple",
                backgroundColor: "rgba(255,0,255,0.25)",
                borderRadius: 30,
                fontSize: '2.5em',
                padding: 8
              }} />}
              title={<span style={{ fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'Sora' }}>Marcadores (Mapa)</span>}
              value={countMarkers} />
          </div>
      </div>
      <div className="graphBox">
        <div className="box">
          <DashboardBarChart dataUsers = {dataUsers}/>
        </div>
        <div className="box">
          <DashboardDoughnutChart dataCategories = {dataCategories} dataRecipes = {dataRecipes}/>
        </div>
        <div className="box">
          <ResumenTabla recetas={dataRecipes} marcadores={dataMarkers} publicaciones={dataThreads} usuarios={dataUsers}/>
        </div>
        <div className="box">
          <DashboardPolarAreaChart  dataCategories = {dataCategories} dataMarkers = {dataMarkers}/>
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card
      bordered={false}
      style={{ width: '100%', borderRadius: 20 }}>
      <Space direction="horizontal" size="large" align= "center">
        {icon}
        <Statistic title={title} value={value} valueStyle={{ fontSize: '3em'}}/>
      </Space>
    </Card>
  );
}

function DashboardBarChart({dataUsers}) {

  const labels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  const usersPerMonth = labels.map((label, index) => {
    const monthIndex = index;
    const usersThisMonth = dataUsers.filter(user => {
      const userDate = new Date(user.createdAt);
      return userDate.getMonth() === monthIndex;
    });
    return usersThisMonth.length;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Usuarios por Mes',
        data: usersPerMonth,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Usuarios Por Mes",
        font: {
          size: 20,
          weight: 'bold',
          family: 'Sora',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold', 
            family: 'Sora',
          },
        },
      },
      y: {
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            weight: 'bold', 
            family: 'Sora',
          },
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
}

function DashboardDoughnutChart({dataCategories,dataRecipes}) {

  const recetaCategories = dataCategories.filter(category => category.type === "R");
  const recetaLabels = recetaCategories.map(category => category.name);

  const recetasPorCategoria = {};
  dataRecipes.forEach(recipe => {
    const categoryId = recipe.category.name.toString();
    if (!recetasPorCategoria[categoryId]) {
      recetasPorCategoria[categoryId] = 1;
    } else {
      recetasPorCategoria[categoryId]++;
    }
  });

  const data = {
    
    labels: recetaLabels,
    datasets: [
      {
        label: 'Cantidad de Recetas',
        data: recetaLabels.map(label => recetasPorCategoria[label] || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Recetas Por Categoría',
        font: {
          size: 20,
          weight: 'bold',
          family: 'Sora',
        },
      },
      legend: {
        display: true,
        labels: {
          font: {
            size: 12,
            weight: 'bold',
            family: 'Sora',
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options}/>;
}

function DashboardPolarAreaChart({dataCategories,dataMarkers}) {

  const markersCategories = dataCategories.filter(category => category.type === "M");
  const markersLabels = markersCategories.map(category => category.name);
 
  const marcadoresPorCategoria = {};

  dataMarkers.forEach(marker => {
    const categoryId = marker.category.name;
    if (!marcadoresPorCategoria[categoryId]) {
      marcadoresPorCategoria[categoryId] = 1;
    } else {
      marcadoresPorCategoria[categoryId]++;
    }
  });

  const data = {
    labels: markersLabels,
    datasets: [
      {
        label: 'Cantidad de Marcadores',
        //data: markersLabels.map(label => marcadoresPorCategoria[label] || 0),
        data: [1,2,3],
        backgroundColor: [
         
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Marcadores Por Categoría',
        font: {
          size: 20,
          weight: 'bold',
          family: 'Sora',
        },
      },
      legend: {
        display: true,
        labels: {
          font: {
            size: 12,
            weight: 'bold',
            family: 'Sora',
          },
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
}

function ResumenTabla({ recetas, marcadores, publicaciones, usuarios }) {
  const userData = {};

  usuarios.forEach(usuario => {
    userData[usuario._id] = { usuario, recetas: 0, marcadores: 0, publicaciones: 0 };
  });

 recetas.forEach(receta => {
  userData[receta.user._id].recetas++;
});

  marcadores.forEach(marcador => {
    userData[marcador.user._id].marcadores++;
  });

  publicaciones.forEach(publicacion => {
    userData[publicacion.user._id].publicaciones++;
  });

  const data =Object.values(userData).map(userItem => ({
    ...userItem,
    key: userItem.usuario._id,
  }));

  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
      render: usuario => usuario ? `${usuario.name} ${usuario.lastname}` : '',
      className: 'custom-column',
      sorter: (a, b) => `${a.usuario.name} ${a.usuario.lastname}`.localeCompare(`${b.usuario.name} ${b.usuario.lastname}`),
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Rol',
      dataIndex: 'usuario',
      key: 'rol',
      render: usuario => usuario ? `${capitalize(usuario.role)}` : '',
      className: 'custom-column',
      //sorter: (a, b) => `${a.usuario.role}`.localeCompare(`${b.usuario.role}`),
    },
    {
      title: 'Recetas',
      dataIndex: 'recetas',
      key: 'recetas',
      render: recetas => <Tag color="rgba(0,255,0,0.5)" className="custom-tag">{recetas}</Tag>,
      className: 'custom-column',
    },
    {
      title: 'Marcadores',
      dataIndex: 'marcadores',
      key: 'marcadores',
      render: marcadores => <Tag color="rgba(255,0,255,0.5)" className="custom-tag">{marcadores}</Tag>,
      className: 'custom-column',
    },
    {
      title: 'Publicaciones',
      dataIndex: 'publicaciones',
      key: 'publicaciones',
      render: publicaciones => <Tag color="rgba(255,0,0,0.5)" className="custom-tag">{publicaciones}</Tag>,
      className: 'custom-column',
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={{ position: ['bottomCenter'], pageSize: 3 }} className="custom-table"/>;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}