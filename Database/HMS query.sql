CREATE DATABASE HOSPITAL_MANAGEMENT_SYSTEM_WEBAPI
USE HOSPITAL_MANAGEMENT_SYSTEM_WEBAPI

CREATE TABLE Roles (
    ID INT PRIMARY KEY IDENTITY(1,1),
    RoleName VARCHAR(50) NOT NULL,
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
);
drop table roles

CREATE TABLE Patients (
    ID INT PRIMARY KEY IDENTITY(1,1),
	UserID INT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    DateOfBirth DATE,
    Gender VARCHAR(10),
    ContactNumber VARCHAR(20),
    Email VARCHAR(100),
    Address VARCHAR(255),
	ImagePath VARCHAR(255),
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT,
	FOREIGN KEY (UserID) REFERENCES Users(ID)
);

Drop table patients


CREATE TABLE Specializations (
    ID INT PRIMARY KEY IDENTITY(1,1),
    SpecializationName VARCHAR(50) NOT NULL,
	ImagePath VARCHAR(255),
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
);

drop table specializations



CREATE TABLE Doctors (
    ID INT PRIMARY KEY IDENTITY(1,1),
	UserID INT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    SpecializationID INT,
    ContactNumber VARCHAR(20),
    Email VARCHAR(100),
	DateOfBirth DATE,
    Address VARCHAR(255),
	ImagePath VARCHAR(255),
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
    FOREIGN KEY (SpecializationID) REFERENCES Specializations(ID),
	FOREIGN KEY (UserID) REFERENCES Users(ID)

);

drop table Doctors

CREATE TABLE Appointments (
    ID INT PRIMARY KEY IDENTITY(1,1),
    PatientID INT,
    DoctorID INT,
	ScheduleID INT,
    AppointmentDate DATE,
    AppointmentTime TIME,
    Status VARCHAR(20),
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
    FOREIGN KEY (PatientID) REFERENCES Patients(ID),
    FOREIGN KEY (ScheduleID) REFERENCES DoctorSchedule(ID)
);

drop table Appointments


