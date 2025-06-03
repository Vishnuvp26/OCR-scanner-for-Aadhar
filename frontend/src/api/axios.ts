import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export async function uploadAdhar(front: File, back: File) {
    const formData = new FormData();
    formData.append('front', front);
    formData.append('back', back);

    try {
        const response = await axios.post(`${apiUrl}/api/upload`, formData);
        return response.data;
    } catch (error: any) {
        console.error('Error uploading Aadhar:', error);
        throw error?.response?.data || new Error('Upload failed');
    }
};