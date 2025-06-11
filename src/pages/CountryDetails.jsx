import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const { name } = useParams();

  return <h1>Szczegóły o kraju: {name}</h1>;
};

export default CountryDetails;
