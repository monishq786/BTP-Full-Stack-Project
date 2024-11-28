namespace my.namespace;

using { my.namespace as ns } from '../db/employee';

service EmployeeService {
    entity Employees as projection on ns.Employee;
    
}
