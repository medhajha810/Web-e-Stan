import React, { useState } from 'react';

const Gamification = () => {
    // Sample user data - in a real app, this would come from backend
    const [userStats, setUserStats] = useState({
        points: 150,
        level: 2,
        achievements: [
            { id: 1, name: 'First Donation', description: 'Made your first donation', completed: true },
            { id: 2, name: 'Regular Donor', description: 'Made 5 donations', completed: false },
            { id: 3, name: 'Community Hero', description: 'Reached 1000 points', completed: false }
        ],
        rewards: [
            { id: 1, name: 'Bronze Badge', points: 100, claimed: true },
            { id: 2, name: 'Silver Badge', points: 500, claimed: false },
            { id: 3, name: 'Gold Badge', points: 1000, claimed: false }
        ]
    });

    const calculateProgress = (points) => {
        const nextLevel = (userStats.level + 1) * 100;
        return (points / nextLevel) * 100;
    };

    const claimReward = (rewardId) => {
        setUserStats(prevStats => ({
            ...prevStats,
            rewards: prevStats.rewards.map(reward =>
                reward.id === rewardId ? { ...reward, claimed: true } : reward
            )
        }));
    };

    return (
        <div className="gamification-container" style={{ padding: '20px' }}>
            <h2>Your Gaming Progress</h2>
            
            {/* User Stats */}
            <div className="stats-section" style={{ marginBottom: '30px' }}>
                <h3>Level {userStats.level}</h3>
                <div className="progress-bar" style={{
                    width: '100%',
                    height: '20px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${calculateProgress(userStats.points)}%`,
                        height: '100%',
                        backgroundColor: '#4CAF50',
                        transition: 'width 0.3s ease'
                    }}></div>
                </div>
                <p>Points: {userStats.points}</p>
                <p>Next Level: {(userStats.level + 1) * 100} points needed</p>
            </div>

            {/* Achievements */}
            <div className="achievements-section" style={{ marginBottom: '30px' }}>
                <h3>Achievements</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                    {userStats.achievements.map(achievement => (
                        <div key={achievement.id} style={{
                            padding: '15px',
                            backgroundColor: achievement.completed ? '#e8f5e9' : '#f5f5f5',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                        }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>{achievement.name}</h4>
                            <p style={{ margin: '0', color: '#666' }}>{achievement.description}</p>
                            {achievement.completed && (
                                <span style={{ color: '#4CAF50' }}>✓ Completed</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Rewards */}
            <div className="rewards-section">
                <h3>Rewards</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                    {userStats.rewards.map(reward => (
                        <div key={reward.id} style={{
                            padding: '15px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h4 style={{ margin: '0 0 5px 0' }}>{reward.name}</h4>
                                <p style={{ margin: '0', color: '#666' }}>Required: {reward.points} points</p>
                            </div>
                            {reward.claimed ? (
                                <span style={{ color: '#4CAF50' }}>Claimed ✓</span>
                            ) : (
                                <button
                                    onClick={() => claimReward(reward.id)}
                                    disabled={userStats.points < reward.points}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: userStats.points >= reward.points ? '#4CAF50' : '#ccc',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: userStats.points >= reward.points ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    Claim
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gamification;
