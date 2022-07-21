import React, { useState } from 'react';
import ProjectList from '../components/ProjectList';
import { useCollection } from '../hooks/useCollection';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import ProjectFilter from '../components/ProjectFilter';
import { useAuthContext } from '../hooks/useAuthContext';

const Dashboard = () => {
  const { documents, error, isPending } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();

  const changeFilter = (filterString) => {
    setCurrentFilter(filterString);
  };

  const filteredProjectList = documents?.filter((document) => {
    switch (currentFilter) {
      case 'all':
        return true;
      case 'mine':
        let assignedToMe = false;
        document.assignedUsersList.forEach((u) => {
          if (u.id === user.uid) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      case 'development':
        return document.category === 'development';
      case 'marketing':
      case 'sales':
      case 'design':
        return document.category === currentFilter;
      default:
        return true;
    }
  });

  return (
    <div>
      {documents && documents.length > 0 && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      <h2 className="page-title">Projects</h2>
      {error && <p className="error"> {error}</p>}
      {filteredProjectList && filteredProjectList.length > 0 ? (
        <ProjectList documents={filteredProjectList} isPending={isPending} />
      ) : (
        <div className="w-full h-[50vh] flex items-center flex-col gap-3 justify-center">
          <h1>Project List is Empty</h1>
          <Link to="/create">
            <button className="btn bg-slate-700 text-slate-100">
              Add a Project
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
