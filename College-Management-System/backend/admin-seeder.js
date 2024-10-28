const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectToMongo = require("./Database/db.js"); // Adjust path as necessary
const adminCredential = require("./models/Admin/credential.model.js"); // Adjust path as necessary
const adminDetails = require("./models/Admin/details.model.js"); // Adjust path as necessary

const seedData = async () => {
    try {
        await connectToMongo();

        await adminCredential.deleteMany({});
        await adminDetails.deleteMany({});

        const hashedPassword = await bcrypt.hash("admin123", 10); // Hash the password

        await adminCredential.create({
            loginid: 123456,
            password: hashedPassword, // Store the hashed password
        });

        const adminDetail = {
            employeeId: "123456",
            firstName: "Sundar",
            middleName: "R",
            lastName: "Pichai",
            email: "sundarpichar@gmail.com",
            phoneNumber: "1234567890",
            gender: "Male",
            type: "Admin",
            profile: "Faculty_Profile_123456.jpg",
        };

        await adminDetails.create(adminDetail);

        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Error while seeding:", error);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

seedData();
