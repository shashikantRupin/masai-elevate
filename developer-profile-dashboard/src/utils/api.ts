import axios from 'axios';
import { User } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUser = async (userId: number = 1): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};