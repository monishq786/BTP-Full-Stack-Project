
using {managed} from '@sap/cds/common';
namespace db;
entity ZSD_T_VEHICLES : managed {
    Key ChasisNo:Int64;
    key EngineNo : Int64;
        Country : String;
        Manufacturer : String;
        Model : String;
        PlateType :String;
        Kind : String;
        Type:String;
        BodyColor: String;
        GearType:String;
        FuelType :String;
        SteeringSide :String;
        WeightKind:String;
}
