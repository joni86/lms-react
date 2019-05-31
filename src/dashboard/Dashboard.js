import React from "react";
import MainContent from "../common/MainContent";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <MainContent>
      <h1 className="title">Welcome to LMS</h1>
      <div className="tile is-ancestor">
        <div className="tile is-6 is-vertical is-parent">
          <div className="tile is-child box notification is-success">
            <p className="title">Students</p>
            <div className="content">Creative and smart</div>
            <Link
              to="/students"
              className="button is-success is-outlined is-inverted"
            >
              All students
            </Link>
          </div>
          <div className="tile is-child box notification is-warning">
            <p className="title">Lecturers</p>
            <div className="content">Professional and experienced</div>
            <Link
              to="/lecturers"
              className="button is-warning is-outlined is-inverted"
            >
              All lecturers
            </Link>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child box notification is-info">
            <p className="title">Courses</p>
            <div className="content">Tailor-made and practical</div>
            <Link
              to="/courses"
              className="button is-info is-outlined is-inverted"
            >
              All courses
            </Link>
          </div>
        </div>
      </div>
    </MainContent>
  );
}

export default Dashboard;
