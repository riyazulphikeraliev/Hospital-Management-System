// export interface Admin {
//   address: string;
//   contactNumber: string;
//   dateOfBirth: Date;
//   email: string;
//   firstName: string;
//   id: number;
//   imagePath: string;
//   lastName: string;
//   password: string;
//   roleId: number;
//   roleName: string;
//   userId: number;
//   userName: string;
// }

import { Time } from '@angular/common';

export interface Doctor {
  address: string;
  contactNumber: string;
  dateOfBirth: Date;
  email: string;
  firstName: string;
  id: number;
  imagePath: string;
  lastName: string;
  password: string;
  roleId: number;
  roleName: string;
  userId: number;
  userName: string;
}

export interface Patient {
  address: string;
  contactNumber: string;
  dateOfBirth: Date;
  email: string;
  firstName: string;
  id: number;
  imagePath: string;
  lastName: string;
  password: string;
  roleId: number;
  roleName: string;
  userId: number;
  userName: string;
}

export interface Appointment {
  appointmentDate: Date;
  appointmentTime: Time;
  doctorFullName: string;
  doctorId: number;
  id: number;
  patientFullName: string;
  patientId: number;
  scheduleId: number;
  specializationName: string;
  status: string;
}

export interface MedicalRecord {
  date:             Date;
  diagnosis:        string;
  doctorFullName:   string;
  doctorId:         number;
  id:               number;
  patientFullName:  string;
  patientId:        number;
  prescription:     string;
  specializationId: number;
  specializationName:string;
  testResults:      string;
}
