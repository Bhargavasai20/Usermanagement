import React, { useEffect, useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        alert('Error fetching users: ' + error.message);
      }
    };
    
    fetchUsers();
  }, []);

  // Add or edit user
  const handleSaveUser = (user) => {
    if (editingUser) {
      // Edit existing user
      fetch(`${API_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => response.json())
        .then(() => {
          setUsers(users.map(u => u.id === user.id ? user : u));
          setEditingUser(null);
          setShowForm(false);
        });
    } else {
      // Add new user
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => response.json())
        .then((newUser) => {
          setUsers([...users, newUser]);
          setShowForm(false);
        });
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    fetch(`${API_URL}/${userId}`, { method: 'DELETE' })
      .then(() => {
        setUsers(users.filter(u => u.id !== userId));
      });
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <button onClick={() => setShowForm(true)}>Add User</button>
      {showForm && <UserForm user={editingUser} onSave={handleSaveUser} />}
      <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
    </div>
  );
}

export default App;
