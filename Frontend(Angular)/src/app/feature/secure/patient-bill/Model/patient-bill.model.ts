export interface IPatientBill{
    id:number,
    patientFullName:string
    doctorFullName:string, 
    billDate: string,
    totalAmount: number
    paymentStatus: string
}