var iframe = document.getElementById('model-frame');

var version = '1.7.1';

var uid = 'c3b2ab1e39824a1390e742f5e7b0c571';

var client = new Sketchfab( version, iframe);

var newMask = [];
var nodes = [2,21,35,49,63,77,96,115,129,143,157,171,185,199,213,232,251,265,284,298,317,331,350,369,397,411,430,444,458,477,496,510,529,548,581,600,628,642,656,675,689,708,727,746,760,774,793,807,840,859,878,897,916,935,954,973,992,1011];
var clicked;

async function paste() {
    const text = await navigator.clipboard.readText();
    document.getElementById("colorInput").value = text;
}

var hideSet = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.hide(nodeSet[i]);
    }
}

var showSet = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.show(nodeSet[i]);
    }
}

var showMaskID = function(document){
    document.getElementById("submit").style.display = "none";
    // fixed text here former error
    input = $("#colorInput").val();
    if(input == 0){
        alert("Input a maskID to show your mask");
    }
    maskIDStr = input.split(',');
    maskID = [];
    for(var i = 0; i< maskIDStr.length; i++){
        maskID.push(parseInt(maskIDStr[i]));
    }

    $(document).ready(function(){
        $("#model-frame").show();
        $("#sumbit").hide();
    })

    client.init( uid, {
        camera: false,
        internal: false,
        ui_infos: false,
        ui_controls: false,
        ui_stop: false,
        watermark: false,
        success: function(api) {
            api.start(function() {
                api.addEventListener('viewerready', function() { 
                    hideSet(api, nodes);
                    showSet(api, maskID);
                });
            })
        },
        error: function onError() {
        console.log('Viewer error');
        }
    });

}


$(document).ready(function(){
    $("#model-frame").hide();
});
