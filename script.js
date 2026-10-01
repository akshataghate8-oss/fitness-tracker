const defaultData = {steps:0, water:0, calories:0, minutes:0};
let data = JSON.parse(localStorage.getItem("fitTrackData")) || {...defaultData};

function save(){localStorage.setItem("fitTrackData",JSON.stringify(data)); render();}
function pct(value,goal){return Math.min(100,Math.round((value/goal)*100));}
function render(){
  document.getElementById("steps").textContent=data.steps.toLocaleString();
  document.getElementById("water").textContent=data.water;
  document.getElementById("calories").textContent=data.calories;
  document.getElementById("minutes").textContent=data.minutes;
  document.getElementById("heroSteps").textContent=data.steps.toLocaleString();

  const values=[
    ["stepsBar",data.steps,10000],
    ["waterBar",data.water,8],
    ["caloriesBar",data.calories,500],
    ["minutesBar",data.minutes,60]
  ];
  values.forEach(([id,v,g])=>document.getElementById(id).style.width=pct(v,g)+"%");
  document.getElementById("goalSteps").textContent=pct(data.steps,10000)+"%";
  document.getElementById("goalWater").textContent=pct(data.water,8)+"%";
  document.getElementById("goalCalories").textContent=pct(data.calories,500)+"%";
  document.getElementById("goalMinutes").textContent=pct(data.minutes,60)+"%";
}
function addSteps(){
  const n=Number(document.getElementById("stepInput").value);
  if(n>0){data.steps+=n;document.getElementById("stepInput").value="";save();}
}
function addWater(){
  const n=Number(document.getElementById("waterInput").value);
  if(n>0){data.water+=n;document.getElementById("waterInput").value="";save();}
}
function addWorkout(name,minutes,calories){
  data.minutes+=minutes;data.calories+=calories;save();
  document.getElementById("workoutMessage").textContent=`✓ ${name} added: ${minutes} minutes and ~${calories} calories.`;
}
function resetData(){
  if(confirm("Reset today's fitness data?")){data={...defaultData};save();}
}
const quotes=[
 "Small steps every day lead to big results.",
 "Your only limit is the one you set yourself.",
 "Consistency is more important than perfection.",
 "Take care of your body. It is the only place you have to live.",
 "Progress, not perfection."
];
function newQuote(){document.getElementById("quote").textContent=quotes[Math.floor(Math.random()*quotes.length)];}
render();
