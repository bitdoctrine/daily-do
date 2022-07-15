import React from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import ProjectSummary from '../components/ProjectSummary';
import { useDocument } from '../hooks/useDocuments';

//styles
import './Projects.css';

const Project = () => {
  const { projectId } = useParams();
  const { project, error, isPending } = useDocument('projects', `${projectId}`);
  return (
    <div className="project-details">
      {/* {project && (
        <div className="project-details">
          <h2 className="page-title text-left">{project.name}</h2>
          <p className="due-date italic">
            Due By__: {project.dueDate.toDate().toDateString()}
          </p>
          <p className="created-by text-bold underline">
            Author__: {project.createdBy.displayName}
          </p>
          <ul className="assigned-to m-2 ml-0 lg:flex justify-start gap-2 items-center">
            {project.assignedUsersList.map((user) => (
              <li
                key={user.id}
                className="assigned-to-item lg:border-r-slate-600 border-solid flex m-2 gap-2 ml-0  items-center justify-start"
              >
                <Avatar src={user.photoURL} />
                <h2>{user.displayName}</h2>
              </li>
            ))}
          </ul>
        </div>
      )} */}
      {error && <p>{error}</p>}
      {isPending && <p className="loading">Loading...</p>}

      {project && <ProjectSummary project={project} projectId={projectId} />}
      {project && <Comments projectId={projectId} project={project} />}
    </div>
  );
};

export default Project;
