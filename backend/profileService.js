import axios from 'axios';

// Base URL for the profile API
// Ensure your backend is running on this port
const API_URL = 'http://localhost:5000/api/profile';

// Fetch the profile data
export const getProfile = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

// Create a new profile
export const createProfile = async (profileData) => {
    try {
        const response = await axios.post(API_URL, profileData);
        return response.data;
    } catch (error) {
        console.error("Error creating profile:", error);
        throw error;
    }
};