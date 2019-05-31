import React from "react";
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import CourseList from "../course/CourseList";
import CourseDetails from "../course/CourseDetails";
import StudentList from "../student/StudentList";
import StudentDetails from "../student/StudentDetails";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "../notFound/NotFound";
import LecturerList from "../lecturer/LecturerList";
import LecturerDetails from "../lecturer/LecturerDetails";
import Login from "../login/Login";
import PrivateRoute from "./PrivateRoute";
import "./app.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/courses" component={CourseList} />
        <PrivateRoute
          path="/courses/:id(\d+|createcourse)"
          component={CourseDetails}
        />
        <PrivateRoute exact path="/students" component={StudentList} />
        <PrivateRoute
          path="/students/:id(\d+|createstudent)"
          component={StudentDetails}
        />
        <PrivateRoute exact path="/lecturers" component={LecturerList} />
        <PrivateRoute
          path="/lecturers/:id(\d+|createlecturer)"
          component={LecturerDetails}
        />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
