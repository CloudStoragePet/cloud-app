const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || '/api'; // read the environment variable or use '/api' as a fallback

export interface Task {
    id: string;
    sourceFolderId: number;
    destinationFolderId: number;
    userId: number;
    status: string;
    progress: number;
}
export interface TaskRequest {
    sourceFolderId: number;
    destinationFolderId: number;
    name: string;
}

export const getTasks = async (userId: number | null, token: string | null): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/storage/folder/task/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
         // Type the response data
        return await response.json();
    } else {
        throw new Error('Failed to fetch tasks');
    }
};

export const getTask = async (userId: number, taskId: string, token: string | null): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/storage/folder/task/${userId}/${taskId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        const responseData: { task: Task } = await response.json(); // Type the response data
        return responseData.task;
    } else {
        throw new Error('Failed to fetch task');
    }
};

export const createTask = async (userId: number | null, task: TaskRequest, token: string | null): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/storage/folder/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });
    if (response.ok) {
         // Type the response data
        return await response.json();
    } else {
        throw new Error('Failed to create task');
    }
};