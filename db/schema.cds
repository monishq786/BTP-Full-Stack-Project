using {managed} from '@sap/cds/common';
namespace db;

type Department :String  enum{
    Finance;
    HR;
    QC;
    IT;
    Production;
};

entity MUser : managed {
    key UserID         : UUID;
        Username       : String;
        Usercode       : String;
        UserDept  : Association to UserDepartment;
}

entity UserDepartment : managed {
    key UserDepartmentID : UUID;
        DepartmentName : String;
        UserID : Association to MUser;

}