CREATE TABLE MedicalRecords (
    ID INT PRIMARY KEY IDENTITY(1,1),
    PatientID INT,
    DoctorID INT,
    Date DATE,
    Diagnosis VARCHAR(255),
    Prescription VARCHAR(255),
    TestResults VARCHAR(255),
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
    FOREIGN KEY (PatientID) REFERENCES Patients(ID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(ID)
);
drop table MedicalRecords

CREATE TABLE Admissions (
    ID INT PRIMARY KEY IDENTITY(1,1),
    PatientID INT,
    AdmissionDate DATE,
    DischargeDate DATE,
	WardID INT,
    WardNumber INT,
    DoctorID INT,
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
    FOREIGN KEY (PatientID) REFERENCES Patients(ID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(ID),
	FOREIGN KEY (WardID) REFERENCES Wards(ID)
);
drop table admissions

CREATE TABLE Wards (
    ID INT PRIMARY KEY IDENTITY(1,1),
    WardType VARCHAR(50),
    Capacity INT,
    CurrentOccupancy INT,
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
);
CREATE TABLE Users (
    ID INT PRIMARY KEY IDENTITY(1,1),
    UserName VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    RoleID INT,
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
    FOREIGN KEY (RoleID) REFERENCES Roles(ID)
);

drop table Users 
CREATE TABLE Billing (
    ID INT PRIMARY KEY IDENTITY(1,1),
    PatientID INT,
    DoctorID INT,
    BillDate DATE,
    TotalAmount DECIMAL(10, 2),
    PaymentStatus VARCHAR(20),
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
    FOREIGN KEY (PatientID) REFERENCES Patients(ID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(ID)
);

drop table Billing

CREATE TABLE Staff (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Position VARCHAR(50),
    ContactNumber VARCHAR(20),
    Email VARCHAR(100),
    Address VARCHAR(255),
    RoleID INT,
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
    FOREIGN KEY (RoleID) REFERENCES Roles(ID)
);

drop table staff

CREATE TABLE DoctorSchedule (
    ID INT PRIMARY KEY IDENTITY(1,1),
    DoctorID INT,
    DayOfWeek VARCHAR(50), -- 1 for Sunday, 2 for Monday, and so on
    StartTime TIME,
    EndTime TIME,
	AppointmentSlots INT,
	CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT
    FOREIGN KEY (DoctorID) REFERENCES Doctors(ID)
);




drop table DoctorSchedule

CREATE TABLE Admins (
    ID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100),
	DateOfBirth DATE,
    ContactNumber VARCHAR(20),
	Address NVARCHAR(255), 
    ImagePath VARCHAR(255), -- Assuming you want to store the path to the image
    CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

drop table Admins


CREATE TABLE UserRefreshTokens (
    ID INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(MAX) NOT NULL,
    RefreshToken NVARCHAR(MAX) NOT NULL,
    DeviceIdentifier NVARCHAR(255),
    CreatedOn DATETIME DEFAULT GETDATE(),
    UpdatedOn DATETIME,
    IsActive BIT NOT NULL DEFAULT 1
);


drop table UserRefreshTokens
    

INSERT INTO Admins (UserID, FirstName, LastName, Email, ContactNumber, ImagePath, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, IsActive)
VALUES (1, 'Riya', 'Ali', 'riyazulphikeraliev@gmail.com', '7306438194', '/path/to/image.jpg', 'Admin', GETDATE(), 'Admin', GETDATE(), 1);


USE YourDatabaseName; -- Replace with your actual database name

-- Drop the foreign key constraint
ALTER TABLE DoctorSchedule
DROP CONSTRAINT FK__DoctorSch__IsAct__65370702;

-- Alter the datatype of the DayOfWeek column
ALTER TABLE DoctorSchedule
ALTER COLUMN DayOfWeek NVARCHAR(MAX);

-- Add back the foreign key constraint
ALTER TABLE DoctorSchedule
ADD CONSTRAINT FK_DoctorSchedule_Doctors FOREIGN KEY (DoctorID) REFERENCES Doctors(ID);




-- Inserting a schedule for a doctor on Monday from 9:00 AM to 5:00 PM
INSERT INTO DoctorSchedule ( DoctorID, DayOfWeek, StartTime, EndTime)
VALUES ( 1, 2, '09:00:00', '17:00:00');

-- Inserting a schedule for a different doctor on Wednesday from 10:30 AM to 4:30 PM
INSERT INTO DoctorSchedule ( DoctorID, DayOfWeek, StartTime, EndTime)
VALUES ( 2, 4, '10:30:00', '16:30:00');

-- Inserting a schedule for another doctor on Friday from 1:00 PM to 7:00 PM
INSERT INTO DoctorSchedule ( DoctorID, DayOfWeek, StartTime, EndTime)
VALUES ( 3, 6, '13:00:00', '19:00:00');



-- Insert data into Roles Table
INSERT INTO Roles ( RoleName)
VALUES
    ( 'Admin'),
    ( 'Doctor'),
    ( 'Nurse'),
	( 'Lab Technician'),
	( 'Pharmacist'),
	( 'Receptionist'),
	( 'Janitor'),
	( 'Patient');

-- Insert data into Patients Table
INSERT INTO Patients ( FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Address)
VALUES
    ( 'John', 'Doe', '1990-05-15', 'Male', '123-456-7890', 'john.doe@example.com', '123 Main St'),
    ( 'Jane', 'Smith', '1985-09-20', 'Female', '987-654-3210', 'jane.smith@example.com', '456 Oak Ave'),
    ( 'Michael', 'Johnson', '1978-02-10', 'Male', '555-123-4567', 'michael.j@example.com', '789 Pine Blvd');

-- Insert data into Specializations Table
INSERT INTO Specializations ( SpecializationName)
VALUES
    ( 'Cardiology'),
    ( 'Orthopedics'),
    ( 'Pediatrics');

-- Insert data into Doctors Table
INSERT INTO Doctors ( FirstName, LastName, SpecializationID, ContactNumber, Email, Address)
VALUES
    ( 'Dr. Sarah', 'Williams', 1, '111-222-3333', 'sarah.w@example.com', '789 Elm St'),
    ( 'Dr. Mark', 'Taylor', 2, '444-555-6666', 'mark.t@example.com', '101 Maple Ave'),
    ( 'Dr. Emily', 'Davis', 3, '777-888-9999', 'emily.d@example.com', '202 Cedar Blvd');

-- Insert data into Appointments Table
INSERT INTO Appointments ( PatientID, DoctorID, AppointmentDate, AppointmentTime, Status)
VALUES
    ( 1, 1, '2024-01-16', '10:00:00', 'Scheduled'),
    ( 2, 2, '2024-01-14', '14:30:00', 'Completed'),
    ( 3, 3, '2024-01-18', '11:45:00', 'Scheduled');


-- Sample appointment for a third party
INSERT INTO Appointments (PatientID, DoctorID, AppointmentDate, AppointmentTime, Status)
VALUES (NULL, 1, '2024-01-15', '10:00:00', 'scheduled');


-- Insert data into MedicalRecords Table
INSERT INTO MedicalRecords ( PatientID, DoctorID, Date, Diagnosis, Prescription, TestResults)
VALUES
    ( 1, 1, '2024-01-16', 'Hypertension', 'Prescription details for John Doe', 'Blood test normal'),
    ( 2, 2, '2024-01-17', 'Fractured leg', 'Prescription details for Jane Smith', 'X-ray results pending'),
    ( 3, 3, '2024-01-18', 'Common cold', 'Prescription details for Michael Johnson', 'Test results not required');

-- Insert data into Admissions Table
INSERT INTO Admissions ( PatientID, AdmissionDate, DischargeDate, WardNumber, DoctorID)
VALUES
    ( 1, '2024-01-16', '2024-01-20', 101, 1),
    ( 2, '2024-01-17', '2024-01-25', 202, 2),
    ( 3, '2024-01-18', '2024-01-22', 303, 3);

-- Insert data into Wards Table
INSERT INTO Wards ( WardType, Capacity, CurrentOccupancy)
VALUES
    ( 'General', 10, 5),
    ( 'Pediatric', 8, 2),
    ( 'Cardiac', 12, 8);

-- Insert data into Users Table
INSERT INTO Users ( Username, Password, RoleID)
VALUES
    ( 'riya', '1234', 1),
    ( 'doctor', '1234', 2),
    ( 'nurse_user', '1234', 3);

-- Insert data into Billing Table
INSERT INTO Billing ( PatientID, DoctorID, BillDate, TotalAmount, PaymentStatus)
VALUES
    ( 1, 1, '2024-01-16', 500.00, 'Paid'),
    ( 2, 2, '2024-01-17', 750.50, 'Pending'),
    ( 3, 3, '2024-01-18', 300.75, 'Paid');

-- Insert data into Staff Table
INSERT INTO Staff ( FirstName, LastName, Position, ContactNumber, Email, Address, RoleID)
VALUES
    ( 'Alice', 'Johnson', 'Receptionist Head', '111-333-5555', 'alice.j@example.com', '456 Pine St', 6),
    ( 'Bob', 'Smith', 'Nurse Head', '222-444-6666', 'bob.s@example.com', '789 Oak Ave', 3),
    ( 'Charlie', 'Brown', 'Supervisor', '333-555-7777', 'charlie.b@example.com', '101 Maple Blvd', 7);


	-- Add a new column WardID to the Admissions Table
ALTER TABLE Admissions
ADD  WardID INT,
 FOREIGN KEY (WardID) REFERENCES Wards(ID);

	-- Alter Roles Table
ALTER TABLE Roles
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Patients Table
ALTER TABLE Patients
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Doctors Table
ALTER TABLE Doctors
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Specializations Table
ALTER TABLE Specializations
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Appointments Table
ALTER TABLE Appointments
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter MedicalRecords Table
ALTER TABLE MedicalRecords
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Admissions Table
ALTER TABLE Admissions
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Wards Table
ALTER TABLE Wards
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Users Table
ALTER TABLE Users
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Billing Table
ALTER TABLE Billing
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

-- Alter Staff Table
ALTER TABLE Staff
ADD CreatedBy VARCHAR(50),
    CreatedOn DATETIME,
    UpdatedBy VARCHAR(50),
    UpdatedOn DATETIME,
    IsActive BIT;

--SP_HELP
--sp_tables_info_90_rowset_64 Villas



CREATE PROCEDURE USP_Doctors_GetDoctors
    @ID INT = NULL,
    @FirstName NVARCHAR(50) = NULL,
    @LastName NVARCHAR(50) = NULL,
    @SpecializationName NVARCHAR(50) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;
 
    -- Common Table Expression (CTE) for filtering and joining with Specializations table
    WITH FilteredDoctors AS (
        SELECT
            d.ID,
            d.FirstName,
            d.LastName,
            s.SpecializationName, -- Added for joining with Specializations table
			d.SpecializationID,
            d.ContactNumber,
            d.Email,
            d.Address,
			d.CreatedOn,
			d.CreatedBy,
			d.UpdatedBy,
			d.UpdatedOn,
			d.IsActive
        FROM
            Doctors d
        LEFT JOIN
            Specializations s ON d.SpecializationID = s.ID
        WHERE
            (@ID IS NULL OR d.ID = @ID)
            AND (@FirstName IS NULL OR d.FirstName LIKE '%' + @FirstName + '%')
            AND (@LastName IS NULL OR d.LastName LIKE '%' + @LastName + '%')
            AND (@SpecializationName IS NULL OR s.SpecializationName = @SpecializationName)
			AND d.IsActive = 1 -- Added condition for IsActive
    )
 
    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        FirstName,
        LastName,
        SpecializationName, -- Included in the result set
		SpecializationID,
        ContactNumber,
        Email,
        Address,
		CreatedBy,
		CreatedOn,
		UpdatedBy,
		UpdatedOn,
		IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'ASC' THEN FirstName END ASC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'DESC' THEN FirstName END DESC
                ) AS RowNum
            FROM
                FilteredDoctors
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END

drop procedure USP_Doctors_GetDoctors


-- Execute the stored procedure with sample parameters
EXEC USP_Doctors_GetDoctors
    @ID = NULL,
    @FirstName = null,
    @LastName = NULL,
    @SpecializationName = null,
    @SortColumn = 'ID',
    @SortOrder='DESC',
    @PageSize = 10,
    @PageNumber = 1;






	CREATE PROCEDURE USP_Doctors_GetDoctors
    @ID INT = NULL,
    @FirstName NVARCHAR(50) = NULL,
    @LastName NVARCHAR(50) = NULL,
    @SpecializationName NVARCHAR(50) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'desc',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;
 
    -- Common Table Expression (CTE) for filtering and joining with Specializations table
    WITH FilteredDoctors AS (
        SELECT
            d.ID,
            d.FirstName,
            d.LastName,
            s.SpecializationName, -- Added for joining with Specializations table
            d.ContactNumber,
            d.Email,
            d.Address,
            d.CreatedOn,
            d.CreatedBy,
            d.UpdatedBy,
            d.UpdatedOn,
            d.IsActive
        FROM
            Doctors d
        LEFT JOIN
            Specializations s ON d.SpecializationID = s.ID
        WHERE
            (@ID IS NULL OR d.ID = @ID)
            AND (@FirstName IS NULL OR d.FirstName LIKE '%' + @FirstName + '%')
            AND (@LastName IS NULL OR d.LastName LIKE '%' + @LastName + '%')
            AND (@SpecializationName IS NULL OR s.SpecializationName = @SpecializationName)
    )
 
    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        FirstName,
        LastName,
        SpecializationName, -- Output SpecializationName instead of SpecializationID
        ContactNumber,
        Email,
        Address,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'ASC' THEN FirstName END ASC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'DESC' THEN FirstName END DESC
                ) AS RowNum
            FROM
                FilteredDoctors
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END


=========================================================================================================================================
CREATE PROCEDURE USP_Doctors_Insert_Update
-- Add the parameters for the stored procedure here
     @Id INT,
	@FirstName varchar(50),
	@LastName varchar(50),
	@SpecializationID int,
	@ContactNumber varchar(20),
	@Email varchar(100),
	@Address varchar(255),		
	@IsActive bit=1

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
 
    -- Insert statements for procedure here
	IF(@Id IS NULL OR @Id=0)
	BEGIN
		INSERT INTO Doctors (FirstName,LastName,SpecializationID,ContactNumber,Email,Address,CreatedOn,IsActive)VALUES(@FirstName,@LastName,@SpecializationID,@ContactNumber,@Email,@Address,GETDATE(),@IsActive);
	END
	ELSE
	BEGIN
		UPDATE Doctors SET FirstName = @FirstName,LastName = @LastName,SpecializationID = @SpecializationID,ContactNumber = @ContactNumber,Email = @Email,Address = @Address,UpdatedOn = GETDATE(),IsActive = @IsActive WHERE Id=@Id
	END
END
GO

drop procedure USP_Doctors_Insert_Update

EXEC USP_Doctors_Insert_Update 1,'Dr. Sona','Ali',1,'9446786538','sona@gmail.com','chenk veedu cdlm'

select * from Doctors

exec USP_Doctors_GetDoctors null,null,null,null

===================================================================================
CREATE PROCEDURE USP_Doctors_DeleteDoctor
	-- Add the parameters for the stored procedure here
	@Id INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
 
    -- Insert statements for procedure here
	DELETE FROM Doctors WHERE Id=@Id
END
GO

drop procedure USP_Doctors_DeleteDoctor
================================================================================


CREATE PROCEDURE USP_Doctors_DeleteDoctor
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;
    -- Soft delete by updating IsActive to 0
    UPDATE Doctors
    SET IsActive = 0
    WHERE ID = @ID;
END
==========================================================================================
CREATE PROCEDURE USP_Specializations_GetSpecializations
    @ID INT = NULL,
    @Name NVARCHAR(50) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Common Table Expression (CTE) for filtering
    WITH FilteredSpecializations AS (
        SELECT
            ID,
            SpecializationName,
            CreatedBy,
            CreatedOn,
            UpdatedBy,
            UpdatedOn,
            IsActive
        FROM
            Specializations
        WHERE
            (@ID IS NULL OR ID = @ID)
            AND (@Name IS NULL OR SpecializationName LIKE '%' + @Name + '%')
            AND IsActive = 1 -- Added condition for IsActive
    )
    
    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        SpecializationName,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'SpecializationName' AND @SortOrder = 'ASC' THEN SpecializationName END ASC,
                    CASE WHEN @SortColumn = 'SpecializationName' AND @SortOrder = 'DESC' THEN SpecializationName END DESC
                ) AS RowNum
            FROM
                FilteredSpecializations
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END

EXEC USP_Specializations_GetSpecializations
    @ID =null ,
    @Name = null,
    @SortColumn = 'ID',
    @SortOrder='aes',
    @PageSize = 10,
    @PageNumber = 1;



==============================================================================================================================================================================================

CREATE PROCEDURE USP_Specializations_Insert_Update
    @ID INT,
    @Name NVARCHAR(50),
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert statements for procedure here
    IF (@ID IS NULL OR @ID = 0)
    BEGIN
        INSERT INTO Specializations (SpecializationName, CreatedOn, IsActive)
        VALUES (@Name, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        UPDATE Specializations
        SET SpecializationName = @Name,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE ID = @ID;
    END
END
GO


EXEC USP_Specializations_Insert_Update
    @ID = NULL,
    @Name = 'Nephrology',
    @IsActive = 1;

select *from Specializations

=================================================================================================================

CREATE PROCEDURE USP_Specializations_DeleteSpecialization
    @ID INT = null,
	@Name nvarchar(25)=null
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE Specializations
    SET IsActive = 0
    WHERE ID = @ID or SpecializationName = @Name;

END

drop procedure USP_Specializations_DeleteSpecialization

====================================================================================================================================================================================


CREATE PROCEDURE USP_Patients_GetPatients
    @ID INT = NULL,
    @FirstName NVARCHAR(50) = NULL,
    @LastName NVARCHAR(50) = NULL,
    @DateOfBirth DATE = NULL,
    @Gender NVARCHAR(10) = NULL,
    @ContactNumber NVARCHAR(20) = NULL,
    @Address NVARCHAR(255) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering
    WITH FilteredPatients AS (
        SELECT
            ID,
            FirstName,
            LastName,
            DateOfBirth,
            Gender,
            ContactNumber,
            Email,
            Address,
			CreatedBy,
			CreatedOn,
			UpdatedBy,
			UpdatedOn,
			IsActive
        FROM
            Patients
        WHERE
            (@ID IS NULL OR ID = @ID)
            AND (@FirstName IS NULL OR FirstName LIKE '%' + @FirstName + '%')
            AND (@LastName IS NULL OR LastName LIKE '%' + @LastName + '%')
            AND (@DateOfBirth IS NULL OR DateOfBirth = @DateOfBirth)
            AND (@Gender IS NULL OR Gender = @Gender)
            AND (@ContactNumber IS NULL OR ContactNumber = @ContactNumber)
            AND (@Address IS NULL OR Address LIKE '%' + @Address + '%')
			AND IsActive = 1
    )

    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        FirstName,
        LastName,
        DateOfBirth,
        Gender,
        ContactNumber,
        Email,
        Address,
		CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'ASC' THEN FirstName END ASC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'DESC' THEN FirstName END DESC
                ) AS RowNum
            FROM
                FilteredPatients
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END

