import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                console.log(data);
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setUsers([data]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                navigate('/');
            }
        };

        fetchUsers();
    }, [navigate]);

    useEffect(()=>{
        console.log(users);
    },[users]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">User List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">User ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Password</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{user.userId}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className="text-gray-500 italic">{user.password}</span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-3 py-1 rounded-lg text-white ${user.role === 'ADMIN' ? 'bg-red-500' : 'bg-blue-500'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center border border-gray-300 px-4 py-3 text-gray-600">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
