import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { timestamp } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';

//styles
import './Create.css';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];
const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const [error, setError] = useState(null);
  const { addDocument, response } = useFirestore('projects');
  const { user } = useAuthContext();

  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (documents) {
      const options = documents.map((doc) => ({
        value: doc,
        label: doc.displayName,
      }));
      setUsers(options);
    }
  }, [documents]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError('Please select a category for the project');
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError('Please assign project to one or more users');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => ({
      displayName: u.value.displayName,
      photoURL: u.value.photoURL,
      id: u.value.id,
    }));

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (response.error) {
      setError(response.error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a Project</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Project name: </span>
          <input
            type="text"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </label>
        <label>
          <span>project Description: </span>{' '}
          <textarea
            required
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Due Date: </span>{' '}
          <input
            type="date"
            required
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
            value={dueDate}
          />
        </label>
        <label>
          <span>Category</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign People</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn bg-slate-700 text-slate-100">Add</button>
        {formError && <p className="error"> {formError}</p>}
        {error && <p className="error"> {error}</p>}
      </form>
    </div>
  );
};

export default Create;
