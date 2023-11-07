import React from 'react';
import './css/TaskComponent.css';
interface TaskProps {
    id: string;
    status: string;
    sourceFolderId: number;
    destinationFolderId: number;
    userId: number;
    progress: number;
    onStop: (id: string) => void;
    onCancel: (id: string) => void;
    onResume: (id: string) => void;
}

const TaskComponent: React.FC<TaskProps> = ({id, progress, status, onStop, onCancel, onResume}) => {
    return (
        <div className="task">
            <h3>{id}</h3>
            <p>Progress: {progress}%</p>
            <p>Status: {status}</p>
            <div className="task-buttons">
                {status === 'STOPPED' && (
                    <button onClick={() => onResume(id)}>Resume</button>
                )}
                {status === 'IN_PROGRESS' && (
                    <button onClick={() => onStop(id)}>Stop</button>
                )}
                {(status === 'IN_PROGRESS') && (
                    <button onClick={() => onCancel(id)}>Cancel</button>
                )}
            </div>
        </div>
    );
};

export default TaskComponent;