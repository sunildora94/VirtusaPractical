import { Outlet } from 'react-router-dom';
import ProductsList from './ProductsList';

const Products = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export { Products, ProductsList };
