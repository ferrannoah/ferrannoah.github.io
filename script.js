var iframe = document.getElementById('model-frame');

var version = '1.7.1';

var uid = '26d49027a9b142efa9d2154600347ef1';

var client = new Sketchfab( version, iframe);

var cost = 50;
var costHTML = document.getElementById("cost");
var vision = null;
var nodes = [3,194,143,403,127,135,151,159,167,175,227,238,293,304,381,392,55,63,71,79,87,95,414,14,25,103,183,205,216,249,260,271,282,315,326,337,348,359,370];
var aggressiveStart = [36,55,63,111,47,151,135];
var openStart = [36,63,71,111,47,175,159];
var red = 0;

class bar{
    constructor(op, ag, name, price, needSet, cantSet){
        this.op = op;
        this.ag = ag;
        this.name = name;
        this.classID = "#" + name;
        this.price = price;
        this.needSet = needSet;
        this.cantSet = cantSet;
        this.clicked = false;
        this.red = false;
        this.able = true;
        this.clickable = function clickable(click){
            this.able = click;
        }
        this.clickCase = function clickCase(click){
            this.clicked = click;
        }
        this.redOut = function redOut(click){
            this.red = click;
        }
        this.color = function(clicked, classID, color){
            if(color == null){
                if(clicked){
                    $(classID).css("color", "blue");
                }else{
                    $(classID).css("color", "white");
                }
            }else{
                $(classID).css("color", color);
            }
        }
        this.getVision = function(vision){
            if(vision == "op"){
                return this.op;
            }else if(vision == "ag"){
                return this.ag;
            }
        }
    }
}

var v1 = new bar([175],[151],"v1",10);
var v2 = new bar([227],[3],"v2",20);
var v3 = new bar([159],[135],"v3",20);
var v4 = new bar([238],[127],"v4",20);
var v5 = new bar([167],[143],"v5",20);

var h3 = new bar(0,[63],"h3",25);
var h4 = new bar([71],[71],"h4",25);
var h5 = new bar([79],[79],"h5",25);
var h6 = new bar([87],[87],"h6",25);
var h7 = new bar([95],[95],"h7",25);

var d1 = new bar([216],0,"d1",20,h4,[v2]);
var d2 = new bar([348],[271],"d2",20,h5,[v2,v3]);
var d3 = new bar([337],[249],"d3",20,h6,[v2,v3,v4]);
var d4 = new bar([326],[183],"d4",20,h7,[v2,v3,v4,v5]);
var d5 = new bar([315],[103],"d5",20,"",[v2,v3,v4,v5]);
var d6 = new bar([14],[14],"d6",20,"",[v4,v5]);
var d7 = new bar([25],[25],"d7",20);

var e1 = new bar([205],[282],"e1",10);
var e2 = new bar([359],[260],"e2",10);
var e3 = new bar([370],0,"e3",10);
var e4 = new bar([381],[293],"e4",10);
var e5 = new bar([392],[304],"e5",10);

var allNodes = [v1,v2,v3,v4,v5,h3,h4,h5,h6,h7,d1,d2,d3,d4,d5,d6,d7,e1,e2,e3,e4,e5];
var openNodes = [h3,h4,v1,v3];
var aggNodes = [h3,v1,v3];
var diagNodes = [d1,d2,d3,d4,d5,d6];
var vertNodes = [v2,v3,v4,v5];
var horizNodes = [h3,h4,h5,h6,h7];

var addButtons = function (startNum, numOfButtons, classHeader, className, idName, text) {
    for (var i = startNum; i <= numOfButtons; i++){
        $( classHeader ).append( "<p class = " + className  + " id=" + idName + i + ">" +text + i + "</p>" );
    }
}
var addText = function (startNum, numOfButtons, classHeader, className, idName, text) {
    for (var i = startNum; i <= numOfButtons; i++){
        $(classHeader).append("<p class = " + className  + " id=" + idName + i + ">" +text+ "</p>")
    }
}

addButtons(1,5, ".selectedOptions", "verticals", "v", "Vertical");
//addText(6, 6, ".selectedOptions", "verticals", "v", "Vertical Bars cannot intersect with diag bars")
addButtons(3, 7, ".selectedOptions", "horizontals", "h", "Horizontal");
//addText(8, 8, ".selectedOptions", "horizontals", "h", "A Horizontal Bar Must be visible to have Diag bars")
addButtons(1, 7, ".selectedOptions", "diagonals", "d", "Diagonal");
//addText(8, 8, ".selectedOptions", "diagonals", "d", "Diagonal bars mustn't intersect with veritcal bars, and a horizontal bar has to be selected")
addButtons(1, 5, ".selectedOptions", "eyeguards", "e", "Eye Guard")

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

