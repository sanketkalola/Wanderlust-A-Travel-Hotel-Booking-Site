const mongoose = require("mongoose");
const Listing = require("../model/listing.js"); 
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("DB is connected");
        return initDB();
    })
    .catch((err) => {
        console.error("Connection error:", err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>  
{
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj,owner:"678e100ca0be4c19eca0f8c1"}));
        await Listing.insertMany(initData.data);
        console.log("Data was initialized successfully");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
 };

