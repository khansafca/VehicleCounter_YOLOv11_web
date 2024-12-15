import { useEffect, useState } from "react";
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

export interface VehicleStats {
    car: number,
    motorbike: number,
    bus: number,
    truck: number
}

export interface GraphData {
    timestamps: string[],
    car: number[],
    truck: number[],
    motorbike: number[],
    bus: number[],
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function VehicleGraphs({ vehicleStats }: { vehicleStats: VehicleStats }) {

    const [graphData, setGraphData] = useState<GraphData>({
        timestamps: [],
        car: [],
        truck: [],
        motorbike: [],
        bus: [],
    });

    useEffect(() => {
        setGraphData(prevData => {
            const timestamp = new Date().toLocaleTimeString();
            const newTimestamps = [...prevData.timestamps, timestamp];
            const newCarData = [...prevData.car, vehicleStats.car];
            const newTruckData = [...prevData.truck, vehicleStats.truck];
            const newMotorbikeData = [...prevData.motorbike, vehicleStats.motorbike];
            const newBusData = [...prevData.bus, vehicleStats.bus];

            if (newTimestamps.length > 12) {
                newTimestamps.shift();
                newCarData.shift();
                newTruckData.shift();
                newMotorbikeData.shift();
                newBusData.shift();
            }

            return {
                timestamps: newTimestamps,
                car: newCarData,
                truck: newTruckData,
                motorbike: newMotorbikeData,
                bus: newBusData,
            };
        });
    }, [vehicleStats])

    const chartData = {
        labels: graphData.timestamps,
        datasets: [
            { label: 'Car', data: graphData.car, borderColor: 'blue', borderWidth: 2 },
            { label: 'Truck', data: graphData.truck, borderColor: 'red', borderWidth: 2 },
            { label: 'Motorbike', data: graphData.motorbike, borderColor: 'green', borderWidth: 2 },
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
                        <div className="text-2xl font-bold">{vehicleStats.motorbike}</div>
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
    )
}

