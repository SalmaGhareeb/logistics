import Api from './Api';

const getShipments = () => Api().get('/shipments');


export default {
  getShipments,
};
