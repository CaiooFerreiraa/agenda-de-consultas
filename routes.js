import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';
import helpController from './src/controllers/helpController.js';
import registerController from "./src/controllers/registerController.js";
import { userRequired } from './src/middleware/globalMiddleware.js';
import doctorController from "./src/controllers/doctorController.js";
import patientController from "./src/controllers/patientController.js";
import consultationController from "./src/controllers/consultationController.js";

const router = express.Router();

//Routes Home
router.get('/', homeController.index);

//Routes Login
router.get('/login', loginController.index);
router.post('/login', loginController.submit);

//Routes Previous
router.get('/previus', loginController.previous);

//Routes Register
router.get('/register', registerController.index)
router.post('/register', registerController.register);

//Routes Help
router.get('/help', helpController.index);
router.get('/previous-help', helpController.previous);

//Routes Doctor
router.get('/doctor', userRequired, doctorController.index);

//Routes Patient
router.get('/patient', userRequired, patientController.index);

//Routes Make Appointment
router.get('/make-appointment', userRequired, consultationController.index);
router.post('/make-appointment', userRequired, consultationController.marked);

//Routes My appointments
router.get('/my-appointment', userRequired, consultationController.myAppointment);

export default router;