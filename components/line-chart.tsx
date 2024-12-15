'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function LineChart() {
  const data = {
    labels: Array.from({ length: 12 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Vehicles',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Number of Vehicles'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vehicle Count Over Time'
      }
    }
  }

  return <Line options={options} data={data} />
}

