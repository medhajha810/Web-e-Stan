import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchLeaders = async () => {
            const response = await axios.get('/api/donations'); // Adjust the endpoint as needed
            setLeaders(response.data);
        };
        fetchLeaders();
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaders.map((leader) => (
                    <li key={leader._id}>{leader.name}: {leader.points} points</li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
