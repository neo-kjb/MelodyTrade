import { useParams } from 'react-router-dom';
import useGetUserDetails from '../../hooks/users/useGetUserDetails';

export default function UserDetailsPage() {
  const { userId } = useParams();

  const { content } = useGetUserDetails(userId);

  return { content };
}
