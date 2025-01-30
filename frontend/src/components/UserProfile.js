import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await axios.get('/api/user/profile'); // Adjust the endpoint as needed
            setUser(response.data);
        };
        fetchUserProfile();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Points: {user.points}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UserProfile;
