import axios from 'axios';

const todosUrl = 'https://jsonplaceholder.typicode.com';

const firstApiAxios = axios.create({
    baseURL: todosUrl,
    method: "GET",
    // timeout: 5000,
    withCredentials: true,
});

export const getTodos = async () => {
    try {
        const response = await firstApiAxios.get(`/todos`, {
            params: { offset: 0, limit: 10 },
        })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error, 'error');
            throw error;
        }
        else if (error instanceof Error) {
            console.log(error.message);
            throw error;
        }
    }
}