var toggleCost = function(classHead, toggledClass, document){
    $(document).ready(function(){
        $(classHead).click(function(){
            $(toggledClass).show();
        });
    });
}
var toggleClass = function(classHead, toggledClass, document){
    $(document).ready(function(){
        $(classHead).click(function(){
            $(".horizontals").hide();
            $(".verticals").hide();
            $(".diagonals").hide();
            $(".eyeguards").hide();
            $(toggledClass).show();
            changeColor("#horiz", "white");
            changeColor("#vert", "white");
            changeColor("#diag", "white")
            changeColor("#eye", "white");
            changeColor(classHead, "blue");
        });
    });
}
var changeColor = function(classID, color){
    $(classID).css("color", color);
}

var falseClick = function (barSet) {
    for(var i=0;i<barSet.length; i++){
        barSet[i].clickCase(false);
    }
}
var trueClick = function (barSet) {
    for(var i=0;i<barSet.length; i++){
        barSet[i].clickCase(true);
    }
}

var colorAll = function (nodeSet, color) {
    for(var i= 0; i< nodeSet.length; i++){
        nodeSet[i].color(nodeSet[i].clicked, nodeSet[i].classID, color);
    }
}

var checkDiag = function(api){
    for(var i=0;i<diagNodes.length;i++){
        for(var j=0; j< diagNodes[i].cantSet.length; j++){
            if(diagNodes[i].cantSet[j].clicked){
                red = 1;
            }else if(diagNodes[i].clicked){
                diagNodes[i].cantSet[j].clickable(false);
                diagNodes[i].cantSet[j].color(diagNodes[i].cantSet[j].clicked,diagNodes[i].cantSet[j].classID,"red");
            }
        }
        if(red != 1 && !diagNodes[i].needSet.clicked){
            if(!v1.clicked){
                red = 1;
            }
        }
        if(red == 1 || checkHoriz()){
            if(diagNodes[i].clicked){
                cost -= diagNodes[i].price;
            }
            hideSet(api, diagNodes[i].getVision(vision));
            diagNodes[i].clickCase(false);
            diagNodes[i].clickable(false);
            diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID,"red");
        }else{
            diagNodes[i].clickable(true);
            diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID);
        }
        red = 0;
    }
}

var checkVerts = function(api){
    for(var i=0; i<vertNodes.length;i++){
        for(var j=0;j<diagNodes.length;j++){
            for(var k=0;k<diagNodes[j].cantSet.length;k++){
                if(diagNodes[j].clicked){
                    if(diagNodes[j].cantSet[k] == vertNodes[i]){
                        red = 1;
                    }
                }
            }
        }
        if(red != 1){
            vertNodes[i].clickable(true);
            vertNodes[i].color(vertNodes[i].clicked,vertNodes[i].classID);
        }
        red = 0;
    }
}

var checkHoriz = function(){
    for(var i=0;i<horizNodes.length;i++){
        if(!horizNodes[i].clicked){
            red += 1;
        }
    }
    if(red == horizNodes.length){
        red = 0;
        return true;
    } else {
        red = 0;
        return false;
    }
    
}

var visionToggle = function(api, classID, nodeSet, visionNodes) {
    document.getElementById(classID).addEventListener('click', function(){

            hideSet(api, nodes);
            falseClick(allNodes);
            colorAll(allNodes);
            showSet(api, nodeSet);
            trueClick(visionNodes);
            colorAll(visionNodes);
            
            
        if(classID == 'open'){
            vision = "op";
            changeColor("#open", "blue");
            changeColor("#agg", "white");
            checkDiag(api);
            h3.color(h3.clicked, h3.classID, "red");
            cost = 120;
            
        } else if(classID == 'agg'){
            vision = "ag";
            changeColor("#open", "white");
            changeColor("#agg", "blue");
            e3.color(e3.clicked, e3.classID, "red");
            checkDiag(api);
            d1.color(d1.clicked, d1.classID, "red");
            cost = 120;
        }
        
        costHTML.innerHTML = "Cost: $" + cost;
    })
}

