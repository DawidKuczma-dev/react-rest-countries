import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import CountryDetails from './pages/CountryDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:name" element={<CountryDetails />} />
    </Routes>
  );
};

export default App;
