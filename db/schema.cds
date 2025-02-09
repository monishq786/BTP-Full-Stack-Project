using {managed} from '@sap/cds/common';

namespace db;

entity VEHICLES : managed {
    key ChasisNo : String;
    EngineNo       : String;
    Country        : String;
    Manufacturer   : String;
    Model          : String;
    PlateType      : String;
    Kind           : String;
    Type           : String;
    BodyColor      : String;
    GearType       : String;
    FuelType       : String;
    SteeringSide   : String;
    WeightKind     : String;
    InitRegYear    : String;
    MfgYear        : String;
    HorsePower     : String;
    NoOfAxies      : String;
    NoOfCylinders  : String;
    NoOfWheels     : String;
    NoOfDoors      : String;
    NoOfPassengers : String;
    EmptyWeight    : String;
    FullWeight     : String;
    Mileage        : String;
    CubicCapacity  : String;

}
