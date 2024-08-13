



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../css/UserManagement.css'; // Import CSS for UserManagement

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/users/all'); // Adjust the URL if needed
//         setUsers(response.data);
//       } catch (err) {
//         setError('Failed to fetch users');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleView = (id) => {
//     // Implement view logic here
//     console.log(`View user with ID: ${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/users/${id}`);
//       setUsers(users.filter(user => user.id !== id));
//     } catch (err) {
//       setError('Failed to delete user');
//     }
//   };

//   const handleNewUser = () => {
//     // Implement new user logic here
//     console.log('Add new user');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="user-management">
//       <h2>User Management</h2>
//       <p>Manage your users here.</p>
//       <button className="new-user-button" onClick={handleNewUser}>Add New User</button>
//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button className="view-button" onClick={() => handleView(user.id)}>View</button>
//                   <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserManagement;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/UserManagement.css'; // Import CSS for UserManagement

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null); // State for editing user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/all');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (id) => {
    console.log(`View user with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleUpdate = async (user) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${user.id}`, user);
      setUsers(users.map(u => (u.id === user.id ? user : u)));
      setEditingUser(null); // Close edit mode
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleNewUser = () => {
    console.log('Add new user');
    // Implement new user logic here
  };

  const startEditing = (user) => {
    setEditingUser(user); // Set the user to be edited
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <p>Manage your users here.</p>
      <button className="new-user-button" onClick={handleNewUser}>Add New User</button>
      
      {editingUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <input
            type="text"
            name="email"
            value={editingUser.email}
            onChange={handleEditChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={editingUser.password}
            onChange={handleEditChange}
            placeholder="Password"
          />
          <button onClick={() => handleUpdate(editingUser)}>Update</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <button className="view-button" onClick={() => handleView(user.id)}>View</button>
                  <button className="edit-button" onClick={() => startEditing(user)}>Edit</button>
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
