// import logo from './logo.svg';
import './App.css';
 import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
class App extends React.Component{

  constructor(props){
super(props);
this.state={
users:[],
name:'',
email:'',
password:'',
id:0

};
  }
  componentDidMount(){
axios.get('http://localhost:4000/users')
.then(result =>{
  this.setState({
    users:result.data
  })
})
  }
  nameChange=(e)=>{
this.setState({
  name:e.target.value
})
  }
  emailChange=(e)=>{
    this.setState({
      email:e.target.value
    })
      }
      passwordChange=(e)=>{
        this.setState({
          password:e.target.value
        })
          }
          addRec=(e, id)=>{
            if(id===0){
              axios.post('http://localhost:4000/users', {name:this.state.name,email:this.state.email,password:this.state.password})
              .then(()=>{
              this.componentDidMount();
              })
            }
            else{
              axios.put(`http://localhost:4000/users/${id}`, {name:this.state.name,email:this.state.email,password:this.state.password})
              .then(()=>{
              this.componentDidMount();
              })
            }

}
delRec=(e, id)=>{
axios.delete(`http://localhost:4000/users/${id}`)
.then(()=>{
  this.componentDidMount();
})
}
editRec=(e, id)=>{
axios.get(`http://localhost:4000/users/${id}`)
.then(result=>{
  this.setState({
   name:result.data.name,
   email:result.data.eamail,
   password:result.data.password,
   id:result.data.id

  })
})
}
render(){
  const {users}=this.state;
  return(
    <div className="container">
    <form autoComplete="off" onSubmit={(e)=>this.addRec(e, this.state.id)}>
    <div className="form-group">
    <label>User Name:</label>
  <input type="text" className="form-control" id="name" placeholder="Enter Your Name" name="name" value={this.state.name} 
  onChange={(e)=>this.nameChange(e)} />
  </div>
  <div className="form-group">
    <label>User Email:</label>
  <input type="email" className="form-control" id="email" placeholder="Enter Your Email" name="email" value={this.state.email} 
  onChange={(e)=>this.emailChange(e)}  />
  </div>
  <div className="form-group">
    <label>User  Password:</label>
  <input type="password" className="form-control" id="password" placeholder="Enter Your Password" name="pasword" value={this.state.password} 
  onChange={(e)=>this.passwordChange(e)} />
 </div>
 <input type="submit" className={this.state.id===0?"btn btn-primary mb-3 mt-3":"btn btn-success mt-3 mb-3"} value={this.state.id===0?"Add":"Update"}/>
</form>
    <table className="table table-striped table-border shadow table-bordered text-center">
      <thead>
        <tr>
          <th>User Id</th>
          <th>User Name</th>
          <th>User Email</th>
          <th>User Password</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user, index)=>(
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td><button onClick={(e)=>this.delRec(e, user.id)}  className="btn btn-danger">Delete</button></td>
          <td><button onClick={(e)=>this.editRec(e, user.id)}  className="btn btn-success">Edit</button></td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  )
}
}
export default App;