drop procedure USP_Patients_GetPatients

exec USP_Patients_GetPatients

EXEC USP_Patients_GetPatients
    @ID = 1,
    @FirstName = null,
    @LastName = null,
    @DateOfBirth = null,
    @Gender = null,
    @ContactNumber = null,
    @Address = null
    @SortColumn = @SortColumn,
    @SortOrder = @SortOrder,
    @PageSize = @PageSize,
    @PageNumber = @PageNumber;

=============================================================================================


CREATE PROCEDURE USP_Patients_Insert_Update
    @Id INT,
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @DateOfBirth DATE,
    @Gender NVARCHAR(10),
    @ContactNumber NVARCHAR(20),
    @Email NVARCHAR(100),
    @Address NVARCHAR(255),
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;
    IF (@Id IS NULL OR @Id = 0)
    BEGIN
        INSERT INTO Patients (FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Address, CreatedOn, IsActive)
        VALUES (@FirstName, @LastName, @DateOfBirth, @Gender, @ContactNumber, @Email, @Address, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        UPDATE Patients
        SET FirstName = @FirstName,
            LastName = @LastName,
            DateOfBirth = @DateOfBirth,
            Gender = @Gender,
            ContactNumber = @ContactNumber,
            Email = @Email,
            Address = @Address,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE Id = @Id;
    END
END
GO

-- Execute the stored procedure with the declared values
EXEC USP_Patients_Insert_Update
    @ID = null,
    @FirstName = 'Zulphiker',
    @LastName = 'Ali',
    @DateOfBirth = '1956-05-23',
    @Gender = 'Male',
    @ContactNumber = '873658345',
    @Email = 'zulph@gmail.com',
    @Address = 'pookodiyio house veykal',
    @IsActive = 1;

	select *from Patients
	==========================================================================================


CREATE PROCEDURE USP_Patients_DeletePatient
    @ID INT = NULL,
    @FirstName NVARCHAR(50) = NULL,
    @LastName NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE Patients
    SET IsActive = 0
    WHERE ID = @ID OR (FirstName = @FirstName AND LastName = @LastName);
END

EXEC USP_Patients_DeletePatient  

    @FirstName = John,
	@LastName = Doe


	select *from patients



=================================================================================================================================
CREATE PROCEDURE USP_MedicalRecords_GetMedicalRecords
    @ID INT = NULL,
    @PatientID INT = NULL,
    @DoctorID INT = NULL,
    @Date DATE = NULL,
    @Diagnosis NVARCHAR(255) = NULL,
    @Prescription NVARCHAR(MAX) = NULL,
    @TestResult NVARCHAR(MAX) = NULL,
    @SpecializationName NVARCHAR(50) = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @PatientFullName NVARCHAR(100) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering and joining with related tables
    WITH FilteredMedicalRecords AS (
        SELECT
            MR.ID,
            MR.PatientID,
            MR.DoctorID,
            MR.Date,
            MR.Diagnosis,
            MR.Prescription,
            MR.TestResults,
            MR.CreatedBy,
            MR.CreatedOn,
            MR.UpdatedBy,
            MR.UpdatedOn,
            MR.IsActive,
            P.FirstName AS PatientFirstName,
            P.LastName AS PatientLastName,
            D.FirstName AS DoctorFirstName,
            D.LastName AS DoctorLastName,
            S.SpecializationName
        FROM
            MedicalRecords MR
        LEFT JOIN
            Patients P ON MR.PatientID = P.ID
        LEFT JOIN
            Doctors D ON MR.DoctorID = D.ID
        LEFT JOIN
            Specializations S ON D.SpecializationID = S.ID
        WHERE
            (@ID IS NULL OR MR.ID = @ID)
            AND (@PatientID IS NULL OR MR.PatientID = @PatientID)
            AND (@DoctorID IS NULL OR MR.DoctorID = @DoctorID)
            AND (@Date IS NULL OR MR.Date = @Date)
            AND (@Diagnosis IS NULL OR MR.Diagnosis LIKE '%' + @Diagnosis + '%')
            AND (@Prescription IS NULL OR MR.Prescription LIKE '%' + @Prescription + '%')
            AND (@TestResult IS NULL OR MR.TestResults LIKE '%' + @TestResult + '%')
            AND (@SpecializationName IS NULL OR S.SpecializationName LIKE '%' + @SpecializationName + '%')
            AND (@DoctorFullName IS NULL OR (D.FirstName + ' ' + D.LastName) LIKE '%' + @DoctorFullName + '%')
            AND (@PatientFullName IS NULL OR (P.FirstName + ' ' + P.LastName) LIKE '%' + @PatientFullName + '%')
            AND MR.IsActive = 1
    )

   -- Pagination using ROW_NUMBER()
SELECT
    ID,
    SpecializationName,
    Date,
    PatientID,
    CONCAT(PatientFirstName, ' ', PatientLastName) AS PatientFullName,
    DoctorID,
    CONCAT(DoctorFirstName, ' ', DoctorLastName) AS DoctorFullName,        
    Diagnosis,
    Prescription,
    TestResults,
    CreatedBy,
    CreatedOn,
    UpdatedBy,
    UpdatedOn,
    IsActive
FROM
    (
        SELECT
            ID,
            SpecializationName,
            Date,
            PatientID,
            PatientFirstName,
            PatientLastName,
            DoctorID,
            DoctorFirstName,
            DoctorLastName,        
            Diagnosis,
            Prescription,
            TestResults,
            CreatedBy,
            CreatedOn,
            UpdatedBy,
            UpdatedOn,
            IsActive,
            ROW_NUMBER() OVER (ORDER BY
                CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                CASE WHEN @SortColumn = 'Date' AND @SortOrder = 'ASC' THEN Date END ASC,
                CASE WHEN @SortColumn = 'Date' AND @SortOrder = 'DESC' THEN Date END DESC
            ) AS RowNum
        FROM
            FilteredMedicalRecords
    ) AS NumberedRows
WHERE
    RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
ORDER BY
    RowNum;

END


 
 drop procedure USP_MedicalRecords_GetMedicalRecords


 EXEC USP_MedicalRecords_GetMedicalRecords
    @ID = @ID,
    @PatientID = @PatientID,
    @DoctorID = @DoctorID,
    @Date = @Date,
    @Diagnosis = @Diagnosis,
    @Prescription = @Prescription,
    @TestResult = @TestResult,
    @SortColumn = @SortColumn,
    @SortOrder = @SortOrder,
    @PageSize = @PageSize,
    @PageNumber = @PageNumber;


==================================================================================================================================================


CREATE PROCEDURE USP_MedicalRecords_Insert_Update
    @ID INT,
    @PatientID INT,
    @DoctorID INT,
    @Date DATE,
    @Diagnosis NVARCHAR(255),
    @Prescription NVARCHAR(MAX),
    @TestResult NVARCHAR(MAX),
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    IF (@ID IS NULL OR @ID = 0)
    BEGIN
        INSERT INTO MedicalRecords (PatientID, DoctorID, Date, Diagnosis, Prescription, TestResults, CreatedOn, IsActive)
        VALUES (@PatientID, @DoctorID, @Date, @Diagnosis, @Prescription, @TestResult,  GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        UPDATE MedicalRecords
        SET PatientID = @PatientID,
            DoctorID = @DoctorID,
            Date = @Date,
            Diagnosis = @Diagnosis,
            Prescription = @Prescription,
            TestResults = @TestResult,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE ID = @ID;
    END
END
GO

drop procedure USP_MedicalRecords_Insert_Update

EXEC USP_MedicalRecords_Insert_Update
    @ID = @ID,
    @PatientID = @PatientID,
    @DoctorID = @DoctorID,
    @Date = @Date,
    @Diagnosis = @Diagnosis,
    @Prescription = @Prescription,
    @TestResult = @TestResult,
    @CreatedBy = @CreatedBy,
    @CreatedOn = @CreatedOn,
    @UpdatedBy = @UpdatedBy,
    @UpdatedOn = @UpdatedOn,
    @IsActive = @IsActive;


=================================================================================================================

CREATE PROCEDURE USP_MedicalRecords_DeleteMedicalRecord
    @ID INT = NULL,
    @PatientFullName NVARCHAR(100) = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @Diagnosis NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE MedicalRecords
    SET IsActive = 0
    WHERE (ID = @ID)
        OR ((SELECT ID FROM Patients WHERE CONCAT(FirstName, ' ', LastName) = @PatientFullName) = PatientID)
        OR ((SELECT ID FROM Doctors WHERE CONCAT(FirstName, ' ', LastName) = @DoctorFullName) = DoctorID)
        OR (Diagnosis = @Diagnosis);
END


drop procedure USP_MedicalRecords_DeleteMedicalRecord 

exec USP_MedicalRecords_DeleteMedicalRecord

===========================================================================================================================================

--Admission Table
CREATE PROCEDURE USP_Admissions_GetAdmissions
    @AdmissionID INT = NULL,
    @PatientFullName NVARCHAR(100) = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @AdmissionDate DATE = NULL,
    @DischargeDate DATE = NULL,
    @WardType NVARCHAR(50) = NULL,
    @SortColumn NVARCHAR(50) = 'AdmissionID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering and joining with related tables
    WITH FilteredAdmissions AS (
        SELECT
            A.ID,
            A.PatientID,
            A.AdmissionDate,
            A.DischargeDate,
            A.WardID,
			A.WardNumber,
            A.DoctorID,
            A.CreatedBy,
            A.CreatedOn,
            A.UpdatedBy,
            A.UpdatedOn,
            A.IsActive,
            P.FirstName AS PatientFirstName,
            P.LastName AS PatientLastName,
            D.FirstName AS DoctorFirstName,
            D.LastName AS DoctorLastName,
            W.WardType
        FROM
            Admissions A
        LEFT JOIN
            Patients P ON A.PatientID = P.ID
        LEFT JOIN
            Doctors D ON A.DoctorID = D.ID
        LEFT JOIN
            Wards W ON A.WardID = W.ID
        WHERE
            (@AdmissionID IS NULL OR A.ID = @AdmissionID)
            AND (@PatientFullName IS NULL OR (P.FirstName + ' ' + P.LastName) LIKE '%' + @PatientFullName + '%')
            AND (@DoctorFullName IS NULL OR (D.FirstName + ' ' + D.LastName) LIKE '%' + @DoctorFullName + '%')
            AND (@AdmissionDate IS NULL OR A.AdmissionDate = @AdmissionDate)
            AND (@DischargeDate IS NULL OR A.DischargeDate = @DischargeDate)
            AND (@WardType IS NULL OR W.WardType LIKE '%' + @WardType + '%')
            AND A.IsActive = 1
    )

   -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        AdmissionDate,
        DischargeDate,
        WardID,
        WardType,
		WardNumber,
        PatientID,
        CONCAT(PatientFirstName, ' ', PatientLastName) AS PatientFullName,
        DoctorID,
        CONCAT(DoctorFirstName, ' ', DoctorLastName) AS DoctorFullName,        
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                ID,
                AdmissionDate,
                DischargeDate,
                WardID,
                WardType,
				WardNumber,
                PatientID,
                PatientFirstName,
                PatientLastName,
                DoctorID,
                DoctorFirstName,
                DoctorLastName,        
                CreatedBy,
                CreatedOn,
                UpdatedBy,
                UpdatedOn,
                IsActive,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'AdmissionID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'AdmissionID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'AdmissionDate' AND @SortOrder = 'ASC' THEN AdmissionDate END ASC,
                    CASE WHEN @SortColumn = 'AdmissionDate' AND @SortOrder = 'DESC' THEN AdmissionDate END DESC
                ) AS RowNum
            FROM
                FilteredAdmissions
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;

END


drop procedure USP_Admissions_GetAdmissions 


exec USP_Admissions_GetAdmissions 1

===============================================================================

--InsertUpdate for admission table

CREATE PROCEDURE USP_Admissions_Insert_Update
    @AdmissionID INT,
    @PatientID INT,
    @DoctorID INT,
    @AdmissionDate DATE,
    @DischargeDate DATE,
    @WardID INT,
    @WardNumber INT, -- Add this line for WardNumber
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    IF (@AdmissionID IS NULL OR @AdmissionID = 0)
    BEGIN
        -- Insert new record
        INSERT INTO Admissions (PatientID, DoctorID, AdmissionDate, DischargeDate, WardID, WardNumber, CreatedOn, IsActive)
        VALUES (@PatientID, @DoctorID, @AdmissionDate, @DischargeDate, @WardID, @WardNumber, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        -- Update existing record
        UPDATE Admissions
        SET PatientID = @PatientID,
            DoctorID = @DoctorID,
            AdmissionDate = @AdmissionDate,
            DischargeDate = @DischargeDate,
            WardID = @WardID,
            WardNumber = @WardNumber, -- Add this line for WardNumber
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE ID = @AdmissionID;
    END
END
GO


drop procedure USP_Admissions_Insert_Update

=================================================================================================================

--delete admission table

CREATE PROCEDURE USP_Admissions_DeleteAdmission
    @AdmissionID INT = NULL,
    @PatientFullName NVARCHAR(100) = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @AdmissionDate DATE = NULL,
    @DischargeDate DATE = NULL,
    @WardType NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE Admissions
    SET IsActive = 0
    WHERE (ID = @AdmissionID)
        OR ((SELECT PatientID FROM Patients WHERE CONCAT(FirstName, ' ', LastName) = @PatientFullName) = PatientID)
        OR ((SELECT DoctorID FROM Doctors WHERE CONCAT(FirstName, ' ', LastName) = @DoctorFullName) = DoctorID)
        OR (AdmissionDate = @AdmissionDate)
        OR (DischargeDate = @DischargeDate)
        OR ((SELECT WardID FROM Wards WHERE WardType = @WardType) = WardID);
END

drop procedure USP_Admissions_DeleteAdmission

====================================================================================================================================================

--getlist of wards table

CREATE PROCEDURE USP_Wards_GetWards
    @ID INT = NULL,
    @WardType NVARCHAR(50) = NULL,
    @Capacity INT = NULL,
    @CurrentOccupancy INT = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering
    WITH FilteredWards AS (
        SELECT
            ID,
            WardType,
            Capacity,
            CurrentOccupancy,
            CreatedBy,
            CreatedOn,
            UpdatedBy,
            UpdatedOn,
            IsActive
        FROM
            Wards
        WHERE
            (@ID IS NULL OR ID = @ID)
            AND (@WardType IS NULL OR WardType LIKE '%' + @WardType + '%')
            AND (@Capacity IS NULL OR Capacity = @Capacity)
            AND (@CurrentOccupancy IS NULL OR CurrentOccupancy = @CurrentOccupancy)
            AND IsActive = 1
    )

    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        WardType,
        Capacity,
        CurrentOccupancy,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'WardType' AND @SortOrder = 'ASC' THEN WardType END ASC,
                    CASE WHEN @SortColumn = 'WardType' AND @SortOrder = 'DESC' THEN WardType END DESC
                ) AS RowNum
            FROM
                FilteredWards
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END


drop procedure USP_Wards_GetWards

exec USP_Wards_GetWards


============================================================================================================================================

--sp for insert update


CREATE PROCEDURE USP_Wards_Insert_Update
    @ID INT,
    @WardType NVARCHAR(50),
    @Capacity INT,
    @CurrentOccupancy INT,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    IF (@ID IS NULL OR @ID = 0)
    BEGIN
        -- Insert new record
        INSERT INTO Wards (WardType, Capacity, CurrentOccupancy, CreatedOn, IsActive)
        VALUES (@WardType, @Capacity, @CurrentOccupancy, GETDATE(),  @IsActive);
    END
    ELSE
    BEGIN
        -- Update existing record
        UPDATE Wards
        SET WardType = @WardType,
            Capacity = @Capacity,
            CurrentOccupancy = @CurrentOccupancy,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE ID = @ID;
    END
END
GO

drop procedure USP_Wards_Insert_Update

================================================================================
--sp to delete wards


CREATE PROCEDURE USP_Wards_DeleteWard
    @WardID INT = NULL,
    @WardType NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE Wards
    SET IsActive = 0
    WHERE (ID = @WardID)
        OR (WardType = @WardType);
END

drop procedure USP_Wards_DeleteWard

===========================================================================================================

--get list for billing table

CREATE PROCEDURE USP_Billing_GetBillings
    @ID INT = NULL,
    @PatientFullName NVARCHAR(100) = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @BillDate DATE = NULL,
    @TotalAmount DECIMAL(18, 2) = NULL,
    @PaymentStatus NVARCHAR(50) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering and joining
    WITH FilteredBillings AS (
        SELECT
            B.ID,
            B.PatientID,
            B.DoctorID,
            B.BillDate,
            B.TotalAmount,
            B.PaymentStatus,
            B.CreatedBy,
            B.CreatedOn,
            B.UpdatedBy,
            B.UpdatedOn,
            B.IsActive,
            P.FirstName AS PatientFirstName,
            P.LastName AS PatientLastName,
            D.FirstName AS DoctorFirstName,
            D.LastName AS DoctorLastName
        FROM
            Billing B
        LEFT JOIN
            Patients P ON B.PatientID = P.ID
        LEFT JOIN
            Doctors D ON B.DoctorID = D.ID
        WHERE
            (@ID IS NULL OR B.ID = @ID)
            AND (@PatientFullName IS NULL OR (P.FirstName + ' ' + P.LastName) LIKE '%' + @PatientFullName + '%')
            AND (@DoctorFullName IS NULL OR (D.FirstName + ' ' + D.LastName) LIKE '%' + @DoctorFullName + '%')
            AND (@BillDate IS NULL OR B.BillDate = @BillDate)
            AND (@TotalAmount IS NULL OR B.TotalAmount = @TotalAmount)
            AND (@PaymentStatus IS NULL OR B.PaymentStatus = @PaymentStatus)
            AND B.IsActive = 1
    )

    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        PatientID,
        DoctorID,
		CONCAT(PatientFirstName, ' ', PatientLastName) AS PatientFullName,
        CONCAT(DoctorFirstName, ' ', DoctorLastName) AS DoctorFullName,
        BillDate,
        TotalAmount,
        PaymentStatus,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
        
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'BillDate' AND @SortOrder = 'ASC' THEN BillDate END ASC,
                    CASE WHEN @SortColumn = 'BillDate' AND @SortOrder = 'DESC' THEN BillDate END DESC
                ) AS RowNum
            FROM
                FilteredBillings
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END

