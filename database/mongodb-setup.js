// MongoDB setup script
const mongoose = require('mongoose');
require('dotenv').config();

const sampleProjects = [
    {
        title: "Urban Forest Expansion",
        description: "Planting 10,000 trees across the city to increase green cover",
        category: "green_spaces",
        status: "active",
        budget: 500000,
        location: "Central District",
        progress: 65,
        impactMetrics: {
            carbonReduction: 1200,
            treesPlanted: 6500,
            energySaved: 0,
            wasteDiverted: 0
        }
    },
    {
        title: "Solar Panel Installation",
        description: "Installing solar panels on municipal buildings",
        category: "energy",
        status: "active",
        budget: 750000,
        location: "City Hall",
        progress: 40,
        impactMetrics: {
            carbonReduction: 800,
            treesPlanted: 0,
            energySaved: 15000,
            wasteDiverted: 0
        }
    }
];

const sampleMetrics = [
    {
        date: new Date('2024-01-01'),
        carbonFootprint: 280,
        greenSpace: 30,
        renewableEnergy: 30,
        wasteRecycled: 60,
        airQuality: 45,
        waterQuality: 85,
        location: "city"
    },
    {
        date: new Date('2024-02-01'),
        carbonFootprint: 270,
        greenSpace: 32,
        renewableEnergy: 33,
        wasteRecycled: 62,
        airQuality: 42,
        waterQuality: 86,
        location: "city"
    }
];

async function setupMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/green_city');
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await mongoose.connection.db.collection('projects').deleteMany({});
        await mongoose.connection.db.collection('metrics').deleteMany({});
        
        // Insert sample data
        await mongoose.connection.db.collection('projects').insertMany(sampleProjects);
        await mongoose.connection.db.collection('metrics').insertMany(sampleMetrics);
        
        console.log('Sample data inserted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Setup failed:', error);
        process.exit(1);
    }
}

setupMongoDB();