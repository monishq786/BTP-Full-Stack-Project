
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

entity ZSD_T_VI_SITELANEANPR : managed {
    key ZSD_T_VI_SITELANEANPR_Id    :UUID;
    WERKS                       :String(4) NOT NULL; //Site ID
    ZLANE                       :String(4) NOT NULL; //Lane ID
    ZANPPRCN                    :String(18)NOT NULL; //ANPR Camera Number
}

entity ZVT_ANPR_REC : managed {

    key ZUID            :UUID;          //Unique Identifier to mark if request is already used
    WERKS               :String(4) ;    //Site   
    ZLANE               :String(4);     //Lane
    ZCAPDATE            :Date;          //Capture Date
    ZVPLATEN            :String(10);    //Vehicle Plate Number
    ZVPLATES            :String(10);    //Vehicle Plate Source
    ZVPLATESD           :String(40);    //Vehicle Plate Source Description
    ZVPLATEC            :String(10);    //Vehicle Plate Color
    ZVPLATECD           :String(40);    //Vehicle Plate Color Description
    ZVPLATEK            :String(10);    //Vehicle Plate Kind
    ZVPLATEKD           :String(10);    //Vehicle Plate Kind
    ZVPLATET            :String(10);    //Vehicle Plate Type
    ZVPLATETD           :String(40);    //Vehicle Plate Type Description
    ZVPLATEP            :String(13);    //Vehicle Plate Picture
    ZANPRCN             :String(18);    //Camera Number
    ZAVERSION           :String(10);    //App Version Number
    ZAPPNAME            :String(10);    //App Name
    ZRECTIME            :Time;          //Time of Receive
    ZUSEDFLAG           :Boolean        //Used Flag

}
entity ZSD_T_VEHICLE : managed {
    key zVehicleId              :UUID;
    zPlateNo                    : String(10);     //AD mobility API API Field PlateNo 
    zPlateSourceModel           : String(10);     // AD mobility API Field PlateourceCode
    zPlateSource                : String(10);      
    zPlateSourceAE              : String(10);      
    zPlateColorCode             : Int16;          //AD mobility API Field PlateColorCode 
    zPlateColor                 : String(10);     //AD mobility API Field PlateColor            
    zPlateColorAE               : String(10);     //AD mobility API Field PlateColorArabicDesc  
    zPlateKindCode              : Int16;          //AD mobility API Field PlateKindArabicDesc  
    zPlateKindEA                : String(10);      
    zPlateTypeCode              : Int16;           
    zPlateType                  : String(10);  
    zPlateTypeAE                :String(10);     //NEED TO discuss FRO ARBIC    
    zKindCode                   : Int16;           
    zKind                       : String(10);      
    zKindAE                     : String(15);      
    zChassisNo                  : String(30);      
    zEngineNo                   : String(30);      
    zPrimaryVin                 : String(30);      
    zSecondaryVin               : String(30);      
    zCountryCode                : Int16;           
    zCountry                    : String(10);      
    zManufacturerCode           : Int16;           
    zManufacturer               : String(10);      
    zManufacturerAE             : String(10);      
    zModelCode                  : Int16;  
    zHorsePower                 : String(10);      
    zAxles                      : String(10);      
    zCylinders	                : String(10);
    zWheels	                    : String(10);  
    zDoors	                    : String(10); 
    zPassengers	                : String(10);
    zEmptyWeight	            : String(10);
    zFullWeight	                : String(10); 
    zMileage	                : String(10);
    zCustomer	                : String(20);
    zCreationDate               : Date;
    zCreationTime	            : Time;
    zCreatedBy	                : String(20);         //Auto Create Discuss with rahul sir
    zInsuranceExp	            : Date;
    zInsuranceKind	            : String(10);
    zInsuranceKindAE	        : String(10);
    zInsurancePolicyNo	        : String(20);
    zMortgageDes	            : String(20);
    zMortgageRef	            : String(20);
    zOwnerTcfNo	                : String(20);
    zOwnerTcfAEName	            : String(60);
    zOwnerTcfEnName	            : String(60);
    zModel	                    : String(10);
    zModelAE                    : String(10);
    zRegYear                    : Int16;               //Auto Create Discuss with rahul sir
    zTypeCode                   : Int16;
    zType                       : String(20);
    zTypeAE                     : String(20);
    zBodyColorCode              : Int16;    
    zBodyColor                  : String(30);
    zBodyColorAE                : Int16;
    zGearCode                   : Int16;
    zGearType                   : String(10);
    zGearTypeAE                 : String(10);
    zFuelCode                   : String(5);           // Fuel code
    zFuelType                   : String(10);          // Fuel type
    zFuelTypeAE                 : String(10);          // Fuel type Arabic
    zSteeringCode               : String(5);           // Steering code
    zSteeringSide               : String(10);          // Steering side
    zSteeringSideAE             : String(10);          // Steering side Arabic
    zWeightCode                 : String(5);           // Weight code
    zWeightDesc                 : String(10);          // Weight Disc
    zWeightDescAE               : String(10);          // Weight Disc Arabic
    zRegDate                    : Date;                // Registration date
    zRegExpDate                 : Date;                // Registration Expiry
    zMfgYear                    : String(10);          // Manufacturing year
    zCubicCapacity              : String(10);          // Cubic capacity
    zInsuranceName              : String(20);          // Insurance Nam
    zCustomCertificateNum       : String(20);          // Custom certificate Number
    zCertificateDate            : Date;                // Custom certificate Date
    zCertificateCenterCode      : String(5);           // Custom certificate centre code
    zCertificateCenter          : String(20);          // Custom certificate centre
    zRegistrationRemark         : String(60);          // Registration remarks
    zNationalityCode            : String(5);           // Nationality code
    zNationality                : String(20);          // Nationality
    zNationalityArabic          : String(20);          // Nationality Arabic
}

entity MPurpose : managed {
    key PurposeId        :UUID;
    PurposeName          :String(50);
    PurposeCode          :String(20);
}

entity AnprCaptures{
    key anprCapturesId : UUID;
    plant              : String(4);
    lane               : String(4);
    captureDate        : DateTime;
    plateNumber        : String(10);
    plateSource        : String(10);
    plateSourceDesc    : String(40);
    plateColor         : String(10);
    plateColorDesc     : String(40);
    plateKind          : String(10);
    plateKindDesc      : String(40);
    plateType          : String(10);
    plateTypeDesc      : String(40);
    platePicture       : String; // Query : Are we going to save the picture into the database ?
    cameraNumber       : String(18);
    appVersionNumber   : String(10);
    appName            : String(10);
    recivedTime        : DateTime;
    usedFlag           : String(1);
}