drop procedure USP_Billing_GetBillings

exec USP_Billing_GetBillings


===========================================================================================================

-- billing insertupdate


CREATE PROCEDURE USP_Billing_Insert_Update
    @BillingID INT,
    @PatientID INT,
    @DoctorID INT,
    @BillDate DATE,
    @TotalAmount DECIMAL(18, 2),
    @PaymentStatus NVARCHAR(50),
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    IF (@BillingID IS NULL OR @BillingID = 0)
    BEGIN
        -- Insert new record
        INSERT INTO Billing (PatientID, DoctorID, BillDate, TotalAmount, PaymentStatus, CreatedOn, IsActive)
        VALUES (@PatientID, @DoctorID, @BillDate, @TotalAmount, @PaymentStatus, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        -- Update existing record
        UPDATE Billing
        SET PatientID = @PatientID,
            DoctorID = @DoctorID,
            BillDate = @BillDate,
            TotalAmount = @TotalAmount,
            PaymentStatus = @PaymentStatus,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE ID = @BillingID;
    END
END
GO

drop procedure USP_Billing_Insert_Update
exec USP_Billing_Insert_Update 4, 1  

===================================================================================

--delete procedure for billing table

CREATE PROCEDURE USP_Billing_DeleteBill
    @BillingID INT = NULL,
    @PatientFullName NVARCHAR(100) = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @BillDate DATE = NULL,
    @TotalAmount DECIMAL(18, 2) = NULL,
    @PaymentStatus NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE Billing
    SET IsActive = 0
    WHERE (ID = @BillingID)
        OR ((SELECT PatientID FROM Patients WHERE CONCAT(FirstName, ' ', LastName) = @PatientFullName) = PatientID)
        OR ((SELECT DoctorID FROM Doctors WHERE CONCAT(FirstName, ' ', LastName) = @DoctorFullName) = DoctorID)
        OR (BillDate = @BillDate)
        OR (TotalAmount = @TotalAmount)
        OR (PaymentStatus = @PaymentStatus);
END

drop procedure USP_Billing_DeleteBill

==========================================================================================================

--storedprocedure to getalllist

CREATE PROCEDURE USP_Staff_GetStaffList
    @ID INT = NULL,
    @FullName NVARCHAR(100) = NULL,
    @Position NVARCHAR(50) = NULL,
    @ContactNumber NVARCHAR(20) = NULL,
    @Email NVARCHAR(255) = NULL,
    @Address NVARCHAR(255) = NULL,
    @RoleID INT = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering and joining
    WITH FilteredStaff AS (
        SELECT
            S.ID,
            S.FirstName,
            S.LastName,
            S.Position,
            S.ContactNumber,
            S.Email,
            S.Address,
            S.RoleID,
            S.CreatedBy,
            S.CreatedOn,
            S.UpdatedBy,
            S.UpdatedOn,
            S.IsActive,
            R.RoleName
        FROM
            Staff S
        LEFT JOIN
            Roles R ON S.RoleID = R.ID
        WHERE
            (@ID IS NULL OR S.ID = @ID)
            AND (@FullName IS NULL OR (S.FirstName + ' ' + S.LastName) LIKE '%' + @FullName + '%')
            AND (@Position IS NULL OR S.Position LIKE '%' + @Position + '%')
            AND (@ContactNumber IS NULL OR S.ContactNumber = @ContactNumber)
            AND (@Email IS NULL OR S.Email LIKE '%' + @Email + '%')
            AND (@Address IS NULL OR S.Address LIKE '%' + @Address + '%')
            AND (@RoleID IS NULL OR S.RoleID = @RoleID)
            AND S.IsActive = 1
    )

    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        FirstName,
        LastName,
        Position,
        ContactNumber,
        Email,
        Address,
        RoleID,
        RoleName,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'ASC' THEN FirstName END ASC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'DESC' THEN FirstName END DESC
                ) AS RowNum
            FROM
                FilteredStaff
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END

