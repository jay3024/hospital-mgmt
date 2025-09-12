const BASE_URL = 'http://localhost:5218'
export const AddHospital = `${BASE_URL}/api/Hospital/addHopsital`
export const UpdateHospital = `${BASE_URL}/api/Hospital/updateHospital`
export const GetAllHospital = `${BASE_URL}/api/Hospital/all`
export const DeleteHospital = (id: string) => `${BASE_URL}/api/Hospital/${id}`


export const GetAllDoctor = `${BASE_URL}/api/Doctor/GetAllDoctors`

export const GetAllPatients = `${BASE_URL}/api/Patients/GetPatients`
