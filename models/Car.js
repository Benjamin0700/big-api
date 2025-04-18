import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: String, // Masalan: "Toyota Highlander 2021"
  body: String, // Masalan: "SUV", "Sedan", "Truck"
  condition: String, // Masalan: "New", "Used"
  mileage: Number, // Masalan: 45000 (km yoki mi — birligiga e’tibor)
  engineSize: Number, // Masalan: 2.5 (litres)
  fuelType: String, // Masalan: "Petrol", "Diesel", "Electric", "Hybrid"
  door: String, // Masalan: "4 Doors"
  year: Number, // Masalan: 2021
  cylinder: Number, // Masalan: 6
  transmission: String, // Masalan: "Automatic", "Manual"
  color: String, // Masalan: "White"
  driveType: String, // Masalan: "FWD", "AWD", "4WD"
  vin: String, // Transport vositasining VIN kodi
  description: String, // Avtomobil haqida umumiy ma’lumot
  images: [String], // Rasm URL lar (masalan: ["https://site.com/car1.jpg", ...])

  // 🔧 Qo‘shimcha xususiyatlar:
  features: {
    interior: [String], // Masalan: ["Air Conditioner", "Leather Seats", "Tachometer"]
    comfort: [String], // Masalan: ["Android Auto", "Bluetooth", "Power Steering"]
  },

  // 📏 O‘lchamlar va sig‘imlar:
  dimensions: {
    length: Number, // Masalan: 4950 (mm)
    width: Number, // Masalan: 2140 (mm)
    height: Number, // Masalan: 1776 (mm)
    grossWeight: Number, // To‘liq avtomobil og‘irligi (kg)
    maxLoad: Number, // Maksimal yuk ko‘tarish og‘irligi (kg)
    seats: Number, // Masalan: 5
  },

  // 🔧 Texnik ma’lumotlar:
  engineAndTransmission: {
    fuelTankCapacity: Number, // Masalan: 100 (litres)
  },

  // 📍 Joylashuv:
  location: {
    address: String, // Masalan: "990 Metropolitan Ave, Brooklyn"
    latitude: Number, // Masalan: 40.714 (xaritadan olinadi)
    longitude: Number, // Masalan: -73.957 (xaritadan olinadi)
  },

}, {
  timestamps: true, // createdAt va updatedAt avtomatik yaratiladi
});

const Car = mongoose.model("Car", carSchema);

export default Car;