exec USP_Staff_GetStaffList

=======================================================================================================================

--insertUpdate for staff table

CREATE PROCEDURE USP_Staff_GetStaffList
    @ID INT = NULL,
    @FullName NVARCHAR(100) = NULL,
    @Position NVARCHAR(50) = NULL,
    @ContactNumber NVARCHAR(20) = NULL,
    @Email NVARCHAR(255) = NULL,
    @Address NVARCHAR(255) = NULL,
    @RoleName NVARCHAR(50) = NULL,  -- New parameter for RoleName
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering and joining
    WITH FilteredStaff AS (
        SELECT
            S.ID,
            S.FirstName,
            S.LastName,
            S.Position,
            S.ContactNumber,
            S.Email,
            S.Address,
            S.RoleID,
            S.CreatedBy,
            S.CreatedOn,
            S.UpdatedBy,
            S.UpdatedOn,
            S.IsActive,
            R.RoleName
        FROM
            Staff S
        LEFT JOIN
            Roles R ON S.RoleID = R.ID
        WHERE
            (@ID IS NULL OR S.ID = @ID)
            AND (@FullName IS NULL OR (S.FirstName + ' ' + S.LastName) LIKE '%' + @FullName + '%')
            AND (@Position IS NULL OR S.Position LIKE '%' + @Position + '%')
            AND (@ContactNumber IS NULL OR S.ContactNumber = @ContactNumber)
            AND (@Email IS NULL OR S.Email LIKE '%' + @Email + '%')
            AND (@Address IS NULL OR S.Address LIKE '%' + @Address + '%')
            AND (@RoleName IS NULL OR R.RoleName LIKE '%' + @RoleName + '%')  -- Filter by RoleName
            AND S.IsActive = 1
    )

    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        FirstName,
        LastName,
        Position,
        ContactNumber,
        Email,
        Address,
        RoleID,
        RoleName,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'ASC' THEN FirstName END ASC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'DESC' THEN FirstName END DESC
                ) AS RowNum
            FROM
                FilteredStaff
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END



drop procedure USP_Staff_Insert_Update

=======================================================================================================================

--delete for staff table

CREATE PROCEDURE USP_Staff_DeleteStaff
    @StaffID INT = NULL,
    @FullName NVARCHAR(100) = NULL,
    @Position NVARCHAR(50) = NULL,
    @RoleID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE Staff
    SET IsActive = 0
    WHERE (ID = @StaffID)
        OR ((SELECT ID FROM Staff WHERE CONCAT(FirstName, ' ', LastName) = @FullName) = ID)
        OR (Position = @Position)
        OR (RoleID = @RoleID);
END

drop procedure USP_Staff_DeleteStaff

=================================================================================================================

--get list for role table

CREATE PROCEDURE USP_Roles_GetRoles
    @ID INT = NULL,
    @RoleName NVARCHAR(50) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering
    WITH FilteredRoles AS (
        SELECT
            ID,
            RoleName,
            CreatedBy,
            CreatedOn,
            UpdatedBy,
            UpdatedOn,
            IsActive
        FROM
            Roles
        WHERE
            (@ID IS NULL OR ID = @ID)
            AND (@RoleName IS NULL OR RoleName LIKE '%' + @RoleName + '%')
			AND IsActive=1
    )

    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        RoleName,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'RoleName' AND @SortOrder = 'ASC' THEN RoleName END ASC,
                    CASE WHEN @SortColumn = 'RoleName' AND @SortOrder = 'DESC' THEN RoleName END DESC
                ) AS RowNum
            FROM
                FilteredRoles
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END

drop procedure USP_Roles_GetRoles

exec USP_Roles_GetRoles

=============================================================================================================================
--insert update for role table

CREATE PROCEDURE USP_Roles_Insert_Update
    @ID INT,
    @RoleName NVARCHAR(50),
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    IF (@ID IS NULL OR @ID = 0)
    BEGIN
        -- Insert new record
        INSERT INTO Roles (RoleName, CreatedOn, IsActive)
        VALUES (@RoleName, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        -- Update existing record
        UPDATE Roles
        SET RoleName = @RoleName,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE ID = @ID;
    END
END

drop procedure USP_Roles_Insert_Update

==============================================================================================================

--delete roles

CREATE PROCEDURE USP_Roles_DeleteRole
    @ID INT = NULL,
    @RoleName NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE Roles
    SET IsActive = 0
    WHERE (ID = @ID)
        OR (@RoleName IS NOT NULL AND RoleName = @RoleName);
END

drop procedure USP_Roles_DeleteRole 

exec USP_Roles_DeleteRole 1

=================================================================================================
--get list of doctorschedule

CREATE PROCEDURE USP_DoctorSchedules_GetList
    @ID INT = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @DayOfWeek NVARCHAR(50) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering and joining
    WITH FilteredDoctorSchedules AS (
        SELECT
            ds.ID,
            ds.DoctorID,
            ds.DayOfWeek,
            ds.StartTime,
            ds.EndTime,
            ds.CreatedBy,
            ds.CreatedOn,
            ds.UpdatedBy,
            ds.UpdatedOn,
            ds.IsActive,
            (d.FirstName + ' ' + d.LastName) AS DoctorFullName, -- Added for friendly doctor name
            DATENAME(WEEKDAY, DATEADD(DAY, ds.DayOfWeek - 1, 0)) AS FriendlyDayOfWeek -- Added for friendly day of week
        FROM
            DoctorSchedule ds
            INNER JOIN Doctors d ON ds.DoctorID = d.ID
        WHERE
            (@ID IS NULL OR ds.ID = @ID)
            AND (@DoctorFullName IS NULL OR (d.FirstName + ' ' + d.LastName) LIKE '%' + @DoctorFullName + '%')
            AND (@DayOfWeek IS NULL OR DATENAME(WEEKDAY, DATEADD(DAY, ds.DayOfWeek - 1, 0)) LIKE '%' + @DayOfWeek + '%')
			AND ds.IsActive = 1
    )

    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        DoctorID,
        DayOfWeek,
        StartTime,
        EndTime,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive,
        DoctorFullName,
        FriendlyDayOfWeek
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'DoctorFullName' AND @SortOrder = 'ASC' THEN DoctorFullName END ASC,
                    CASE WHEN @SortColumn = 'DoctorFullName' AND @SortOrder = 'DESC' THEN DoctorFullName END DESC
                ) AS RowNum
            FROM
                FilteredDoctorSchedules
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END


exec USP_DoctorSchedules_GetList

drop procedure  USP_DoctorSchedules_GetList


===================================================================================================================================================

--insert update for doctor schedule

