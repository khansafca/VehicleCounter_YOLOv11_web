import axios from 'axios';

const getAllVehicleStats = async () => {
    try {
        const response = await axios.get(`${process.env.BACK_END_URL}/api/vehicle-stats`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching vehicle stats:', error);
        throw error;
    }
};

export default getAllVehicleStats;