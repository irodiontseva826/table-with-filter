import type { User } from "../../types/user";

type TableProps = {
  data: User[];
};

export const Table = ({ data }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Picture</th>
          <th>Location</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Registered Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              {item.name.first} {item.name.last}
            </td>
            <td>{item.picture.thumbnail}</td>
            <td>
              {item.location.state}, {item.location.city}
            </td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.registered.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
