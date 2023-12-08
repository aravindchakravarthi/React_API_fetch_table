import { deleteUser, getUsers, updateUser } from "./features/datas/userSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";


const App = () => {
  const { users, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editID, setEditID] = useState(null);
  const [uname, setUname] =useState();
  const [uemail, setUemail] =useState();
  const [uphone, setUphone] =useState();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!Array.isArray(users)) {


    return <p>Loading...</p>;
  }

  const handleedit = (id) => {
    setEditID(id);
    const user = users.find((u) => u.id === id);
    setUname(user.name );
    setUemail(user.email);
    setUphone(user.phone);  }

  const handleUpdate = (id) => {
    // Prepare the data for the updated user
    const updatedUserData = {
      id: id,
      name: uname,
      email: uemail,
      phone: uphone,
      // Add other necessary fields
    };

    // Dispatch the updateUser action with the updated user data
    dispatch(updateUser(updatedUserData));

    // Reset the editID and input fields
    setEditID(null);
    setUname('');
    setUemail('');
    setUphone('');
  };

  const handleDelete = async (id) => {
    console.log('Deleting user with ID:', id);
  
    try {
      await dispatch(deleteUser(id));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {error && <p>Error: {error}</p>}
          
          {users.map((user) => (

            editID === user.id ?
            <tr key={user.id} >
              <td>
                <input 
                  type="text"
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                />
              </td>
              <td>
                <input 
                  type="text"
                  value={uemail}
                  onChange={(e) => setUemail(e.target.value)}
                />
              </td>
              <td>
                <input 
                  type="text"
                  value={uphone}
                  onChange={(e) => setUphone(e.target.value)}
                />
              </td>
              <td className="sss">
                <button onClick={() => handleUpdate(user.id)} className="btn-update">Update</button>
                <button onClick={() => setEditID(null)} className="btn-cancel">Cancel</button>
              </td>
            </tr>
            :
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="ss">
                <button className="btn" type="button" onClick={() => handleedit(user.id)}>Edit<FaEdit className="editlogo" /></button>
                <button className="delbtn" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))} 
            
        </tbody>
      </table>
    </div>
  )
}

export default App

