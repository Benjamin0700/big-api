import express from "express";
import {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
} from "../controllers/carController.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCar);
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;
