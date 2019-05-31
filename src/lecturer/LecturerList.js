import React from "react";
import * as lecturerApi from "./LecturerApi";
import MainContent from "../common/MainContent";
import PageLoader from "../common/PageLoader";
import { Link } from "react-router-dom";
import "./Lecturer.css";

class LecturerList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isPageLoading: false,
      lecturers: []
    };
  }

  async componentDidMount() {
    try {
      const lecturers = await lecturerApi.getLecturers();
      this.setState({ isLoading: false, lecturers });
    } catch (e) {
      this.setState({ isLoading: false });
    }
  }

  renderLecturers() {
    if (this.state.isPageLoading) {
      return <PageLoader />;
    }
    if (!this.state.isPageLoading && !this.state.lecturers.length) {
      return <h3>No Lecturers :（</h3>;
    }
    if (!this.state.isPageLoading && this.state.lecturers.length) {
      return (
        <div>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Staff number</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.lecturers.map(lecturer => (
                <tr key={lecturer.id}>
                  <td>{lecturer.name}</td>
                  <td>{lecturer.email}</td>
                  <td>{lecturer.staffNumber}</td>
                  <td>
                    <Link to={`/lecturers/${lecturer.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  render() {
    return (
      <MainContent>
        <h1 className="title">Lecturers</h1>
        <Link
          className="button is-link newLecturer_button"
          to="lecturers/createlecturer"
        >
          New Lecturer
        </Link>
        {this.state.isLoading && <PageLoader />}
        {!this.state.isLoading && this.renderLecturers()}
      </MainContent>
    );
  }
}

export default LecturerList;
