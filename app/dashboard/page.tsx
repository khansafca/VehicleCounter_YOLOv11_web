'use client';

import { useEffect, useState } from 'react';
import VehicelStatsTable from "@/components/VehicelStatsTable";

export type VehicleStatsResponse = {
    count_id: number,
    timestamp: string,
    location: string,
    car_count: number,
    motorbike_count: number,
    truck_count: number,
    bus_count: number
};

const History = () => {
    const [data, setData] = useState<VehicleStatsResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVehicleStats = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/vehicle-stats');
            const result = await response.json();
            setData(result.data || []);
        } catch (error) {
            console.error("Error fetching vehicle stats:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchVehicleStats(); // Initial fetch
        const intervalId = setInterval(fetchVehicleStats, 5000); // Fetch every 5 seconds
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (data.length === 0) {
        return <h1>No data</h1>;
    }

    return (
        <div className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12">History</h1>
                <VehicelStatsTable data={data} />
            </div>
        </div>
    );
};

export default History;
