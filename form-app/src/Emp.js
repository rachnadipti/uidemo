import React,{useEffect, useState} from 'react';
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const Emp = () => {
const[emp, setEmp]=useState({
"ename": "",
"email": "",
"profile": "",
"id": "",
});
const[emps, setEmps]=useState([]);
useEffect(()=>{
    const getAllemp=async()=>{
        try{
           
            const emps = await axios.get("http://localhost:3333/employee")
            setEmps(emps.data);
          
        }
        catch(err){
            console.log("err");
        }
    }
    getAllemp();
}, [])
const inputHandler=(e)=>{
    setEmp({
        ...emp,
        [e.target.name]: e.target.value
    })

}
const formSubmit=async(e)=>{
    try{
        await axios.post(`http://localhost:3333/employee`, emp)
    }
    catch(err){
        console.log("error");
    }
}
const inputDelete= async id=>{
    await axios.delete(`http://localhost:3333/employee/${id}`);
    var newemp = emps.filter((item)=>{
        return item.id !== id;
    })
    setEmps(newemp);
}
// useEffect(()=>{
//     const editEmp=async()=>{
//         try{
//             const emps = await axios.get(`http://localhost:3333/employee/${id}`)
//             setEmps(emps.data);
//         }
//         catch(err){
//             console.log("err");
//         }
//     }
//     editEmp();
// }, [id])
    return (
        <div>
<div className="container">
<div className="row my-2">
<div className="col-md-12">
    <div className="col-md-12 col-xs-12 bg-warning">
     <h4 className="p-2 text-center text-white">Add Student</h4>
     </div>
    <form onSubmit={e => formSubmit(e)} autoComplete="off">
      <div>
       <div className="col-md-12 my-2">
        <input autoComplete="ename" className="form-control" placeholder="Enter Your Name" name="ename"  required  id="ename" value={emp.name} onChange={e => inputHandler(e)}
        />
        </div>
       <div className="col-md-12 my-2">
        <input  placeholder="Enter Your Email" className="form-control" name="email"  required  id="email" value={emp.email} onChange={e => inputHandler(e)} />
     </div>
       <div className="col-md-12 my-2">
        <input placeholder="Enter Your Profile" className="form-control" name="profile" required  id="profile" value={emp.profile} onChange={e => inputHandler(e)} />
       </div>
     </div>
      <div style={{width: "100%"}}>
       <button type="submit" style={{width: "100%"}} className="btn btn-primary pv-3">Add</button>
      </div>
     </form>
    </div>
    <div className="col-md-12 col-xs-12">
   <table className="table table-strap">
       <thead>
           <tr>
               <td>No</td>
               <td>Name</td>
               <td>Email</td>
               <td>Profile</td>
               <td>Action</td>
           </tr>
       </thead>
       <tbody>
       {
           emps.map((emp, i)=>{
               return (
           <tr key={i}>
            <td>{i+1}</td>
               <td>{emp.ename}</td>
               <td>{emp.email}</td>
               <td>{emp.profile}</td>
               <td><button className="btn-danger" onClick={()=> inputDelete(emp.id)}>Delete</button></td>
               {/* <td><button className="btn-info" onClick={()=> editEmp(emp.id)}>Edit</button></td> */}
           </tr>
           )
           })
       }
       </tbody>
   </table>
    </div>
    </div>
    </div> 
        </div>
    )
}

export default Emp
