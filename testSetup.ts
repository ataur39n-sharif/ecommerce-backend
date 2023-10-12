// testSetup.js

import mongoose from "mongoose";

const testDBUri = "mongodb+srv://dev:dev-ataur@cluster0.6959uav.mongodb.net/ecom-db?retryWrites=true&w=majority"; // Replace with your test database URI

beforeAll(async () => {
    // Connect to the test database before running the tests
    await mongoose.connect(testDBUri);
});

afterAll(async () => {
    // Disconnect from the test database after all tests are completed
    await mongoose.connection.close();
});
