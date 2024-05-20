import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export const UserAPI = {
    authenticateUser(): string {
        return `${environment.apiBaseUrl}api/Login/Login`;
    },
    addRole(): string {
        return `${environment.apiBaseUrl}api/Role/AddRole`;
    },
    listDoctors(queryParams?:any):string{
    let apiUrl=`${environment.apiBaseUrl}api/Doctor/GetDoctors`;
    if (queryParams) {
        const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
        apiUrl += `?${queryString}`;
    }
    return apiUrl;

    },

    getPatients(queryParams?:any):string {
        let apiUrl = `${environment.apiBaseUrl}api/Patients/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        return apiUrl;
      },

      listStaff(queryParams?:any):string{
        let apiUrl = `${environment.apiBaseUrl}api/Staff/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        return apiUrl;
      },

      listAdmission(queryParams?:any):string{
        let apiUrl = `${environment.apiBaseUrl}api/Admission/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        return apiUrl;
      },

      listBill(queryParams:any):string{
        let apiUrl = `${environment.apiBaseUrl}api/Bill/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        return apiUrl;
      },

      listMR(queryParams:any):string{
        let apiUrl = `${environment.apiBaseUrl}api/MedicalRecords/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        return apiUrl;
      },

      listWards(queryParams:any):string{
        let apiUrl = `${environment.apiBaseUrl}api/Wards/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        return apiUrl;
      },
      listSpec(queryParams:any):string{
        let apiUrl = `${environment.apiBaseUrl}api/Specialization/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        return apiUrl;
      },

      listDoctorSchedule(queryParams:any):string{
        let apiUrl = `${environment.apiBaseUrl}api/DSchedule/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        console.log(apiUrl);
        return apiUrl;
      },

      listAppointments(queryParams:any):string{
        let apiUrl = `${environment.apiBaseUrl}api/Appointment/Get`;
        if (queryParams) {
          const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
          apiUrl += `?${queryString}`;
        }
        console.log(apiUrl);
        return apiUrl;
      }
}