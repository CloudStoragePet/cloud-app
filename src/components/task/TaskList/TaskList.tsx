import React from 'react';
import TaskComponent from './TaskComponent';
import {Task} from "../../../services/TaskService";

interface TaskListProps {
    tasks: Task[] | null;
    onStop: (id: string) => void;
    onCancel: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onStop, onCancel}) => {
    return (
        <div>
            {tasks?.map(task => (
                <TaskComponent key={task.id} {...task} onStop={onStop} onCancel={onCancel} />
            ))}
        </div>
    );
};

export default TaskList;