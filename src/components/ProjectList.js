//styles
import './ProjectList.css';

import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { MdCategory } from 'react-icons/md';

const ProjectList = ({ documents }) => {
  return (
    <div className="project-list transition-all duration-1000 ease-in-out">
      {documents.map((doc) => (
        <Link to={`/projects/${doc.id}`} className="doc" key={doc.id}>
          <h4 className="title text-slate-700"> {doc.name}</h4>
          <p>By__: {doc.createdBy.displayName}</p>
          <p>Due By {doc.dueDate.toDate().toDateString()}</p>
          <p className="flex gap-2">
            <MdCategory /> {doc.category}
          </p>
          <div className="assigned-to flex items-start gap-1">
            {doc.assignedUsersList.map((user) => (
              <li key={user.photoURL}>
                <Avatar src={user.photoURL} />
              </li>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
