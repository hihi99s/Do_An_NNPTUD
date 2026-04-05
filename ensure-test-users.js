const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/schemas/users');
const Role = require('./src/schemas/roles');
const Specialty = require('./src/schemas/specialties');

const uri = 'mongodb://127.0.0.1:27017/MedicalBooking';

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB...");

    const plainPassword = '123';

    // Ensure Roles exist
    const roles = ['ADMIN', 'DOCTOR', 'PATIENT'];
    for (const r of roles) {
      const exists = await Role.findOne({ name: r });
      if (!exists) {
        await Role.create({ name: r, description: `System ${r} role` });
        console.log(`Created role: ${r}`);
      }
    }

    // Ensure target Specialty exists
    let sp = await Specialty.findOne({ name: "Khoa Nội" });
    if (!sp) {
      sp = await Specialty.create({ name: "Khoa Nội", description: "Internal Medicine", imageUrl: "https://cdn-icons-png.flaticon.com/512/3209/3209114.png" });
    }

    // Ensure Admin
    let admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      admin = await User.create({
        username: 'admin',
        password: plainPassword,
        email: 'admin@test.com',
        fullName: 'System Admin',
        role: 'ADMIN'
      });
      console.log("Created Admin: admin / 123");
    } else {
        admin.password = plainPassword;
        admin.role = 'ADMIN';
        await admin.save();
        console.log("Updated Admin password to 123");
    }

    // Ensure Doctor
    let doctor = await User.findOne({ username: 'doctor_test' });
    if (!doctor) {
      doctor = await User.create({
        username: 'doctor_test',
        password: plainPassword,
        email: 'doctor@test.com',
        fullName: 'Dr. Test House',
        role: 'DOCTOR',
        specialtyId: sp._id
      });
      console.log("Created Doctor: doctor_test / 123");
    }

    // Ensure Patient
    let patient = await User.findOne({ username: 'patient_test' });
    if (!patient) {
      patient = await User.create({
        username: 'patient_test',
        password: plainPassword,
        email: 'patient@test.com',
        fullName: 'John Patient',
        role: 'PATIENT'
      });
      console.log("Created Patient: patient_test / 123");
    }

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();
