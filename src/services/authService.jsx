import axios from 'axios';
import PropTypes from 'prop-types';

// API base URL for VancePay
const BASE_URL = 'https://api.vancipay.com/api/v1/';

// Secure headers for all requests
const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token if logged in
});

// Error handler (you can create this separately for detailed error handling)
const handleError = (error) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error Response:', error.response.data);
        throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
        // Request was made but no response
        console.error('No Response:', error.request);
        throw new Error('No response from server');
    } else {
        // Something else went wrong
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};

// Validate parameters for API calls
const validateParams = (path, method, body) => {
    if (typeof path !== 'string' || !path) {
        throw new Error('Invalid or missing API path.');
    }
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(method)) {
        throw new Error(`Invalid HTTP method: ${method}. Allowed methods: ${allowedMethods.join(', ')}`);
    }
    if (body && typeof body !== 'object') {
        throw new Error('Invalid body parameter; must be an object.');
    }
};

// Reusable API request handler
const apiRequest = async (path, method = 'POST', body = null) => {
    try {
        // Validate path, method, and body
        validateParams(path, method, body);

        const response = await axios({
            url: `${BASE_URL}${path}`,
            method,
            headers: getHeaders(),
            data: body, // Data only sent for POST, PUT
        });

        // Return response data if the request is successful
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

// Login service
export const login = async (email, password) => {
    try {
        const data = await apiRequest('login', 'POST', { email, password });

        // Assuming API response contains these fields
        const { token, username, role, userImage } = data;

        // Store user details in local storage
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', "Super Admin" || "Guest");
        localStorage.setItem('role', "admin"  || "firstUser");
        localStorage.setItem('userImage', userImage);

        return data; // Return data for further use in the app
    } catch (error) {
        throw error;
    }
};

// Signup service
export const signup = async (userDetails) => {
    try {
        const data = await apiRequest('signup', 'POST', userDetails);
        return data;
    } catch (error) {
        throw error;
    }
};

// Ensure prop-types for secure API calls
apiRequest.propTypes = {
    path: PropTypes.string.isRequired,
    method: PropTypes.oneOf(['GET', 'POST', 'PUT', 'DELETE']),
    body: PropTypes.object,
};