CREATE PROCEDURE USP_DoctorSchedules_Insert_Update
    @ID INT,
    @DoctorID INT,
    @DayOfWeek NVARCHAR(50),
    @StartTime TIME,
    @EndTime TIME,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DayOfWeekInt INT;
    
    -- Map friendly day of week to its corresponding integer value
    SET @DayOfWeekInt = 
        CASE 
            WHEN UPPER(@DayOfWeek) = 'SUNDAY' THEN 1
            WHEN UPPER(@DayOfWeek) = 'MONDAY' THEN 2
            WHEN UPPER(@DayOfWeek) = 'TUESDAY' THEN 3
            WHEN UPPER(@DayOfWeek) = 'WEDNESDAY' THEN 4
            WHEN UPPER(@DayOfWeek) = 'THURSDAY' THEN 5
            WHEN UPPER(@DayOfWeek) = 'FRIDAY' THEN 6
            WHEN UPPER(@DayOfWeek) = 'SATURDAY' THEN 7
            ELSE NULL
        END;

    IF (@ID IS NULL OR @ID = 0)
    BEGIN
        -- Insert new record
        INSERT INTO DoctorSchedule (DoctorID, DayOfWeek, StartTime, EndTime, CreatedOn, IsActive)
        VALUES (@DoctorID, @DayOfWeekInt, @StartTime, @EndTime, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        -- Update existing record
        UPDATE DoctorSchedule
        SET DoctorID = @DoctorID,
            DayOfWeek = @DayOfWeekInt,
            StartTime = @StartTime,
            EndTime = @EndTime,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE ID = @ID;
    END
END

drop procedure USP_DoctorSchedules_Insert_Update

exec USP_DoctorSchedules_Insert_Update

=================================================

--soft delte for doctorschedule table

CREATE PROCEDURE USP_DoctorSchedules_Delete
    @ID INT = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @DayOfWeek NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DayOfWeekInt INT;

    -- Map friendly day of week to its corresponding integer value
    SET @DayOfWeekInt =
        CASE
            WHEN UPPER(@DayOfWeek) = 'SUNDAY' THEN 1
            WHEN UPPER(@DayOfWeek) = 'MONDAY' THEN 2
            WHEN UPPER(@DayOfWeek) = 'TUESDAY' THEN 3
            WHEN UPPER(@DayOfWeek) = 'WEDNESDAY' THEN 4
            WHEN UPPER(@DayOfWeek) = 'THURSDAY' THEN 5
            WHEN UPPER(@DayOfWeek) = 'FRIDAY' THEN 6
            WHEN UPPER(@DayOfWeek) = 'SATURDAY' THEN 7
            ELSE NULL
        END;

    -- Soft delete by updating IsActive to 0
    UPDATE DoctorSchedule
    SET IsActive = 0
    WHERE (ID = @ID OR @ID IS NULL)
        AND (DoctorID IN (SELECT ID FROM Doctors WHERE CONCAT(FirstName, ' ', LastName) LIKE '%' + @DoctorFullName + '%') OR @DoctorFullName IS NULL)
        AND (DayOfWeek = @DayOfWeekInt OR @DayOfWeek IS NULL);
END


==========================================================================================================================================================================

--get list of appointment table

CREATE PROCEDURE USP_Appointments_GetList
    @ID INT = NULL,
    @PatientFullName NVARCHAR(100) = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @Status NVARCHAR(20) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 10,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Common Table Expression (CTE) for filtering and joining
    WITH FilteredAppointments AS (
        SELECT
            a.ID,
            a.PatientID,
            a.DoctorID,
            a.ScheduleID,
            a.AppointmentDate,
            a.AppointmentTime,
            a.Status,
            a.CreatedBy,
            a.CreatedOn,
            a.UpdatedBy,
            a.UpdatedOn,
            a.IsActive,
            (p.FirstName + ' ' + p.LastName) AS PatientFullName,
            (d.FirstName + ' ' + d.LastName) AS DoctorFullName
        FROM
            Appointments a
            INNER JOIN Patients p ON a.PatientID = p.ID
            INNER JOIN Doctors d ON a.DoctorID = d.ID
        WHERE
            (@ID IS NULL OR a.ID = @ID)
            AND (@PatientFullName IS NULL OR (p.FirstName + ' ' + p.LastName) LIKE '%' + @PatientFullName + '%')
            AND (@DoctorFullName IS NULL OR (d.FirstName + ' ' + d.LastName) LIKE '%' + @DoctorFullName + '%')
            AND (@Status IS NULL OR a.Status LIKE '%' + @Status + '%')
            AND a.IsActive = 1
    )

    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        PatientID,
        DoctorID,
        ScheduleID,
        AppointmentDate,
        AppointmentTime,
        Status,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive,
        PatientFullName,
        DoctorFullName
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'PatientFullName' AND @SortOrder = 'ASC' THEN PatientFullName END ASC,
                    CASE WHEN @SortColumn = 'PatientFullName' AND @SortOrder = 'DESC' THEN PatientFullName END DESC,
                    CASE WHEN @SortColumn = 'DoctorFullName' AND @SortOrder = 'ASC' THEN DoctorFullName END ASC,
                    CASE WHEN @SortColumn = 'DoctorFullName' AND @SortOrder = 'DESC' THEN DoctorFullName END DESC
                ) AS RowNum
            FROM
                FilteredAppointments
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END

drop procedure USP_Appointments_GetList

exec USP_Appointments_GetList

===========================================================================================================================
--insert update for appointments

CREATE PROCEDURE USP_Appointments_Insert_Update
    @ID INT,
    @PatientFullName NVARCHAR(100),
    @DoctorFullName NVARCHAR(100),
    @ScheduleID INT,
    @AppointmentDate DATE,
    @AppointmentTime TIME,
    @Status VARCHAR(20),
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @PatientID INT;
    DECLARE @DoctorID INT;

    -- Attempt to get PatientID based on PatientFullName
    SELECT @PatientID = ID
    FROM Patients
    WHERE (FirstName + ' ' + LastName) = @PatientFullName;

    -- Attempt to get DoctorID based on DoctorFullName
    SELECT @DoctorID = ID
    FROM Doctors
    WHERE (FirstName + ' ' + LastName) = @DoctorFullName;

    IF (@ID IS NULL OR @ID = 0)
    BEGIN
        -- Insert new record
        INSERT INTO Appointments (
            PatientID,
            DoctorID,
            ScheduleID,
            AppointmentDate,
            AppointmentTime,
            Status,
            CreatedOn,
            IsActive
        )
        VALUES (
            @PatientID,  -- PatientID or NULL if patient not found
            @DoctorID,   -- DoctorID or NULL if doctor not found
            @ScheduleID,
            @AppointmentDate,
            @AppointmentTime,
            @Status,
            GETDATE(),
            @IsActive
        );
    END
    ELSE
    BEGIN
        -- Update existing record
        UPDATE Appointments
        SET
            PatientID = @PatientID,  -- PatientID or NULL if patient not found
            DoctorID = @DoctorID,    -- DoctorID or NULL if doctor not found
            ScheduleID = @ScheduleID,
            AppointmentDate = @AppointmentDate,
            AppointmentTime = @AppointmentTime,
            Status = @Status,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE ID = @ID;
    END
END

===================================================================================================================

--Delete Appointment table

CREATE PROCEDURE USP_Appointments_Delete
    @ID INT = NULL,
    @DoctorFullName NVARCHAR(100) = NULL,
    @PatientFullName NVARCHAR(100) = NULL,
    @ScheduleID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete by updating IsActive to 0
    UPDATE Appointments
    SET IsActive = 0
    WHERE (ID = @ID OR @ID IS NULL)
        AND (DoctorID IN (SELECT ID FROM Doctors WHERE (FirstName + ' ' + LastName) LIKE '%' + @DoctorFullName + '%') OR @DoctorFullName IS NULL)
        AND (PatientID IN (SELECT ID FROM Patients WHERE (FirstName + ' ' + LastName) LIKE '%' + @PatientFullName + '%') OR @PatientFullName IS NULL)
        AND (ScheduleID = @ScheduleID OR @ScheduleID IS NULL);
END


=============================================================================================================================================================================

--Authentication

CREATE TABLE Tokens (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Access_Token NVARCHAR(MAX) NOT NULL,
    Refresh_Token NVARCHAR(MAX) NOT NULL
);

--CREATE TABLE UserRefreshTokens (
--    ID INT PRIMARY KEY IDENTITY(1,1),
--    UserName NVARCHAR(50) NOT NULL,
--    RefreshToken NVARCHAR(MAX) NOT NULL,
--    IsActive BIT NOT NULL DEFAULT 1
--);


====================================================================

--insert for user table

