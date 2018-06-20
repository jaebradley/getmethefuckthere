import Vehicle from '../../data/Vehicle';

const translateTransitLineDetails = ({
  name,
  short_name: shortName,
  agencies,
  vehicle,
}) => (
  {
    name: name || shortName,
    agencies: agencies.map(({ name }) => name),
    vehicle: Vehicle[vehicle.type.toLowerCase()],
  }
);

export default translateTransitLineDetails;
