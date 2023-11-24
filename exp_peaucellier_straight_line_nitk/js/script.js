
//Script specific to simulation

//program variables
//controls section
var simstatus=0; 
var rotstatus=1;
//comments section
var commenttext="Some Text";
var commentloc=0;
//computing section
var trans= new point(180,200);
var o= new point(0,0,"O");
var q= new point(0,0,"Q");
var a= new point(0,0,"A");
var b= new point(0,0,"B");
var c= new point(0,0,"C");
var p= new point(0,0,"P");
let l1= 0;
let l = 0;
let r=0;
var AQ=0,AP=0;
var theta = 0; // all angles to be defined either in degrees only or radians only throughout the program and convert as and when required 
var CAQ=0;		// All angles in Degrees. (mention the specification in the script like here)
//graphics section
var canvas;
var ctx;
//timing section
var simTimeId = setInterval("",'1000');
var pauseTime = setInterval("",'1000');
var time=0;
//point tracing section
var ptx = [];
var pty = [];
//click status of legend and quick reference
var legendCS = false;
var quickrefCS = false;
//temporary or dummy variables
var temp=0;

/*
// for trials during development
function trythis()
{ 		alert();}
*/

//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
function editcss()
{
$('.variable').css('padding-top','30px');
$('.usercheck').css('left','25px');
$('.usercheck').css('width','150px');
$('.usercheck').css('padding-top','15px');
//$('#legend').css("width",document.getElementById('legendimg').width+"px");
//$('#quickref').css("height",document.getElementById('quickrefimg').height+"px");
}

