import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useEffect } from 'react';
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';

function App() {
  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
