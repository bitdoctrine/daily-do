import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Create from './screens/Create';
import Projects from './screens/Projects';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ProtectedRoutes, SignedInUser } from './components/ProtectedRoutes';
import { useAuthContext } from './hooks/useAuthContext';
import Users from './components/Users';

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<Create />} />
                <Route path="/projects/:projectId" element={<Projects />} />
              </Route>
              <Route path="/" element={<SignedInUser />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route
                path="*"
                element={
                  <div className="error p-10 flex items-center justify-center rounded-lg m-auto text-red-300 bg-red-700 w-[50vw] h-[50vh]">
                    Page Not Found
                  </div>
                }
              />
            </Routes>
          </div>
          {user && <Users />}
        </Router>
      )}
    </div>
  );
}

export default App;
