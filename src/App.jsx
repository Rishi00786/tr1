import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Users';


const App = () => {
    return (
        <Router>
            <div className="">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
