import { useRef } from "react";
import PropTypes from "prop-types";

import styles from "./SingleUser.module.css"

const User = (props) => {
  const { user, deleteUser, editUser, saveUser, selectOne } = props;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return(
    <tr key={user.id} className={user.selected ? styles.selected : ""}>
      <td>
        <label for={`check-${user.id}`}>
          <input
            id={`check-${user.id}`}
            type="checkbox"
            data={`${user.selected}`}
            onChange={() => selectOne(user.id)}
            checked={user.selected}
          ></input>
        </label>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        ></input>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td className={styles.icons}>
        {user.edit ? (
          <i
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
            className="fas fa-save"
            style={{color:"green"}}
          ></i>
        ) : (
          <i style={{color:"blue"}} onClick={() => editUser(user.id)} className="fas fa-edit"></i>
        )}

        <i style={{color:"red"}} onClick={() => deleteUser(user.id)} className="fas fa-trash-alt"></i>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectOne: PropTypes.func
};

export default User;