const mongoose = require('mongoose');
const User = require('./models/User');
const Resource = require('./models/Resource');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/design-hub');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Sample data
const sampleUsers = [
  {
    googleId: 'sample-user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    picture: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=333333&color=ffffff',
    givenName: 'Sarah',
    familyName: 'Chen',
    resourcesAdded: 2,
    totalViews: 45,
    isAdmin: false
  },
  {
    googleId: 'sample-user-2',
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    picture: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=333333&color=ffffff',
    givenName: 'Alex',
    familyName: 'Johnson',
    resourcesAdded: 1,
    totalViews: 23,
    isAdmin: true
  }
];

const sampleResources = [
  {
    type: 'ui-finding',
    title: 'Micro-interactions in Mobile Apps',
    description: 'A comprehensive study of micro-interactions that enhance user experience in mobile applications.',
    tags: ['mobile', 'ux', 'interactions'],
    url: 'https://example.com/micro-interactions',
    authorName: 'Sarah Chen',
    views: 45,
    isPublic: true
  },
  {
    type: 'podcast',
    title: 'Design Matters with Debbie Millman',
    description: 'Weekly conversations with designers, artists, and creative professionals.',
    tags: ['design', 'creativity', 'interviews'],
    url: 'https://example.com/design-matters',
    authorName: 'Sarah Chen',
    views: 32,
    isPublic: true
  },
  {
    type: 'book',
    title: 'Atomic Design by Brad Frost',
    description: 'A methodology for creating design systems that are both beautiful and functional.',
    tags: ['design-systems', 'methodology', 'frontend'],
    url: 'https://example.com/atomic-design',
    authorName: 'Alex Johnson',
    views: 67,
    isPublic: true
  },
  {
    type: 'article',
    title: 'The Future of Design Tools',
    description: 'Exploring how AI and machine learning are reshaping the design industry.',
    tags: ['ai', 'future', 'tools'],
    url: 'https://example.com/future-design-tools',
    authorName: 'Alex Johnson',
    views: 23,
    isPublic: true
  }
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Resource.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} users`);

    // Create resources with proper author references
    const resourcesWithAuthors = sampleResources.map((resource, index) => {
      const userIndex = index < 2 ? 0 : 1; // First two resources by Sarah, last two by Alex
      return {
        ...resource,
        author: createdUsers[userIndex]._id
      };
    });

    const createdResources = await Resource.insertMany(resourcesWithAuthors);
    console.log(`Created ${createdResources.length} resources`);

    console.log('Database seeded successfully!');
    console.log('\nSample users:');
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Admin: ${user.isAdmin}`);
    });

    console.log('\nSample resources:');
    createdResources.forEach(resource => {
      console.log(`- ${resource.title} by ${resource.authorName}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed script
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

// Check if this script is being run directly
if (require.main === module) {
  runSeed();
}

module.exports = { seedDatabase, connectDB };