var barToggle = function(api, classID, nodeSet){
    document.getElementById(classID).addEventListener('click',function(){
        
        if(nodeSet.able && nodeSet.getVision(vision) != 0){
            if(!nodeSet.clicked){
                showSet(api, nodeSet.getVision(vision));
                cost += nodeSet.price;
                nodeSet.clickCase(true);
                nodeSet.clickable(true);
                checkDiag(api);
                checkVerts(api);
            }else{
                hideSet(api, nodeSet.getVision(vision));
                cost -= nodeSet.price;
                nodeSet.clickCase(false);
                nodeSet.clickable(true);
                checkDiag(api);
                checkVerts(api);
            }
        }
        if(nodeSet.able && nodeSet.getVision(vision) != 0){
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
        }
        d1.color(d1.clicked, d1.classID, "red");
        costHTML.innerHTML = "Cost: $" + cost;
    });
}

var getScreenShot = function(api, classID, document) {
    document.getElementById(classID).addEventListener('click', function(){
        console.log("finished");
        api.getFov(function(err, fov) {
            if(!err) {
                console.log(fov);
            }
        });
        api.recenterCamera(function(err) {
            console.log(err);
        });
        api.getCameraLookAt(function(err, camera) {
            console.log(camera.position);
            console.log(camera.target);
        });
        api.setCameraLookAt(
            [0.013520359992979906, -9.266796183303377, 4.847950876449167], // eye position
            [0.013520359992980957, -0.678181380033493, 2.0573407635092735], // target to lookat
            0 // duration of the animation in seconds
        );
        setTimeout(function() {
            api.getScreenShot('image/png', function (err, data) {
                $('body').append($('<img src="' + data + '" />'));
            });
         }, 100);
         
         setTimeout(function() {
            api.setCameraLookAt(
                [-3.1668286439980857, -9.130186272191262, 2.0856702030234993], // eye position
                [0.013520359992980957, -0.678181380033493, 2.0573407635092735], // target to lookat
                0 // duration of the animation in seconds
             );
             setTimeout(function() {
                api.getScreenShot('image/png', function (err, data) {
                    $('body').append($('<img src="' + data + '" />'));
                });
             }, 200);
            
         }, 300);
         
    })
}

var buttonEvents = function(api){
    hideSet(api, nodes);
    visionToggle(api,'open',openStart,openNodes);
    visionToggle(api,'agg',aggressiveStart,aggNodes);
    barToggle(api, 'v1', v1);
    barToggle(api, 'v2', v2);
    barToggle(api, 'v3', v3);
    barToggle(api, 'v4', v4);
    barToggle(api, 'v5', v5);
    barToggle(api, 'h3', h3);
    barToggle(api, 'h4', h4);
    barToggle(api, 'h5', h5);
    barToggle(api, 'h6', h6);
    barToggle(api, 'h7', h7);
    barToggle(api, 'd1', d1);
    barToggle(api, 'd2', d2);
    barToggle(api, 'd3', d3);
    barToggle(api, 'd4', d4);
    barToggle(api, 'd5', d5);
    barToggle(api, 'd6', d6);
    barToggle(api, 'd7', d7);
    barToggle(api, 'e1', e1);
    barToggle(api, 'e2', e2);
    barToggle(api, 'e3', e3);
    barToggle(api, 'e4', e4);
    barToggle(api, 'e5', e5);
    getScreenShot(api, 'cost', document);
}

var success = function(api) {
    api.start(function() {
        api.addEventListener('viewerready', function() { 
            buttonEvents(api);
        });
    }); 
};

client.init( uid, {
    camera: false,
	internal: false,
	ui_infos: false,
	ui_controls: false,
	ui_stop: false,
    watermark: false,
    success: success,
    error: function onError() {
        console.log('Viewer Error');
    }
});

$(document).ready(function(){
    $(".horizontals").hide();
    $(".verticals").hide();
    $(".diagonals").hide();
    $(".eyeguards").hide();
    $(".costClass").hide();
    $("#wire").hide();
    $("#horiz").hide();
    $("#vert").hide();
    $("#diag").hide();
    $("#eye").hide();
    $("#bar").hide();
    toggleClass("#horiz", ".horizontals", document);
    toggleClass("#vert", ".verticals", document);
    toggleClass("#diag", ".diagonals", document);
    toggleClass("#eye", ".eyeguards", document);
    toggleCost("#open", ".costClass", document);
    toggleCost("#agg", ".costClass", document);
    toggleCost("#open", ".Style", document);  
    toggleCost("#agg", ".Style", document);  
});
