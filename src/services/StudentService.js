import { httpRequest } from './../util/HttpHandler';

const STUDENT_API_BASE_URL = "/students";

class StudentService {
    
    getStudents() {
        return httpRequest(STUDENT_API_BASE_URL, 'GET');
    }

    createStudent(student) {
        return httpRequest(STUDENT_API_BASE_URL, 'POST', student); 
    }

    getStudentById(studentId) {
        return httpRequest(STUDENT_API_BASE_URL + '/' + studentId, 'GET');
    }

    updateStudent(student, studentId) {
        return httpRequest(STUDENT_API_BASE_URL + '/' + studentId, 'PUT', student);
    }
        
    deleteStudent(studentId) {
        return httpRequest(STUDENT_API_BASE_URL + '/' + studentId, 'DELETE');
    }
}

export default new StudentService()