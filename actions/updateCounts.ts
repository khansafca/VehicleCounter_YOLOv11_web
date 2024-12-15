interface VehicleStats {
    car: number;
    motorbike: number;
    truck: number;
    bus: number;
}

interface Payload {
    location: string;
    car_count: number;
    motorbike_count: number;
    truck_count: number;
    bus_count: number;
}

export default async function updateCount(vehicleStats: VehicleStats, location: string) {
    function allValuesAreZero(stats: VehicleStats): boolean {
        return Object.values(stats).every((value) => value === 0);
    }

    if (allValuesAreZero(vehicleStats)) {
        console.log('All vehicle counts are zero. Skipping update.');
        return;
    }

    const payload = {
        location: location || 'Unknown',
        car_count: vehicleStats.car ?? 0,
        motorbike_count: vehicleStats.motorbike ?? 0,
        truck_count: vehicleStats.truck ?? 0,
        bus_count: vehicleStats.bus ?? 0,
    };

    console.log('Payload being sent:', JSON.stringify(payload));

    try {
        const response1 = await fetch('/api/updateCounts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response1.ok) {
            console.error('Error sending data to /api/updateCounts:', await response1.text());
        }
    } catch (error) {
        console.error('Error in updateCount:', error);
    }
}
