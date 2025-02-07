
using {managed} from '@sap/cds/common';
namespace db;
entity Employee {
    key ID : Integer;
    Name   : String;
    Age    : Integer;
    Salary : Decimal(10,2);
}

entity User {
    key UserID         : UUID;
        UserName       : String;
        UserCode       : Integer;
        UserDepartment : Association to UserDepartment;
}

entity UserDepartment : managed {
    key UserDepartmentID : UUID;
        DepartmentName   : String;
        DepartmentCode   : String;
     
}



