import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  // When editing an existing user, populate the form with their data
  useEffect(() => {
    if (user) {
      setFirstName(user.name.split(' ')[0]);
      setLastName(user.name.split(' ')[1]);
      setEmail(user.email);
      setDepartment(user.company.name);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: user ? user.id : Date.now(),
      name: `${firstName} ${lastName}`,
      email,
      company: { name: department },
    };

    onSave(newUser);
  };

  return (
    <div className="form-container">
      <h2>{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <button type="submit">{user ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
