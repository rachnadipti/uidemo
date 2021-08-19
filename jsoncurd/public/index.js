function addEmp(){
    let id= prompt("Enter Employee Id: ");
    let ename =prompt("Enter Employee Name: ");
    let profile= prompt("Enter Employee Profile: ");
let emp ={
"id":id,
"ename":ename,
"profile":profile
}
fetch('http://localhost:3000/emp/',{
method: 'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify(emp)
}).then((res)=>{
console.log(res);
})
}
//Updating the Data in db.json using json server
function editEmp(){
    let id= prompt("Enter Employee Id: ");
    let ename =prompt("Enter Employee Name: ");
    let profile= prompt("Enter Employee Profile: ");
let emp ={
"id":id,
"ename":ename,
"profile":profile
}
fetch(`http://localhost:3000/emp/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(emp)
}).then((res)=>{
console.log(res);
})
}

//Deleting Data in db.json using json server
function deleteEmp(){
    let id= prompt("Enter Employee Id: ");
fetch(`http://localhost:3000/emp/${id}`,{
method:"DELETE",
headers:{
"Content-Type":"application/json"
}
}).then((res)=>{
console.log(res);
})
}

//Fetching the Data from db.json using json server

function getEmp(){
fetch("http://localhost:3000/emp").then((res)=>{
return res.json();
}).then((emp)=>{
retrive(emp);
function retrive(emps)
{
    let creat = document.getElementById("created-data")
    for (let i =0; i< emps.length; i++){
     var row = `<tr><td>${emps[i].id}</td><td>${emps[i].ename}</td><td>${emps[i].profile}</td></tr>`; 
       creat.innerHTML += row;
        
    }
}

})
}

