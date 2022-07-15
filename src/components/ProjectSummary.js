import './ProjectSummary.css';

import React from 'react';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

const ProjectSummary = ({ project, projectId }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore('projects');
  const HandleProjectDelete = (e) => {
    deleteDocument(projectId);
    navigate('/');
  };

  return (
    <div>
      <div className="project-summary bg-slate-200">
        <h2 className="page-title">{project.name}</h2>

        <p className="due-date">
          Project Due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to : </h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button
          className="btn bg-slate-700 text-slate-100"
          onClick={HandleProjectDelete}
        >
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
