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

import './css/TaskPage.css';
import {message} from "antd";

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
                message.error("Failed to stop task");
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
                message.error("Failed to cancel task");
            }
        }
    };

    const handleResume = async (taskId: string) => {
        if (id !== null && token !== null) {
            if (!isFreeResourcesForTask()) {
                message.error("You have reached the maximum number of tasks (5)");
                return;
            }
            try {
                const updatedTask = await resumeFolderTask(id, taskId, token);
                console.log("Task resumed:", updatedTask);
                updateTask(updatedTask);
            } catch (error) {
                console.error("Failed to resume task", error);
                message.error("Failed to resume task");
            }
        }
    };
    // check max task number with status IN_PROGRESS
    const isFreeResourcesForTask = (): boolean => {
        if (tasks != null) {
            let count = 0;
            tasks.forEach(task => {
                if (task.status === 'IN_PROGRESS') {
                    count++;
                }
            });
            if (count >= 5) {
                return false;
            }
        }
        return true;
    }
    // validate Task Creation
    const validateRequestTask = (task: TaskRequest): boolean => {
        // check if sourceFolderId is null and not bigger than integer
        if (task.sourceFolderId == null || task.sourceFolderId < 0) {
            message.error("Source folder id is invalid");
            return false;
        }
        return true;
    }
    const handleTaskCreation = async (sourceFolderId: number) => {
        // Create the task object with the specified complexity
        const task: TaskRequest = {
            name: 'New Task',
            sourceFolderId: sourceFolderId,
            destinationFolderId: sourceFolderId
            // Other task properties, if any
        };
        if (!isFreeResourcesForTask()) {
            message.error("You have reached the maximum number of tasks (5)");
            return;
        }
        if (!validateRequestTask(task)) {
            return;
        }
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
        <div className="task-page-main">
            <TaskCreationButton onClick={() => setShowTaskCreationForm(true)}/>
            <TaskList tasks={tasks} onStop={handleStop} onCancel={handleCancel} onResume={handleResume}/>
            <TaskCreationForm
                visible={showTaskCreationForm}
                onCreate={handleTaskCreation}
                onCancel={() => setShowTaskCreationForm(false)}
            />
        </div>
    );
};

export default TaskPage;