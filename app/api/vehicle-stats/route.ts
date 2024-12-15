import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Handle POST request for inserting data
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate payload
        const location = body.location ?? '';
        const car_count = body.car_count ?? 0;
        const motorbike_count = body.motorbike_count ?? 0;
        const truck_count = body.truck_count ?? 0;
        const bus_count = body.bus_count ?? 0;

        if (!location) {
            return NextResponse.json(
                { error: 'Location is required.' },
                { status: 400 }
            );
        }

        const timestamp = new Date();

        const query = `
            INSERT INTO counts (timestamp, location, car_count, motorbike_count, truck_count, bus_count)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                car_count = car_count + VALUES(car_count),
                motorbike_count = motorbike_count + VALUES(motorbike_count),
                truck_count = truck_count + VALUES(truck_count),
                bus_count = bus_count + VALUES(bus_count);
        `;

        const values = [
            timestamp,
            location,
            car_count,
            motorbike_count,
            truck_count,
            bus_count,
        ];

        console.log('Executing query with values:', values);

        // Execute the query
        await pool.execute(query, values);

        return NextResponse.json(
            { message: 'Counts updated successfully', data: body },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error updating counts:', error);

        return NextResponse.json(
            { error: 'Internal server error', details: error },
            { status: 500 }
        );
    }
}

// Handle GET request for retrieving data
export async function GET() {
    try {
        const query = 'SELECT * FROM counts ORDER BY timestamp DESC LIMIT 10'; // Example query to get the latest 10 entries
        const [rows] = await pool.execute(query);

        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving data from /api/vehicle-stats:', error);
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}