//start of simulation here; starts the timer with increments of 0.1 seconds
function startsim()
{
simTimeId=setInterval("time=time+0.1; varupdate(); ",'100');
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate()
{
  var imgfilename=document.getElementById('playpausebutton').src;
  imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
  if (imgfilename=="bluepausedull")
  {
    document.getElementById('playpausebutton').src="images/blueplaydull.png";
	 clearInterval(simTimeId);
    simstatus=1;
    $('#thetaspinner').spinner("value",theta);			//to set simulation parameters on pause
    pauseTime=setInterval("varupdate();",'100');
  }
    if (imgfilename=="blueplaydull")
  {
  	 time=0;			
  	 clearInterval(pauseTime);
    document.getElementById('playpausebutton').src="images/bluepausedull.png";
    simTimeId=setInterval("time=time+0.1; varupdate(); ",'100');    
    simstatus=0;
  } 
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate() {
    var imgfilename = document.getElementById('rotationbutton').src;
    imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
    if (imgfilename == "bluecwdull") {
        document.getElementById('rotationbutton').src = "images/blueccwdull.png";
        rotstatus = -1;
    }
    if (imgfilename == "blueccwdull") {
        document.getElementById('rotationbutton').src = "images/bluecwdull.png";
        rotstatus = 1;
    }

}
/*
//Displaying Equations for Quick Reference
function showEquations()
{
	if(quickrefCS)
	{
		$('#quickreficon').css('border', 'double');
		$('#quickref').css('width', '0px');
		$('#quickref').css('left', '600px');
		$('#quickref').css('border', '0px');
		quickrefCS=false;	
		
	}
	else
	{
		$('#quickreficon').css('border', 'inset red');
		$('#quickref').css('width', document.getElementById('quickrefimg').width+"px");
		$('#quickref').css("left", 599-document.getElementById('quickrefimg').width+"px");
		$('#quickref').css('border', 'solid 1px');
		quickrefCS=true;	
	}
}

//Displaying Legend
function showLegend()
{
	if(legendCS)
	{
		$('#legendicon').css('border', 'double');
		$('#legend').css('height', '0px');
		$('#legend').css('border', '0px');
		legendCS=false;	
	}
	else
	{
		$('#legendicon').css('border', 'inset red');
		$('#legend').css("height", document.getElementById('legendimg').height+"px");
		$('#legend').css('border', 'solid 1px');
		legendCS=true;	
	}
}
*/
//Initialise system parameters here
function varinit()
{
varchange();		
//Variable OQ slider and number input types
$('#OQslider').slider("value", 60);	
$('#OQspinner').spinner("value", 60);
//Variable AB slider and number input types
$('#ABslider').slider("value", 200);	
$('#ABspinner').spinner("value", 200);
//Variable QC slider and number input types
$('#QCslider').slider("value", 60);	
$('#QCspinner').spinner("value", 60);
//Variable theta slider and number input types
$('#thetaslider').slider("value", 0);	
$('#thetaspinner').spinner("value", 0);

}

// Initialise and Monitor variable containing user inputs of system parameters.
//change #id and repeat block for new variable. Make sure new <div> with appropriate #id is included in the markup
function varchange()
{
//Variable OQ slider and number input types
$('#OQslider').slider({ max : 80, min : 50, step : 2 });		// slider initialisation : jQuery widget
$('#OQspinner').spinner({ max : 80, min : 50, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#OQslider" ).on( "slide", function( e, ui ) { $('#OQspinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#OQspinner" ).on( "spin", function( e, ui ) { $('#OQslider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#OQspinner" ).on( "change", function() {  varchange() } );

//Variable AB slider and number input types
$('#ABslider').slider({ max : 250, min : 160, step : 10 });		// slider initialisation : jQuery widget
$('#ABspinner').spinner({ max : 250, min : 160, step : 10 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#ABslider" ).on( "slide", function( e, ui ) { $('#ABspinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#ABspinner" ).on( "spin", function( e, ui ) { $('#ABslider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#ABspinner" ).on( "change", function() {  varchange() } );

//Variable QC slider and number input types

$('#QCslider').slider({ max : 100, min : 50, step : 5 });		// slider initialisation : jQuery widget
$('#QCspinner').spinner({ max : 100, min : 50, step : 5 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#QCslider" ).on( "slide", function( e, ui ) { $('#QCspinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#QCspinner" ).on( "spin", function( e, ui ) { $('#QCslider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#QCspinner" ).on( "change", function() {  varchange() } );

//Variable theta slider and number input types
$('#thetaslider').slider({ max : 90, min : -90, step : 2 });		// slider initialisation : jQuery widget
$('#thetaspinner').spinner({ max : 90, min : -90, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#thetaslider" ).on( "slide", function( e, ui ) { $('#thetaspinner').spinner("value",ui.value);  } );
$( "#thetaspinner" ).on( "spin", function( e, ui ) { $('#thetaslider').slider("value",ui.value);  } );
$( "#thetaspinner" ).on( "change", function() {  varchange() } );

varupdate();

}


//Computing of various system parameters
function varupdate()
{
  
$('#OQslider').slider("value", $('#OQspinner').spinner('value'));
$('#ABslider').slider("value", $('#ABspinner').spinner('value'));  //updating slider location with change in spinner(debug)
$('#QCspinner').spinner("value", $('#QCslider').slider('value'));
$('#thetaslider').slider("value", $('#thetaspinner').spinner('value')); 
r=$('#OQspinner').spinner("value");
l1=$('#ABspinner').spinner("value");
$('#QCslider').slider({ max : 2*(l1-2*r), min : l1-2*r+5, step : 5 });		// QC min max reset
$('#QCspinner').spinner({ max : 2*(l1-2*r), min : l1-2*r+5, step : 5 });		// QC min max reset			
l=$('#QCspinner').spinner("value");
temp=Math.round(deg(2*Math.acos((l1-l)/(2*r))));

$('#thetaslider').slider({ max : temp, min : -temp, step : 1 });		// QC min max reset
$('#thetaspinner').spinner({ max : temp, min : -temp, step : 1 });		// QC min max reset			


if(!simstatus)
{
$('#thetaslider').slider("disable"); 
$('#thetaspinner').spinner("disable"); 
theta=theta+(rotstatus*1);

}
if(simstatus)
{
$('#thetaslider').slider("enable"); 
$('#thetaspinner').spinner("enable");
theta=$('#thetaspinner').spinner("value");
}

AQ=2*r*Math.cos(rad(theta/2));
if(((l1*l1+AQ*AQ-l*l)/(2*l1*AQ))>=-1 && ((l1*l1+AQ*AQ-l*l)/(2*l1*AQ))<=1)
{
CAQ=deg(Math.acos((l1*l1+AQ*AQ-l*l)/(2*l1*AQ)));
}
else 
{
rotstate();
}

AP=(AQ+2*Math.sqrt(l*l-Math.pow( l1*Math.sin(rad(CAQ)),2)));

o.xcoord=0;
o.ycoord=0;
a.xcoord=-r;
a.ycoord=0;
q.xcoord=o.xcoord+(r*Math.cos(rad(theta)));
q.ycoord=o.ycoord+(r*Math.sin(rad(theta)));
c.xcoord=a.xcoord+(l1*Math.cos(rad(CAQ+theta/2)));
c.ycoord=a.ycoord+(l1*Math.sin(rad(CAQ+theta/2)));
b.xcoord=a.xcoord+(l1*Math.cos(rad(-CAQ+theta/2)));
b.ycoord=a.ycoord+(l1*Math.sin(rad(-CAQ+theta/2)));
p.xcoord=a.xcoord+(AP*Math.cos(rad(theta/2)));
p.ycoord=a.ycoord+(AP*Math.sin(rad(theta/2)));

printcomment("Mechanism will stop functioning when &theta; is out of bounds for given combination of linkages",1);
printcomment("AB=AC, OQ=OA <br> BPQC should form a Rhombus <br>A,Q,P are collinear",2)
draw();

}

//Simulation graphics
function draw()
{
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,550,400);  //clears the complete canvas#simscreen everytime
    
  o=pointtrans(o,trans);
  q=pointtrans(q,trans);
  a=pointtrans(a,trans);
  b=pointtrans(b,trans);
  c=pointtrans(c,trans);
  p=pointtrans(p,trans);
  
  ptx.push(p.xcoord);
  pty.push(p.ycoord);
  
  pointjoin(o,q,ctx,"brown");
  pointjoin(o,a,ctx,"brown");
  pointjoin(a,b,ctx,"green");
  pointjoin(a,c,ctx,"green");
  pointjoin(q,c,ctx,"blue");
  pointjoin(q,b,ctx,"blue");
  pointjoin(b,p,ctx,"blue");
  pointjoin(c,p,ctx,"blue");
  
  pointdisp(o,ctx);
  pointdisp(q,ctx);
  pointdisp(a,ctx);
  pointdisp(b,ctx);
  pointdisp(c,ctx);
  pointdisp(p,ctx);
  
  if(document.getElementById("trace").checked==true)
  {
  pointtrace(ptx,pty,ctx,"blue",2);
  //pointdisp(p,ctx,2,'','','',true,1);
  }
  else
  {
  ptx=[];
  pty=[];
  }
}

// prints comments passed as 'commenttext' in location specified by 'commentloc' in the comments box;
// 0 : Single comment box, 1 : Left comment box, 2 : Right comment box
function printcomment(commenttext,commentloc)
{
  if(commentloc==0)
  {
  document.getElementById('commentboxright').style.visibility='hidden';
  document.getElementById('commentboxleft').style.width='570px';
  document.getElementById('commentboxleft').innerHTML = commenttext;
  }
  else if(commentloc==1)
  {
  document.getElementById('commentboxright').style.visibility='visible';
  document.getElementById('commentboxleft').style.width='285px';
  document.getElementById('commentboxleft').innerHTML = commenttext;
  }
  else if(commentloc==2)
  {
  document.getElementById('commentboxright').style.visibility='visible';
  document.getElementById('commentboxleft').style.width='285px';
  document.getElementById('commentboxright').innerHTML = commenttext;
  }
  else
  {
  document.getElementById('commentboxright').style.visibility='hidden';
  document.getElementById('commentboxleft').style.width='570px';
  document.getElementById('commentboxleft').innerHTML = "<center>please report this issue to adityaraman@gmail.com</center>"; 
  // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}

