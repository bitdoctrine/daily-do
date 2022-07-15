import './ProjectFilter.css';

const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales',
];

const ProjectFilter = ({ changeFilter, currentFilter }) => {
  const handleClick = (filter) => {
    changeFilter(filter);
  };
  return (
    <div className="project-filter w-full rounded-lg p-2 my-7">
      <nav className="flex  items-center bg-white w-full p-1 rounded-md gap-2">
        <h4>Filters:</h4>
        {filterList.map((f) => (
          <button
            key={f}
            className={
              currentFilter === f
                ? `bg-slate-100 text-slate-700 mx-2 border-r-slate-700 p-1 rounded-md cursor-pointer`
                : 'bg-slate-700 text-slate-100 mx-2 border-r-slate-700 p-1 rounded-md cursor-pointer'
            }
            onClick={() => handleClick(f)}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
