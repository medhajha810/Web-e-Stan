import React, { useState } from 'react';

const Leaderboard = () => {
    const [timeFilter, setTimeFilter] = useState('all');
    
    // Sample leaderboard data - in a real app, this would come from backend
    const staticLeaders = [
        { id: 1, name: 'Shilpa Sharma', points: 850, rank: 1, badges: ['Gold Donor', 'Community Hero'] },
        { id: 2, name: 'Medha jha', points: 720, rank: 2, badges: ['Silver Donor'] },
        { id: 3, name: 'Ajay Gangwar', points: 650, rank: 3, badges: ['Bronze Donor'] },
        { id: 4, name: 'Ajay Bisht', points: 580, rank: 4, badges: ['Regular Donor'] },
        { id: 5, name: 'Golu kumar', points: 450, rank: 5, badges: ['First Timer'] }
    ];

    const filterStyles = {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
    };

    const buttonStyle = (selected) => ({
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: selected ? '#007bff' : '#f0f0f0',
        color: selected ? 'white' : '#333',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    });

    const getBadgeStyle = (badge) => {
        let color;
        switch (badge) {
            case 'Gold Donor':
                color = '#FFD700';
                break;
            case 'Silver Donor':
                color = '#C0C0C0';
                break;
            case 'Bronze Donor':
                color = '#CD7F32';
                break;
            default:
                color = '#4CAF50';
        }
        return {
            backgroundColor: color,
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '0.8rem',
            color: badge.includes('Donor') ? '#000' : '#fff',
            margin: '0 4px'
        };
    };

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            
            {/* Time filter */}
            <div style={filterStyles}>
                <button 
                    style={buttonStyle(timeFilter === 'all')}
                    onClick={() => setTimeFilter('all')}
                >
                    All Time
                </button>
                <button 
                    style={buttonStyle(timeFilter === 'month')}
                    onClick={() => setTimeFilter('month')}
                >
                    This Month
                </button>
                <button 
                    style={buttonStyle(timeFilter === 'week')}
                    onClick={() => setTimeFilter('week')}
                >
                    This Week
                </button>
            </div>

            {/* Leaderboard list */}
            <div style={{ 
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden'
            }}>
                {staticLeaders.map((leader, index) => (
                    <div key={leader.id} style={{
                        padding: '20px',
                        borderBottom: index < staticLeaders.length - 1 ? '1px solid #eee' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: index === 0 ? '#fff9e6' : 'white',
                        transition: 'background-color 0.3s ease'
                    }}>
                        {/* Rank */}
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: index < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][index] : '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            marginRight: '20px'
                        }}>
                            {leader.rank}
                        </div>

                        {/* User info */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                {leader.name}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {leader.badges.map((badge, badgeIndex) => (
                                    <span key={badgeIndex} style={getBadgeStyle(badge)}>
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Points */}
                        <div style={{
                            fontWeight: 'bold',
                            color: '#007bff',
                            fontSize: '1.2rem'
                        }}>
                            {leader.points} pts
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h4 style={{ marginBottom: '10px' }}>Badge Legend</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {['Gold Donor', 'Silver Donor', 'Bronze Donor', 'Community Hero', 'Regular Donor', 'First Timer'].map((badge) => (
                        <div key={badge} style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={getBadgeStyle(badge)}>{badge}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
