import React, { useState } from 'react';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [donationAmount, setDonationAmount] = useState('');
    const [volunteerArea, setVolunteerArea] = useState('');
    const [foodRequest, setFoodRequest] = useState({
        items: '',
        urgency: 'normal',
        address: ''
    });

    const staticUser = {
        name: 'Golu kumar',
        email: 'medhajha810@gmail.com',
        points: 100,
        donationsCount: 5,
        volunteerHours: 12,
        badges: ['Food Hero', 'Regular Donor'],
        joinedDate: '2023-01-15'
    };

    const tabStyle = (tab) => ({
        padding: '10px 20px',
        backgroundColor: activeTab === tab ? '#007bff' : '#f8f9fa',
        color: activeTab === tab ? 'white' : '#333',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '0 5px',
        transition: 'all 0.3s ease'
    });

    const handleDonation = (e) => {
        e.preventDefault();
        // Handle donation logic here
        alert(`Thank you for your donation of $${donationAmount}!`);
        setDonationAmount('');
    };

    const handleVolunteer = (e) => {
        e.preventDefault();
        // Handle volunteer registration logic here
        alert(`Thank you for volunteering in ${volunteerArea}!`);
        setVolunteerArea('');
    };

    const handleFoodRequest = (e) => {
        e.preventDefault();
        // Handle food request logic here
        alert('Your food request has been submitted!');
        setFoodRequest({ items: '', urgency: 'normal', address: '' });
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            {/* Profile Header */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '60px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    margin: '0 auto 20px'
                }}>
                    {staticUser.name.charAt(0)}
                </div>
                <h2 style={{ marginBottom: '10px' }}>{staticUser.name}</h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>{staticUser.email}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <div>
                        <strong>{staticUser.points}</strong>
                        <div>Points</div>
                    </div>
                    <div>
                        <strong>{staticUser.donationsCount}</strong>
                        <div>Donations</div>
                    </div>
                    <div>
                        <strong>{staticUser.volunteerHours}</strong>
                        <div>Volunteer Hours</div>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    {staticUser.badges.map((badge, index) => (
                        <span key={index} style={{
                            backgroundColor: '#e3f2fd',
                            color: '#007bff',
                            padding: '5px 10px',
                            borderRadius: '15px',
                            margin: '0 5px',
                            fontSize: '0.9em'
                        }}>
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

            {/* Action Tabs */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <button onClick={() => setActiveTab('profile')} style={tabStyle('profile')}>Profile</button>
                <button onClick={() => setActiveTab('donate')} style={tabStyle('donate')}>Donate</button>
                <button onClick={() => setActiveTab('volunteer')} style={tabStyle('volunteer')}>Volunteer</button>
                <button onClick={() => setActiveTab('receive')} style={tabStyle('receive')}>Receive Food</button>
            </div>

            {/* Tab Content */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                {activeTab === 'profile' && (
                    <div>
                        <h3 style={{ marginBottom: '20px' }}>Profile Information</h3>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Member Since:</strong> {new Date(staticUser.joinedDate).toLocaleDateString()}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Total Contributions:</strong> ${staticUser.donationsCount * 100}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Impact:</strong> Helped {staticUser.donationsCount * 3} people
                        </div>
                    </div>
                )}

                {activeTab === 'donate' && (
                    <form onSubmit={handleDonation}>
                        <h3 style={{ marginBottom: '20px' }}>Make a Donation</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px' }}>Donation Amount ($)</label>
                            <input
                                type="number"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            Donate Now
                        </button>
                    </form>
                )}

                {activeTab === 'volunteer' && (
                    <form onSubmit={handleVolunteer}>
                        <h3 style={{ marginBottom: '20px' }}>Volunteer Registration</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px' }}>Area of Interest</label>
                            <select
                                value={volunteerArea}
                                onChange={(e) => setVolunteerArea(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                                required
                            >
                                <option value="">Select an area</option>
                                <option value="food-distribution">Food Distribution</option>
                                <option value="delivery">Food Delivery</option>
                                <option value="kitchen">Kitchen Help</option>
                                <option value="organization">Organization</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#17a2b8',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            Register as Volunteer
                        </button>
                    </form>
                )}

                {activeTab === 'receive' && (
                    <form onSubmit={handleFoodRequest}>
                        <h3 style={{ marginBottom: '20px' }}>Request Food Assistance</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px' }}>Food Items Needed</label>
                            <textarea
                                value={foodRequest.items}
                                onChange={(e) => setFoodRequest({...foodRequest, items: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    minHeight: '100px'
                                }}
                                placeholder="Please list the food items you need..."
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px' }}>Urgency Level</label>
                            <select
                                value={foodRequest.urgency}
                                onChange={(e) => setFoodRequest({...foodRequest, urgency: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            >
                                <option value="normal">Normal</option>
                                <option value="urgent">Urgent</option>
                                <option value="emergency">Emergency</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px' }}>Delivery Address</label>
                            <textarea
                                value={foodRequest.address}
                                onChange={(e) => setFoodRequest({...foodRequest, address: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    minHeight: '60px'
                                }}
                                placeholder="Enter your delivery address..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            Submit Request
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
