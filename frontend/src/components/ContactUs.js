import React, { useState } from 'react';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        purpose: 'donate',
        message: '',
        preferredContact: 'email'
    });

    const [submitStatus, setSubmitStatus] = useState({
        show: false,
        type: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Show submitting status
        setSubmitStatus({
            show: true,
            type: 'info',
            message: 'Submitting your message...'
        });

        try {
            // Make API call to correct port (3001)
            const response = await fetch('http://localhost:3001/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Parse response
            const data = await response.json();

            if (response.ok && data.success) {
                // Show success message
                setSubmitStatus({
                    show: true,
                    type: 'success',
                    message: 'Thank you! Your message has been sent successfully.'
                });

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    purpose: 'donate',
                    message: '',
                    preferredContact: 'email'
                });
            } else {
                // Show error from server
                throw new Error(data.message || 'Failed to submit form');
            }
        } catch (error) {
            // Show error message
            setSubmitStatus({
                show: true,
                type: 'error',
                message: error.message || 'An error occurred. Please try again.'
            });
        }

        // Hide status message after 5 seconds
        setTimeout(() => {
            setSubmitStatus({ show: false, type: '', message: '' });
        }, 5000);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Contact Us</h2>
            
            {submitStatus.show && (
                <div
                    style={{
                        padding: '12px',
                        marginBottom: '20px',
                        backgroundColor: 
                            submitStatus.type === 'success' ? '#4CAF50' : 
                            submitStatus.type === 'error' ? '#f44336' : 
                            '#2196F3',
                        color: 'white',
                        borderRadius: '4px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
                        Name: <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
                        Email: <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
                        Phone:
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
                        Purpose: <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    >
                        <option value="donate">I want to donate</option>
                        <option value="volunteer">I want to volunteer</option>
                        <option value="receive">I need food assistance</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
                        Preferred Contact Method: <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="radio"
                                name="preferredContact"
                                value="email"
                                checked={formData.preferredContact === 'email'}
                                onChange={handleChange}
                            />
                            Email
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="radio"
                                name="preferredContact"
                                value="phone"
                                checked={formData.preferredContact === 'phone'}
                                onChange={handleChange}
                            />
                            Phone
                        </label>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
                        Message: <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            minHeight: '100px',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <button 
                    type="submit"
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginTop: '10px',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ContactUs;
