
var iframe = document.getElementById('model-frame');

var version = '1.7.1';

var uid = '26d49027a9b142efa9d2154600347ef1';

var client = new Sketchfab( version, iframe);

var vision = null;
var clicked;
var nodes = [3,194,143,403,47,111,127,135,151,159,167,175,227,238,293,304,381,392,36,55,63,71,79,87,95,414,14,25,103,183,205,216,249,260,271,282,315,326,337,348,359,370];
var verticalNodes = [3, 47, 111, 127, 135, 143, 151, 159, 167, 175, 227, 238, 293, 304, 381, 392];
var horizontalNodes = [36,55,63,71,79,87,95,403,414];
var diagonalNodes = [14,25,103,183,194,205,216,249,260,271,282,315,326,337,348,359,370];
var aggressiveStart = [36,55,63,111,47,151,135];
var openStart = [36,63,71,111,47,175,159];

class bar {
    constructor(op = [], ag = [], name, needSet) {
        this.op = op;
        this.ag = ag;
        this.name = name;
        this.needSet = needSet;
        this.clicked = false;
        this.red = false;
        this.clickCase = function clickCase(click) {
            this.clicked = click;
        }
        this.redOut = function redOut(click) {
            this.red = click;
        }
        this.classID = "#" + name;
        this.color = function color(clicked, classID, color) {
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
    }
}
var aggressiveStart = [36,55,63,111,47,151,135];
var openStart = [36,63,71,111,47,175,159];

var v1 = new bar([175], [151],"v1");
var v2 = new bar([227],[3],"v2");
var v3 = new bar([159], [135],"v3");
var v4 = new bar([238], [127],"v4");
var v5 = new bar([167], [143],"v5");

var h3 = new bar(undefined,[63],"h3");
var h4 = new bar([71], [71],"h4");
var h5 = new bar([79], [79],"h5");
var h6 = new bar([87], [87],"h6");
var h7 = new bar([95], [95],"h7");

var d1 = new bar([216], [216],"d1",h4);
var d2 = new bar([348], [271],"d2",h5);
var d3 = new bar([337], [249],"d3",h6);
var d4 = new bar([326], [183],"d4",h7);
var d5 = new bar([315], [103],"d5");
var d6 = new bar([14], [14],"d6");
var d7 = new bar([25], [25],"d7");

var e1 = new bar([205], [282],"e1");
var e2 = new bar([359], [260],"e2");
var e3 = new bar([370], undefined,"e3");
var e4 = new bar([381], [293],"e4");
var e5 = new bar([392], [304],"e5");

var allNodes = [v1,v2,v3,v4,v5,h3,h4,h5,h6,h7,d1,d2,d3,d4,d5,d6,d7,e1,e2,e3,e4,e5];
var openNodes = [h3,h4,v1,v3];
var aggNodes = [h3,v1,v3];
var diagNodes = [d1,d2,d3,d4];

var addButtons = function (startNum, numOfButtons, classHeader, className, idName, text) {
    for (var i = startNum; i <= numOfButtons; i++){
        $( classHeader ).append( "<p class = " + className  + " id=" + idName + i + ">" +text + i + "</p>" );
    }
}
addButtons(1,5, ".selectedOptions", "verticals", "v", "Vertical");
addButtons(3, 7, ".selectedOptions", "horizontals", "h", "Horizontal");
addButtons(1, 7, ".selectedOptions", "diagonals", "d", "Diagonal");
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


var visionToggle = function(api, classID, nodeSet, visionNodes) {
    document.getElementById(classID).addEventListener('click', function(){
        
            hideSet(api, nodes);
            falseClick(allNodes);
            colorAll(allNodes);
            showSet(api, nodeSet);
            trueClick(visionNodes);
            colorAll(visionNodes);
            

            clicked = true;
        
        if(clicked && classID == 'open'){
            vision = "open";
            changeColor("#open", "blue");
            changeColor("#agg", "white");
            h3.color(h3.clicked, h3.classID, "red");
        } else if(clicked && classID == 'agg'){
            vision = "agg";
            changeColor("#open", "white");
            changeColor("#agg", "blue");
            e3.color(e3.clicked, e3.classID, "red");
        }
    })
}
var buttonToggle = function(api, classID, nodeSet) {
    var buttonClicked;
    document.getElementById(classID).addEventListener('click', function(){
        if(!buttonClicked || buttonClicked == null){
                showSet(api, nodeSet);
                buttonClicked = true;
        } else {
                hideSet(api, nodeSet);
                buttonClicked = false;
        }
    })
}

var barToggle = function(api, classID, nodeSet) { 
    document.getElementById(classID).addEventListener('click', function(){
        nodeSet.color(false, nodeSet.classID);
        if(vision == "open" && nodeSet.op == 0){
            nodeSet.color(nodeSet.clicked, nodeSet.classID, "red")
        }
        else if(vision == "agg" && nodeSet.ag == 0){
            nodeSet.color(nodeSet.clicked, nodeSet.classID, "red")
        }
        else if(!nodeSet.clicked){
            if(vision == "open"){
                showSet(api, nodeSet.op)
                for(var i=0;i<diagNodes.length;i++){
                    if(nodeSet == v1){
                        diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID);
                        diagNodes[i].redOut(false);
                    }
                }
                for(var i=0;i<diagNodes.length;i++){
                    if(nodeSet == diagNodes[i].needSet){
                        diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID);
                        diagNodes[i].redOut(false);
                    }
                }
            }
            else if(vision == "agg"){
                showSet(api, nodeSet.ag);
                
                for(var i=0;i<diagNodes.length;i++){
                    if(nodeSet == v1){
                        diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID);
                        diagNodes[i].redOut(false);
                    }
                }
                for(var i=0;i<diagNodes.length;i++){
                    if(nodeSet == diagNodes[i].needSet){
                        diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID);
                        diagNodes[i].redOut(false);
                    }
                }
            }
            nodeSet.clickCase(true);
            nodeSet.color(nodeSet.clicked, nodeSet.classID);
        } else {
            if(vision == "open" && nodeSet.op == 0){
                nodeSet.color(nodeSet.clicked, nodeSet.classID, "red")
            }
            else if(vision == "open"){
                nodeSet.color(nodeSet.clicked, nodeSet.classID);
                hideSet(api, nodeSet.op);
                for(var i = 0;i<diagNodes.length;i++){
                    if((nodeSet == v1 && !diagNodes[i].needSet.clicked)||(nodeSet == diagNodes[i].needSet && !v1.clicked)){
                        hideSet(api, diagNodes[i].op);
                        diagNodes[i].clickCase(false);
                        diagNodes[i].redOut(true);
                        diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID,"red");
                    } 
                }
    
            }
            else if(vision == "agg"){
                nodeSet.color(nodeSet.clicked, nodeSet.classID);
                hideSet(api, nodeSet.ag);
                for(var i = 0;i<diagNodes.length;i++){
                    if((nodeSet == v1 && !diagNodes[i].needSet.clicked)||(nodeSet == diagNodes[i].needSet && !v1.clicked)){
                        hideSet(api, diagNodes[i].ag);
                        diagNodes[i].clickCase(false);
                        diagNodes[i].redOut(true);
                        diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID,"red");
                    } 
                }
            }
            nodeSet.clickCase(false);
            nodeSet.color(nodeSet.clicked, nodeSet.classID);
        }
    })
}

