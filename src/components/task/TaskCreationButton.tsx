import React from 'react';

interface TaskCreationButtonProps {
    onClick: () => void;
}

const TaskCreationButton: React.FC<TaskCreationButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick}>Create New Task</button>
    );
};

export default TaskCreationButton;