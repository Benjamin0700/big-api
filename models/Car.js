import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: String,
  body: String,
  condition: String,
  mileage: Number,
  engineSize: Number,
  fuelType: String,
  door: String,
  year: Number,
  cylinder: Number,
  transmission: String,
  color: String,
  driveType: String,
  vin: String,
  cost: Number,
  description: String,

  // 🔽 Rasm maydoni: Yuklangan rasmlar URL larini saqlash
  images: [String], // ["https://site.com/car1.jpg", "https://site.com/car2.jpg", ...]

  // 🔧 Qo‘shimcha xususiyatlar
  features: {
    interior: [String],
    comfort: [String],
  },

  // 📏 O‘lchamlar va sig‘imlar
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    grossWeight: Number,
    maxLoad: Number,
    seats: Number,
  },

  // 🔧 Texnik ma’lumotlar
  engineAndTransmission: {
    fuelTankCapacity: Number,
  },

  // 📍 Joylashuv
  location: {
    address: String,
    latitude: Number,
    longitude: Number,
  },
}, {
  timestamps: true,
});

const Car = mongoose.model("Car", carSchema);

export default Car;