CREATE PROCEDURE USP_Users_InsertUser 
    -- Add the parameters for the stored procedure here
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50),
    @RoleID INT,
    @IsActive BIT = 1
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT OFF;

    -- Check if the RoleID exists
    IF EXISTS (SELECT 1 FROM Roles WHERE ID = @RoleID)
    BEGIN
        -- Insert statements for procedure here
        INSERT INTO Users (UserName, Password, RoleID, CreatedOn, IsActive)
        VALUES (@UserName, @Password, @RoleID, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        -- Invalid RoleID, handle accordingly (you can raise an error or take appropriate action)
        -- For simplicity, we'll just print a message
        PRINT 'Invalid RoleID';
    END
END
GO

select * from Users
Drop procedure USP_Users_InserUser
Exec USP_Users_InserUser 'Sona','1234'

drop procedure USP_Users_Insert
========================================================================================================
--get list of users

CREATE PROCEDURE USP_Users_GetList
    @UserName VARCHAR(50),
    @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        ID,
        UserName,
        Password,
        RoleID,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        Users
    WHERE
        UserName = @UserName
        AND Password = @Password;
END



drop procedure USP_Users_GetList
-- Assuming you're using the values 'exampleUser' for @UserName and 'examplePassword' for @Password
EXEC USP_Users_GetList @UserName = 'riya', @Password = '1234';

=========================================================================================================

CREATE PROCEDURE USP_UserRefreshTokens_Select 
	-- Add the parameters for the stored procedure here
	@Username NVARCHAR(50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	Declare @User NVARCHAR(50)
	SET NOCOUNT OFF;
    -- Insert statements for procedure here
	
	BEGIN
		SELECT Id,Username,RefreshToken,IsActive FROM UserRefreshTokens WHERE UserName=@Username;
	END
END
GO
drop procedure USP_UserRefreshTokens_Select
EXEC USP_UserRefreshTokens_Select 'riya'

==============================================================================================================

--UserRefershToken InsertUpdate

create PROCEDURE [dbo].[USP_UserRefreshTokens_InsertUpdate] 
    @username NVARCHAR(MAX),
    @Token NVARCHAR(MAX),
    @INSERT BIT
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT OFF;
 
    IF @INSERT = 0
    BEGIN
        UPDATE UserRefreshTokens SET RefreshToken = @Token WHERE UserName = @username;
    END
    ELSE
    BEGIN
        INSERT INTO UserRefreshTokens (UserName, RefreshToken) VALUES (@username, @Token);
    END
END

drop procedure [USP_UserRefreshTokens_InsertUpdate]
==============================================================================================

ALTER PROCEDURE [dbo].[USP_Users_GetList]
    @UserName VARCHAR(50),
    @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT OFF;
    SELECT
        U.ID,
        U.UserName,
        U.Password,
        U.RoleId,
        R.RoleName, 
        U.CreatedBy,
        U.CreatedOn,
        U.UpdatedBy,
        U.UpdatedOn,
        U.IsActive
    FROM
        Users U
    INNER JOIN
        Roles R ON U.RoleId = R.Id
    WHERE
        U.UserName = @UserName
        AND U.Password = @Password;
END


=================================================================================================================

ALTER PROCEDURE [dbo].[USP_Users_InsertUser] 
    -- Add the parameters for the stored procedure here
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50),
    @RoleName NVARCHAR(50),
    @IsActive BIT = 1
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT OFF;

    DECLARE @RoleID INT;

    -- Get RoleID based on RoleName
    SELECT @RoleID = ID
    FROM Roles
    WHERE RoleName = @RoleName;

    -- Check if the RoleID exists
    IF @RoleID IS NOT NULL
    BEGIN
        -- Insert statements for procedure here
        INSERT INTO Users (UserName, Password, RoleID, CreatedOn, IsActive)
        VALUES (@UserName, @Password, @RoleID, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        -- Invalid RoleName, handle accordingly (you can raise an error or take appropriate action)
        -- For simplicity, we'll just print a message
        PRINT 'Invalid RoleName';
    END
END

exec [USP_Users_InsertUser] @UserName='Zulphi', @Password='ihpluZ',@RoleName='Patient'

select *from users


=============================================================================================

--create PROCEDURE [dbo].[USP_UserRefreshTokens_InsertUpdate] 
--    @username NVARCHAR(MAX),
--    @Token NVARCHAR(MAX),
--    @DeviceIdentifier NVARCHAR(255), -- Add the device/browser identifier
--    @INSERT BIT
--AS
--BEGIN
--    -- SET NOCOUNT ON added to prevent extra result sets from
--    -- interfering with SELECT statements.
--    SET NOCOUNT OFF;
 
--    IF @INSERT = 0
--    BEGIN
--        -- Update existing refresh token for the specified username and device
--        UPDATE UserRefreshTokens 
--        SET RefreshToken = @Token 
--        WHERE UserName = @username AND DeviceIdentifier = @DeviceIdentifier;
--    END
--    ELSE
--    BEGIN
--        -- Insert a new record with the specified username, refresh token, and device information
--        INSERT INTO UserRefreshTokens (UserName, RefreshToken, DeviceIdentifier) 
--        VALUES (@username, @Token, @DeviceIdentifier);
--    END
--END


Alter PROCEDURE [dbo].[USP_UserRefreshTokens_InsertUpdate] 
    @username NVARCHAR(MAX),
    @Token NVARCHAR(MAX),
    @DeviceIdentifier NVARCHAR(255), -- Add the device/browser identifier
    @INSERT BIT
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT OFF;
 
    IF @INSERT = 0
    BEGIN
        -- Update existing refresh token for the specified username and device
        UPDATE UserRefreshTokens 
        SET RefreshToken = @Token,
            UpdatedOn = GETDATE()
        WHERE UserName = @username AND DeviceIdentifier = @DeviceIdentifier;
    END
    ELSE
    BEGIN
        -- Insert a new record with the specified username, refresh token, and device information
        INSERT INTO UserRefreshTokens (UserName, RefreshToken, DeviceIdentifier, CreatedOn) 
        VALUES (@username, @Token, @DeviceIdentifier, GETDATE());
    END
END




USE [HOSPITAL_MANAGEMENT_SYSTEM_WEBAPI]
GO
/****** Object:  StoredProcedure [dbo].[USP_Admins_GetAdmins]    Script Date: 20-Apr-24 8:30:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_Admins_GetAdmins]
    @ID INT = NULL,
    @FirstName NVARCHAR(50) = NULL,
    @LastName NVARCHAR(50) = NULL,
    @Email NVARCHAR(100) = NULL,
    @ContactNumber NVARCHAR(20) = NULL,
    @SortColumn NVARCHAR(50) = 'ID',
    @SortOrder NVARCHAR(4) = 'ASC',
    @PageSize INT = 50,
    @PageNumber INT = 1
AS
BEGIN
    SET NOCOUNT ON;
 
    -- Common Table Expression (CTE) for filtering admin data
    WITH FilteredAdmins AS (
        SELECT
            a.ID,
            a.FirstName,
            a.LastName,
            a.Email,
            a.ContactNumber,
            a.ImagePath,
            a.CreatedBy,
            a.CreatedOn,
            a.UpdatedBy,
            a.UpdatedOn,
            a.IsActive
        FROM
            Admins a
        WHERE
            (@ID IS NULL OR a.ID = @ID)
            AND (@FirstName IS NULL OR a.FirstName LIKE '%' + @FirstName + '%')
            AND (@LastName IS NULL OR a.LastName LIKE '%' + @LastName + '%')
            AND (@Email IS NULL OR a.Email = @Email)
            AND (@ContactNumber IS NULL OR a.ContactNumber = @ContactNumber)
    )
 
    -- Pagination using ROW_NUMBER()
    SELECT
        ID,
        FirstName,
        LastName,
        Email,
        ContactNumber,
        ImagePath,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        IsActive
    FROM
        (
            SELECT
                *,
                ROW_NUMBER() OVER (ORDER BY
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'ASC' THEN ID END ASC,
                    CASE WHEN @SortColumn = 'ID' AND @SortOrder = 'DESC' THEN ID END DESC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'ASC' THEN FirstName END ASC,
                    CASE WHEN @SortColumn = 'FirstName' AND @SortOrder = 'DESC' THEN FirstName END DESC
                ) AS RowNum
            FROM
                FilteredAdmins
        ) AS NumberedRows
    WHERE
        RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize
    ORDER BY
        RowNum;
END


exec [dbo].[USP_Admins_GetAdmins]


USE [HOSPITAL_MANAGEMENT_SYSTEM_WEBAPI]
GO
/****** Object:  StoredProcedure [dbo].[USP_Admins_Insert_Update]    Script Date: 20-Apr-24 8:35:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_Admins_Insert_Update]
-- Add the parameters for the stored procedure here
    @Id INT,
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Email VARCHAR(100),
    @ContactNumber VARCHAR(20),
    @ImagePath VARCHAR(255),
    @CreatedBy NVARCHAR(50) = NULL,
    @UpdatedBy NVARCHAR(50) = NULL,
    @IsActive BIT = 1,
    @UserName VARCHAR(50),
    @Password VARCHAR(255)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;
 
    DECLARE @UserID INT;
 
    -- Insert statements for procedure here
    IF (@Id IS NULL OR @Id = 0)
    BEGIN
        -- Insert into Users table to create admin credentials
        INSERT INTO Users (UserName, Password, RoleID, CreatedOn, CreatedBy, IsActive)
        VALUES (@UserName, @Password, 1, GETDATE(), @CreatedBy, @IsActive);
        
        -- Get the UserID of the inserted user
        SET @UserID = SCOPE_IDENTITY();
        
        -- Insert into Admins table with the generated UserID
        INSERT INTO Admins (UserID, FirstName, LastName, Email, ContactNumber, ImagePath, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, IsActive)
        VALUES (@UserID, @FirstName, @LastName, @Email, @ContactNumber, @ImagePath, @CreatedBy, GETDATE(), @UpdatedBy, GETDATE(), @IsActive);
    END
    ELSE
    BEGIN
        -- Update Admins table
        UPDATE Admins
        SET FirstName = @FirstName,
            LastName = @LastName,
            Email = @Email,
            ContactNumber = @ContactNumber,
            ImagePath = @ImagePath,
            UpdatedBy = @UpdatedBy,
            UpdatedOn = GETDATE(),
            IsActive = @IsActive
        WHERE Id = @Id;
        
        -- Update Users table if username and password are provided
        IF (@UserName IS NOT NULL AND @Password IS NOT NULL)
        BEGIN
            UPDATE Users
            SET UserName = @UserName,
                Password = @Password,
                RoleID = 1, -- Fixed RoleID for admins
                UpdatedBy = @UpdatedBy,
                UpdatedOn = GETDATE(),
                IsActive = @IsActive
            WHERE ID = (SELECT UserID FROM Admins WHERE ID = @Id);
        END
    END
END



DECLARE @Id INT = NULL; -- Set to NULL for insert, set to the ID of the admin for update
DECLARE @FirstName VARCHAR(50) = 'John';
DECLARE @LastName VARCHAR(50) = 'Doe';
DECLARE @Email VARCHAR(100) = 'johndoe@example.com';
DECLARE @ContactNumber VARCHAR(20) = '1234567890';
DECLARE @ImagePath VARCHAR(255) = '/path/to/image.jpg';
DECLARE @CreatedBy NVARCHAR(50) = 'Admin1'; -- Replace with the actual creator's username
DECLARE @UpdatedBy NVARCHAR(50) = 'Admin1'; -- Replace with the actual updater's username
DECLARE @IsActive BIT = 1;
DECLARE @UserName VARCHAR(50) = 'johndoe_admin';
DECLARE @Password VARCHAR(255) = 'password123';

EXEC [dbo].[USP_Admins_Insert_Update]
    @Id = @Id,
    @FirstName = @FirstName,
    @LastName = @LastName,
    @Email = @Email,
    @ContactNumber = @ContactNumber,
    @ImagePath = @ImagePath,
    @CreatedBy = @CreatedBy,
    @UpdatedBy = @UpdatedBy,
    @IsActive = @IsActive,
    @UserName = @UserName,
    @Password = @Password;


GO
/****** Object:  StoredProcedure [dbo].[USP_Admins_DeleteAdmin]    Script Date: 20-Apr-24 9:00:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_Admins_DeleteAdmin]
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete admin by updating IsActive to 0
    UPDATE Admins
    SET IsActive = 0
    WHERE ID = @ID;

    -- Soft delete corresponding user from Users table
    UPDATE Users
    SET IsActive = 0
    WHERE ID = (SELECT UserID FROM Admins WHERE ID = @ID);

    -- Additional logic or logging can be added here
    
    -- If you want to return some information, you can include a SELECT statement

END




DECLARE @ID INT = 2; -- Replace 123 with the ID of the admin you want to delete

EXEC [dbo].[USP_Admins_DeleteAdmin] @ID = @ID;




DECLARE @Id INT = NULL; -- Set to NULL for insert, set to the ID of the doctor for update
DECLARE @FirstName VARCHAR(50) = 'John';
DECLARE @LastName VARCHAR(50) = 'Doe';
DECLARE @SpecializationID INT = 1; -- Assuming SpecializationID 1 corresponds to a specific specialization
DECLARE @ContactNumber VARCHAR(20) = '1234567890';
DECLARE @Email VARCHAR(100) = 'johndoe@example.com';
DECLARE @Address VARCHAR(255) = '123 Main Street, City';
DECLARE @ImagePath VARCHAR(255) = '/path/to/image.jpg';
DECLARE @DateOfBirth DATE = '1980-01-01';
DECLARE @UserName VARCHAR(50) = 'johndoe_doctor';
DECLARE @Password VARCHAR(255) = 'password123';
DECLARE @CreatedBy VARCHAR(50) = 'Admin1'; -- Replace with the actual creator's username
DECLARE @UpdatedBy VARCHAR(50) = 'Admin1'; -- Replace with the actual updater's username
DECLARE @IsActive BIT = 1;

EXEC [dbo].[USP_Doctors_Insert_Update]
    @Id = @Id,
    @FirstName = @FirstName,
    @LastName = @LastName,
    @SpecializationID = @SpecializationID,
    @ContactNumber = @ContactNumber,
    @Email = @Email,
    @Address = @Address,
    @ImagePath = @ImagePath,
    @DateOfBirth = @DateOfBirth,
    @UserName = @UserName,
    @Password = @Password,
    @CreatedBy = @CreatedBy,
    @UpdatedBy = @UpdatedBy,
    @IsActive = @IsActive;



	ALTER TABLE [dbo].[Specializations]
ADD [ImagePath] NVARCHAR(255);





drop PROCEDURE [dbo].[USP_Users_GetUsers]
    -- Add the parameters for the stored procedure here
    @UserId INT = NULL,
    @RoleId INT = NULL,
    @FirstName NVARCHAR(MAX) = NULL
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;
 
    -- Insert statements for procedure here
    IF @UserId IS NULL AND @RoleId IS NULL AND @FirstName IS NULL
    BEGIN
        -- Retrieve all active users with their first name, last name, role, creation date, and is active status from Librarian or Patron table
        SELECT U.Id AS UserId, 
               CASE WHEN U.RoleId = 1 THEN L.FirstName ELSE P.FirstName END AS FirstName,
               CASE WHEN U.RoleId = 1 THEN L.LastName ELSE P.LastName END AS LastName,
               U.RoleId, 
               U.Email,
               U.CreatedOn,
               U.Password,
               U.UpdatedOn,
               U.IsActive -- Include the 'IsActive' column here
        FROM Users U
        LEFT JOIN Librarians L ON U.Id = L.UserId AND U.RoleId = 1
        LEFT JOIN Patrons P ON U.Id = P.UserId AND U.RoleId = 2
        WHERE U.IsActive = 1;
    END
    ELSE
    BEGIN
        -- Retrieve users based on the provided criteria
        SELECT U.Id AS UserId, 
               CASE WHEN U.RoleId = 1 THEN L.FirstName ELSE P.FirstName END AS FirstName,
               CASE WHEN U.RoleId = 1 THEN L.LastName ELSE P.LastName END AS LastName,
               U.RoleId, 
               U.Email,
               U.CreatedOn,
               U.UpdatedOn,
               U.Password,
               U.IsActive -- Include the 'IsActive' column here
        FROM Users U
        LEFT JOIN Librarians L ON U.Id = L.UserId AND U.RoleId = 1
        LEFT JOIN Patrons P ON U.Id = P.UserId AND U.RoleId = 2
        WHERE (@UserId IS NULL OR U.Id = @UserId)
          AND (@RoleId IS NULL OR U.RoleId = @RoleId)
          AND (@FirstName IS NULL OR (U.RoleId = 1 AND L.FirstName = @FirstName) OR (U.RoleId = 2 AND P.FirstName = @FirstName))
          AND U.IsActive = 1;
    END
END



================================================================================================================

sp_help


USE [HOSPITAL_MANAGEMENT_SYSTEM_WEBAPI]
GO
/****** Object:  StoredProcedure [dbo].[USP_GetUserDetailsByID]    Script Date: 4/23/2024 3:09:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_Users_GetUserDetailsById]
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @RoleName NVARCHAR(50)
    DECLARE @TableName NVARCHAR(50)
    DECLARE @Columns NVARCHAR(MAX)
    DECLARE @SQL NVARCHAR(MAX)

    -- Get the role name of the user
    SELECT @RoleName = R.RoleName
    FROM Users U
    INNER JOIN Roles R ON U.RoleID = R.ID
    WHERE U.ID = @UserID;

    -- Determine the table name and columns based on the role
    IF @RoleName = 'Doctor'
    BEGIN
        SET @TableName = 'Doctors'
        SET @Columns = 'FirstName, LastName, SpecializationID, ContactNumber, Email, DateOfBirth, Address, ImagePath, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, IsActive'
    END
    ELSE IF @RoleName = 'Patient'
    BEGIN
        SET @TableName = 'Patients'
        SET @Columns = 'FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Address, ImagePath, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, IsActive'
    END
    ELSE IF @RoleName = 'Admin'
    BEGIN
        SET @TableName = 'Admins'
        SET @Columns = 'FirstName, LastName, Email, ContactNumber, ImagePath, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, IsActive'
    END

    -- Generate dynamic SQL to fetch user details from the corresponding table
    SET @SQL = 'SELECT ' + @Columns + ' FROM ' + @TableName + ' WHERE UserID = @UserID'

    -- Execute the dynamic SQL
    EXEC sp_executesql @SQL, N'@UserID INT', @UserID = @UserID;
END


EXEC [USP_Users_GetUserDetailsById] @UserID = 2;




DECLARE @DoctorID INT = 7;  -- Specify the doctor's ID
DECLARE @AppointmentDate DATE = '2024-05-16';  -- Specify the appointment date

-- Execute the stored procedure
EXEC GetAvailableAppointmentSlots @DoctorID, @AppointmentDate;



CREATE PROCEDURE GetAvailableAppointmentSlots
    @DoctorID INT,
    @AppointmentDate DATE
AS
BEGIN
    -- Get existing appointments for the specified doctor and date
    SELECT a.ScheduleID,
           a.AppointmentTime
    FROM Appointments a
    WHERE a.DoctorID = @DoctorID
      AND a.AppointmentDate = @AppointmentDate
      AND a.IsActive = 1;

    -- Get the doctor's active schedule for the specified day
    WITH DoctorAvailability AS (
        SELECT ds.ID AS ScheduleID,
               ds.StartTime,
               ds.EndTime
        FROM DoctorSchedule ds
        WHERE ds.DoctorID = @DoctorID
          AND ds.DayOfWeek = DATENAME(WEEKDAY, @AppointmentDate)
          AND ds.IsActive = 1
    )

    -- Filter available appointment slots based on doctor's schedule and existing appointments
    SELECT DISTINCT da.ScheduleID,
           da.StartTime
    FROM DoctorAvailability da
    LEFT JOIN (
        SELECT a.ScheduleID,
               a.AppointmentTime
        FROM Appointments a
        WHERE a.DoctorID = @DoctorID
          AND a.AppointmentDate = @AppointmentDate
          AND a.IsActive = 1
    ) ap ON da.ScheduleID = ap.ScheduleID AND da.StartTime = ap.AppointmentTime
    WHERE (ap.ScheduleID IS NULL OR ap.AppointmentTime IS NULL)
      AND (DATEDIFF(MINUTE, da.StartTime, da.EndTime) % 15 = 0);  -- Assuming 15-minute intervals
END






--Book Appointment 


DECLARE @DoctorID INT = 7;  -- Specify the doctor's ID
DECLARE @AppointmentDate DATE = '2024-05-16';  -- Specify the appointment date

-- Get existing appointments for the specified doctor and date
SELECT a.ScheduleID,
       a.AppointmentTime
FROM Appointments a
WHERE a.DoctorID = @DoctorID
  AND a.AppointmentDate = @AppointmentDate
  AND a.IsActive = 1;

-- Get the doctor's active schedule for the specified day
WITH DoctorAvailability AS (
    SELECT ds.ID AS ScheduleID,
           ds.StartTime,
           ds.EndTime
    FROM DoctorSchedule ds
    WHERE ds.DoctorID = @DoctorID
      AND ds.DayOfWeek = DATENAME(WEEKDAY, @AppointmentDate)
      AND ds.IsActive = 1
)

-- Filter available appointment slots based on doctor's schedule and existing appointments
SELECT DISTINCT da.ScheduleID,
       da.StartTime
FROM DoctorAvailability da
LEFT JOIN (
    SELECT a.ScheduleID,
           a.AppointmentTime
    FROM Appointments a
    WHERE a.DoctorID = @DoctorID
      AND a.AppointmentDate = @AppointmentDate
      AND a.IsActive = 1
) ap ON da.ScheduleID = ap.ScheduleID AND da.StartTime = ap.AppointmentTime
WHERE ap.ScheduleID IS NULL OR ap.AppointmentTime IS NULL;
























	