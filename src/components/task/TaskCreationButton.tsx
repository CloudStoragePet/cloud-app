import React from 'react';
import './css/TaskCreationButton.css'
interface TaskCreationButtonProps {
    onClick: () => void;
}

const TaskCreationButton: React.FC<TaskCreationButtonProps> = ({ onClick }) => {
    return (
        <button className="taskCreationButton" onClick={onClick}>Create New Task</button>
    );
};

export default TaskCreationButton;