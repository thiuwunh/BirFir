import React from 'react';
import { useContext } from 'react';
import './UserManagement.css';
import { StoreContext } from '../../contexts/StoreContext';

const UserManagement = () => {

    const { users, fetchUsers } = useContext(StoreContext);

    return (
        <div className="user-management">
            <div className="title">
                <h1>Quản lý người dùng</h1>
                <button className="reload" onClick={ fetchUsers }>Reload</button>
            </div>
            <br></br>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Level</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.userlogo}</td>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.level}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
