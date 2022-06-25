import PropTypes from "prop-types";
import { useEffect } from "react";

import User from "../SingleUser/SingleUser";
import config from "../../config";
import styles from "./UserList.module.css";

const UsersList = (props) => {
  const {
    users, deleteUser, editUser, saveUser, selectAll, selectOne, selectAllRef, setPage, page} = props;

  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);

  let fillRows = [];

  for(let i = users.filter((user) => user.show).length; i < config.PAGE_SIZE; i++){
    fillRows.push(<tr key={i}></tr>);
  }

  if(users.length === 0 && page === 1) {
    return <div>No Data Available</div>
  }

  return(
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              ref={selectAllRef}
              onChange={(e) => {
                selectAll(e);
              }}
              name="selectAll"
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return user.show ? (
            <User
              selectOne={selectOne}
              saveUser={saveUser}
              editUser={editUser}
              deleteUser={deleteUser}
              key={user.id}
              user={user}
            ></User>
          ) : ("");
        })}
        {fillRows}
      </tbody>
    </table>
  );
};

UsersList.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectAll: PropTypes.func,
  selectOne: PropTypes.func,
  selectAllRef: PropTypes.object,
  setPage: PropTypes.func,
  page: PropTypes.number,
};

export default UsersList;