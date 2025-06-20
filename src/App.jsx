import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import CountryDetails from './pages/CountryDetails/CountryDetails.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:cca3" element={<CountryDetails />} />
    </Routes>
  );
};

export default App;
