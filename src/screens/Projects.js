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
      {error && <p>{error}</p>}
      {isPending && <p className="loading">Loading...</p>}

      {project && <ProjectSummary project={project} projectId={projectId} />}
      {project && <Comments projectId={projectId} project={project} />}
    </div>
  );
};

export default Project;
