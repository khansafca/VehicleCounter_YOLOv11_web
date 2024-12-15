'use client'


import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import io from 'socket.io-client'
import Image from 'next/image';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface VehicleStats {
  car: number;
  motorcycle: number;
  truck: number;
  bus: number;
}

interface GraphData {
  timestamps: string[];
  car: number[];
  truck: number[];
  motorcycle: number[];
  bus: number[];
}

interface UpdateCounterData {
  car: number;
  motorbike: number;
  truck: number;
  bus: number;
}

interface UpdateGraphData {
  timestamps: string[];
  car: number[];
  motorbike: number[];
  truck: number[];
  bus: number[];
}

export default function Dashboard() {
  const [vehicleStats, setVehicleStats] = useState<VehicleStats>({
    car: 0,
    motorcycle: 0,
    truck: 0,
    bus: 0,
  });

  const [graphData, setGraphData] = useState<GraphData>({
    timestamps: [],
    car: [],
    truck: [],
    motorcycle: [],
    bus: [],
  });



  useEffect(() => {
    const socket = io('http://localhost:5003');

    socket.on('update_counter', (data: UpdateCounterData) => {
      setVehicleStats({
        car: data.car,
        motorcycle: data.motorbike,
        truck: data.truck,
        bus: data.bus,
      });
    });


    socket.on('update_graph', (data: UpdateGraphData) => {
      setGraphData({
        timestamps: data.timestamps,
        car: data.car,
        truck: data.truck,
        motorcycle: data.motorbike,
        bus: data.bus,
      })
    })


    return () => {
      socket.disconnect()
    }
  }, [])


  const chartData = {
    labels: graphData.timestamps,
    datasets: [
      { label: 'Car', data: graphData.car, borderColor: 'blue', borderWidth: 2 },
      { label: 'Truck', data: graphData.truck, borderColor: 'red', borderWidth: 2 },
      { label: 'Motorbike', data: graphData.motorcycle, borderColor: 'green', borderWidth: 2 },
      { label: 'Bus', data: graphData.bus, borderColor: 'purple', borderWidth: 2 },
    ],
  }


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { beginAtZero: true, title: { display: true, text: 'Count' } },
    },
  }


  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Vehicle Counting Dashboard</h1>


        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
            <p className='text-gray-400'>No Feed</p>
            <Image
              src="/api/video-feed"
              alt="Video Feed"
              layout="fill"
              className="w-full h-full rounded-lg"
            />
          </div>


          <div>
            <h2 className="text-2xl font-bold mb-4">Vehicle Stats</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4">Vehicle Count</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">{vehicleStats.car}</div>
                  <div className="text-gray-600">Car</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{vehicleStats.motorcycle}</div>
                  <div className="text-gray-600">Motorbike</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{vehicleStats.truck}</div>
                  <div className="text-gray-600">Truck</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{vehicleStats.bus}</div>
                  <div className="text-gray-600">Bus</div>
                </div>
              </div>
            </div>


            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Real-Time Vehicle Count Graph</h3>
              <div style={{ height: '300px' }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}