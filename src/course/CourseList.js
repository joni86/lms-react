import React from "react";
import { Link } from "react-router-dom";
import PageLoader from "../common/PageLoader";
import * as CourseApi from "./CourseApi";
import MainContent from "../common/MainContent";
import "./Course.css";

class CourseList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      courses: []
    };
  }
  async componentDidMount() {
    try {
      const courses = await CourseApi.getCourses();
      this.setState({ isLoading: false, courses: courses });
    } catch (e) {
      this.setState({ isLoading: false });
    }
  }

  renderCourses() {
    return (
      <div className="columns is-multiline">
        {this.state.courses.map(c => {
          return (
            <div key={c.id} className="column is-one-third">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">{c.title}</p>
                </header>
                <div className="card-content course_description">
                  <div className="content">{c.description}</div>
                </div>
                <footer className="card-footer">
                  <Link to={`/courses/${c.id}`} className="card-footer-item">
                    Open
                  </Link>
                </footer>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <MainContent>
        <h1 className="title">Courses</h1>
        <Link
          className="button is-link newCourse_button"
          to="courses/createcourse"
        >
          New Course
        </Link>
        {this.state.isLoading && <PageLoader />}
        {!this.state.isLoading && this.state.courses.length === 0 && (
          <h3>No Course</h3>
        )}
        {!this.state.isLoading &&
          this.state.courses.length !== 0 &&
          this.renderCourses()}
      </MainContent>
    );
  }
}

export default CourseList;
