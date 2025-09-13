import { useParams } from 'react-router-dom';

export const ServiceDetailsWrapper = ({ services }) => {
  const { id } = useParams();
  const service = services.find((s) => s.Id === parseInt(id));
  return <OfficeServicePage service={service} />;
};