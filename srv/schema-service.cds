using {db} from '../db/schema';

service VehicleService {
    entity Vehicle as projection on db.ZSD_T_VEHICLES;
}