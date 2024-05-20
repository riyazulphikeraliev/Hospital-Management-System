using AutoMapper;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Models.ModelDto;

namespace Speridian.HMS.PresentationLayer.Config
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<Doctor, DoctorsGetDto>();
            CreateMap<DoctorsInsertUpdateDto, Doctor>();
            CreateMap<Specialization,SpecializationDto>();
            CreateMap<SpecializationDto,Specialization>();
            CreateMap<Patient,PatientsDto>();
            CreateMap<PatientInsertUpdateDto, Patient>();
            CreateMap<MedicalRecord,MedicalRecordsGetDto>();
            CreateMap<MedicalRecordsInsertUpdateDto,MedicalRecord>();
            CreateMap<Admission,AdmissionGetDto>();
            CreateMap<AdmissionInsertUpdateDto,Admission>();
            CreateMap<Ward,WardDto>();
            CreateMap<WardDto,Ward>();
            CreateMap<Billing,BillGetDto>();
            CreateMap<BillInsertUpdateDto,Billing>();
            CreateMap<Staff,StaffGetDto>();
            CreateMap<StaffInsertUpdateDto,Staff>();
            CreateMap<Role,RoleDto>();
            CreateMap<RoleDto,Role>();
            CreateMap<DoctorSchedule,DoctorScheduleGetDto>();
            CreateMap<DoctorScheduleInsertUpdateDto,DoctorSchedule>();
            CreateMap<Appointment,AppointmentGetDto>();
            CreateMap<AppointmentInsertUpdateDto,Appointment>();
            CreateMap<Admin,AdminGetDto>();
            CreateMap<AdminInsertUpdateDto,Admin>();
            CreateMap<UserDto,User>();

        }
    }
}
