using {db} from '../db/schema';

service GenericService {
    entity MUser       as projection on db.MUser;
    entity MDepartment as projection on db.UserDepartment;


}
