import { formatDate } from "../../utils/formatDate";
import userDefault from "../../assets/user.jpg";
import type { User } from "../../types/user";
import styles from "./Table.module.css";

type TableProps = {
  data: User[];
};

export const Table = ({ data }: TableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
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
              <img
                src={item.picture.thumbnail}
                alt={`${item.name.first} ${item.name.last}`}
                className={styles.img}
                onError={(e) => {
                  e.currentTarget.src = userDefault;
                }}
              />
            </td>
            <td>
              {item.name.first} {item.name.last}
            </td>
            <td>
              {item.location.state}, {item.location.city}
            </td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{formatDate(item.registered.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
