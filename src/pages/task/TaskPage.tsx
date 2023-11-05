import React, {useEffect, useState} from 'react';
import TaskList from '../../components/task/TaskList/TaskList';
import TaskCreationButton from '../../components/task/TaskCreationButton';
import TaskCreationForm from '../../components/task/TaskCreationForm';
import {
    cancelFolderTask,
    createTask,
    getTasks,
    resumeFolderTask,
    stopFolderTask,
    Task,
    TaskRequest
} from "../../services/TaskService";
import {useAuth} from "../../utils/IAuthContext";

const TaskPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[] | null>(null); // Mock task data structure
    const [showTaskCreationForm, setShowTaskCreationForm] = useState(false);
    const {id, token} = useAuth();
    useEffect(() => {
        const intervalId = setInterval(fetchTasks, 5000); // Fetch tasks every 5 seconds
        fetchTasks(); // Fetch tasks initially
        return () => {
            clearInterval(intervalId); // Clean up the interval when the component is unmounted
        };
    }, [id]);
    const fetchTasks = async (): Promise<void> => {
        if (id != null) {
            try {
                let fetchedTasks = await getTasks(id, token);
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks', error);
            }
        }
    };
    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks?.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            ) ?? null
        );
    };

    const handleStop = async (taskId: string) => {
        if (id !== null && token !== null) {
            try {
                const updatedTask = await stopFolderTask(id, taskId, token);
                console.log("Task stopped:", updatedTask);
                updateTask(updatedTask);
            } catch (error) {
                console.error("Failed to stop task", error);
            }
        }
    };

    const handleCancel = async (taskId: string) => {
        if (id !== null && token !== null) {
            try {
                const updatedTask = await cancelFolderTask(id, taskId, token);
                console.log("Task canceled:", updatedTask);
                updateTask(updatedTask);
            } catch (error) {
                console.error("Failed to cancel task", error);
            }
        }
    };

    const handleResume = async (taskId: string) => {
        if (id !== null && token !== null) {
            try {
                const updatedTask = await resumeFolderTask(id, taskId, token);
                console.log("Task resumed:", updatedTask);
                updateTask(updatedTask);
            } catch (error) {
                console.error("Failed to resume task", error);
            }
        }
    };
    const handleTaskCreation = async (sourceFolderId: number) => {
        // Create the task object with the specified complexity
        const task: TaskRequest = {
            name: 'New Task',
            sourceFolderId: sourceFolderId,
            destinationFolderId: sourceFolderId
            // Other task properties, if any
        };
        try {
            const createdTask = await createTask(id, task, token);
            console.log('Task Created with complexity:', createdTask);
            // Add the created task to the tasks array
            setTasks(prevTasks => [
                ...(prevTasks || []), // Preserve the previous tasks, or use an empty array if prevTasks is null.
                createdTask,
            ]);
            setShowTaskCreationForm(false);
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    return (
        <div>
            <TaskList tasks={tasks} onStop={handleStop} onCancel={handleCancel} onResume={handleResume}/>
            <TaskCreationButton onClick={() => setShowTaskCreationForm(true)}/>
            <TaskCreationForm
                visible={showTaskCreationForm}
                onCreate={handleTaskCreation}
                onCancel={() => setShowTaskCreationForm(false)}
            />
        </div>
    );
};

export default TaskPage;