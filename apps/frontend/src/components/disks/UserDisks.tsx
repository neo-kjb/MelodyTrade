import { User } from '@melody-trade/api-interfaces';
import useGetUserDisks from '../../hooks/users/useGetUserDisks';

export default function UserDisks(props: { user: User }) {
  const { user } = props;
  const { data, content } = useGetUserDisks(user);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        Disks {`(${data?.count || 0})`}
      </h2>
      <hr className="my-2" />
      <div className="flex justify-center mt-4">{content}</div>
    </div>
  );
}
