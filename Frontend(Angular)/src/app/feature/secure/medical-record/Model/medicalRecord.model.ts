export interface IMedicalRecord {
  id: number;
  specializationId: number;
  specializationName: string;
  date: string;
  patientId: number;
  patientFullName: string;
  doctorId: number;
  doctorFullName: string;
  diagnosis: string;
  prescription: string;
  testResults: string;
}
