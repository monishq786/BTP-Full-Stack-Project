using {db} from '../db/employee';

service EmployeeService {
    entity Employees as projection on db.Employee;
    entity MUser     as projection on db.User;
    entity MDepartment     as projection on db.UserDepartment;
    
}