var barToggleDiag = function(api, classID, nodeSet, needSet) { 
    document.getElementById(classID).addEventListener('click', function(){
        if(!nodeSet.clicked && ( v1.clicked || needSet.clicked)){
            if(vision == "open"){
                showSet(api, nodeSet.op)
            }
            else if(vision == "agg"){
                showSet(api, nodeSet.ag);
            }
            nodeSet.clickCase(true);
            nodeSet.color(nodeSet.clicked, nodeSet.classID);
        } else {
            
            if(vision == "open"){
                hideSet(api, nodeSet.op);
            }
            else if(vision == "agg"){
                hideSet(api, nodeSet.ag);
            }
            nodeSet.clickCase(false);
            if(!nodeSet.red){
                nodeSet.color(nodeSet.clicked, nodeSet.classID);
            }
        }
    })
}
var barToggleEye = function(api, classID, nodeSet){
    document.getElementById(classID).addEventListener('click', function(){
        if(!nodeSet.clicked && h3.clicked){
            if(vision == "open"){
                showSet(api, nodeSet.op)
            }
            else if(vision == "agg"){
                showSet(api, nodeSet.ag);
            }
            nodeSet.clickCase(true);
            nodeSet.color(nodeSet.clicked, nodeSet.classID);
        } else {
            
            if(vision == "open"){
                hideSet(api, nodeSet.op);
            }
            else if(vision == "agg"){
                hideSet(api, nodeSet.ag);
            }
            nodeSet.clickCase(false);
            if(!nodeSet.red){
                nodeSet.color(nodeSet.clicked, nodeSet.classID);
            }
        }
    })
}


var buttonEvents = function(api) {
    hideSet(api, nodes);
    visionToggle(api, 'open', openStart, openNodes);
    visionToggle(api, 'agg', aggressiveStart, aggNodes);
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
    barToggleDiag(api, 'd1', d1, d1.needSet);
    barToggleDiag(api, 'd2', d2, d2.needSet);
    barToggleDiag(api, 'd3', d3, d3.needSet);
    barToggleDiag(api, 'd4', d4, d4.needSet);
    barToggle(api, 'd5', d5);
    barToggle(api, 'd6', d6);
    barToggle(api, 'd7', d7);
    barToggle(api, 'e1', e1);
    barToggle(api, 'e2', e2);
    barToggle(api, 'e3', e3);
    barToggle(api, 'e4', e4);
    barToggle(api, 'e5', e5);
}

var success = function(api) {
    api.start(function() {
        api.addEventListener('viewerready', function() { 
            buttonEvents(api);
            api.getNodeMap(function(err, nodes) {
                if (err) {
                    console.log('Error Loading Nodes');
                    return;
                }
                console.log(nodes);
            })
            api.getSceneGraph(function(err, result) {
                if (err) {
                    console.log('Error getting nodes');
                    return;
                }
                // get the id from that log
                console.log(result);
            });
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
} );

$(document).ready(function(){
    
    $(".horizontals").hide();
    $(".verticals").hide();
    $(".diagonals").hide();
    $(".eyeguards").hide();
    toggleClass("#horiz", ".horizontals", document);
    toggleClass("#vert", ".verticals", document);
    toggleClass("#diag", ".diagonals", document);
    toggleClass("#eye", ".eyeguards", document);
});

