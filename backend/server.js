const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Store submissions in memory
let submissions = [];

// Test root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Handle PHP file requests
app.post('/submit.php', (req, res) => {
    exec('php submit.php', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing PHP: ${error}`);
            return res.status(500).json({ success: false, message: error.message });
        }
        res.send(stdout);
    });
});

// Contact form endpoints
app.post('/api/contacts', (req, res) => {
    try {
        const formData = req.body;
        
        // Detailed console logging of form submission
        console.log('\n=== New Form Submission ===');
        console.log('Timestamp:', new Date().toLocaleString());
        console.log('\nForm Data Object:');
        console.log(JSON.stringify(formData, null, 2));
        console.log('\nForm Fields:');
        Object.entries(formData).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
        console.log('=========================\n');
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.message) {
            console.log('Validation Error: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Store submission with metadata
        const newSubmission = {
            id: Date.now(),
            ...formData,
            submittedAt: new Date().toISOString(),
            metadata: {
                userAgent: req.headers['user-agent'],
                ipAddress: req.ip,
                timestamp: new Date().toLocaleString()
            }
        };
        submissions.push(newSubmission);

        // Log the stored submission
        console.log('\n=== Stored Submission ===');
        console.log('Submission ID:', newSubmission.id);
        console.log('Data:', JSON.stringify(newSubmission, null, 2));
        console.log('=======================\n');

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Form submitted successfully',
            data: newSubmission
        });

    } catch (error) {
        console.error('\n=== Error Processing Form ===');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        console.error('=========================\n');
        
        res.status(500).json({
            success: false,
            message: 'Error processing form submission',
            error: error.message
        });
    }
});

app.get('/api/contacts', (req, res) => {
    // Log all stored submissions
    console.log('\n=== All Stored Submissions ===');
    console.log('Total Count:', submissions.length);
    console.log('Submissions:', JSON.stringify(submissions, null, 2));
    console.log('===========================\n');
    
    res.json({
        success: true,
        data: submissions
    });
});

// Error handling for undefined routes
app.use((req, res) => {
    console.log('\n=== 404 Error ===');
    console.log('Route not found:', req.method, req.url);
    console.log('================\n');
    
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.url
    });
});

// Start server
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.clear();
    console.log(`\n=== Contact Form Server ===`);
    console.log(`Server running on port ${PORT}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('\nAPI Endpoints:');
    console.log(`POST http://localhost:${PORT}/api/contacts - Submit contact form`);
    console.log(`GET  http://localhost:${PORT}/api/contacts - View all submissions`);
    console.log(`POST http://localhost:${PORT}/submit.php - PHP form handler`);
    console.log('\nLogging enabled for:');
    console.log('- Detailed form submissions');
    console.log('- Form validation');
    console.log('- Submission storage');
    console.log('- Error tracking');
    console.log('\nWaiting for form submissions...\n');
});
