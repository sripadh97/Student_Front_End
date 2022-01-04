import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListStudentComponent from './components/ListStudentComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateStudentComponent from './components/CreateStudentComponent';
import ViewStudentComponent from './components/CreateStudentComponent';
import UpdateStudentComponent from './components/UpdateStudentComponent';
import SignIn from './components/Auth/Signin';
import SignUp from './components/Auth/Signup';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                  <div className="container">
                      <Routes>
                          <Route path = "/" exact element = {<ListStudentComponent/>}></Route>
                          <Route path = "/students" element = {< ListStudentComponent />}></Route>
                          <Route path = "/add-student/:id" element = { <CreateStudentComponent/>}></Route>
                          <Route path = "/view-student/:id" element = { <ViewStudentComponent/>}></Route>
                          <Route path = "/update-student/:id" element = {<UpdateStudentComponent/>}></Route>
                          <Route path = "/signin" element = { <SignIn/> }></Route>
                          <Route path = "/signup" element = { <SignUp/> }></Route>
                      </Routes>
                  </div> 
        </Router>
 
    </div>
    
  );
}

export default App;
