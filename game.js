if (bPHONEGAP) document.addEventListener("deviceready", onDeviceReady, false);
else {
    $(document).ready(function() {
        onDeviceReady();
    })
}

function createBeacon() {

    var uuid = '2D85ED40-54D1-59D1-5961-B388-ABDFD8FD64A5'; // mandatory
    var identifier = 'GemTot USB'; // mandatory
    var minor = 4; // optional, defaults to wildcard if left empty
    var major = 1; // optional, defaults to wildcard if left empty

    // throws an error if the parameters are not valid
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

    return beaconRegion;   
} 



function onDeviceReady() {
    
    alert("1");
    var beaconRegion = createBeacon();
    
    alert("2");
    
    var delegate = new cordova.plugins.locationManager.Delegate().implement({

        // Event when advertising starts (there may be a short delay after the request)
        // The property 'region' provides details of the broadcasting Beacon
        peripheralManagerDidStartAdvertising: function(pluginResult) {
            $(".wrap").html('peripheralManagerDidStartAdvertising: '+ JSON.stringify(pluginResult.region));
            //console.log('peripheralManagerDidStartAdvertising: '+ JSON.stringify(pluginResult.region));
        },
        // Event when bluetooth transmission state changes 
        // If 'state' is not set to BluetoothManagerStatePoweredOn when advertising cannot start
        peripheralManagerDidUpdateState: function(pluginResult) {
            $(".wrap").html('peripheralManagerDidStartAdvertising: '+ JSON.stringify(pluginResult.region));
            //console.log('peripheralManagerDidUpdateState: '+ pluginResult.state);
        }
    });
    
    alert("3");
    
    cordova.plugins.locationManager.setDelegate(delegate);
    
    cordova.plugins.locationManager.isAdvertisingAvailable()
    .then(function(isSupported){

        if (isSupported) {
            cordova.plugins.locationManager.startAdvertising(beaconRegion)
                .fail(conole.error)
                .done();
        } else {
            console.log("Advertising not supported");
        }
    })
    .fail(console.error)
    .done();
    
    $(".wrap").html('done device 2');
    
}

