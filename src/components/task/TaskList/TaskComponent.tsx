import React from 'react';

interface TaskProps {
    id: string;
    status: string;
    sourceFolderId: number;
    destinationFolderId: number;
    userId: number;
    progress: number;
    onStop: (id: string) => void;
    onCancel: (id: string) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ id, progress,status, onStop, onCancel }) => {
    return (
        <div>
            <h3>{id}</h3>
            <p>Progress: {progress}%</p>
            <p>status: {status}</p>
            <button onClick={() => onStop(id)}>Stop</button>
            <button onClick={() => onCancel(id)}>Cancel</button>
        </div>
    );
};

export default TaskComponent;