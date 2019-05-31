import React from "react";
import PageLoader from "../common/PageLoader";
import moment from "moment";
import { range } from "lodash/util";
import classnames from "classnames";
import MainContent from "../common/MainContent";
import * as StudentApi from "./StudentApi";
import { Link } from "react-router-dom";
import "./Student.css";

class StudentList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      totalPage: 1,
      isPageLoading: false,
      isLoading: true,
      students: [],
      error: ""
    };
  }

  async componentDidMount() {
    /*  const data = await StudentApi.getStudents(this.state.currentPage);
    this.setState({
      isLoading: false,
      students: data.students,
      totalPage: data.totalPage
    }); */
    await this.fetchStudentsByPage(1);
  }

  fetchStudentsByPage = async pageNumber => {
    this.setState({ currentPage: pageNumber, isLoadingPage: true });
    try {
      const data = await StudentApi.getStudents(pageNumber);
      this.setState({
        students: data.students,
        totalPage: data.totalPage,
        isLoadingPage: false,
        isLoading: false,
        error: ""
      });
    } catch (e) {
      this.setState({
        error: "Sorry, error occurred while loading students",
        isLoading: false,
        isLoadingPage: false
      });
    }
  };

  async handlePageNumberClick(pageNumber, e) {
    e.preventDefault();
    this.setState({ isPageLoading: true });
    const data = await StudentApi.getStudents(pageNumber);
    this.setState({
      isPageLoading: false,
      students: data.students,
      currentPage: pageNumber,
      totalPage: data.totalPage
    });
  }

  renderStudents() {
    if (this.state.isPageLoading) {
      return <PageLoader />;
    }
    if (!this.state.isPageLoading && !this.state.students.length) {
      return <h3>No Students :(</h3>;
    }
    if (!this.state.isPageLoading && this.state.students.length) {
      return (
        <div>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Date of birth</th>
                <th>Credit</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.students.map(student => (
                <tr key={student.id}>
                  <td>
                    {student.firstName} {student.lastName}
                  </td>
                  <td>{student.email}</td>
                  <td>{student.gender}</td>
                  <td>{moment(student.dateOfBirth).format("MMM DD YYYY")}</td>
                  <td>{student.credit}</td>
                  <td>
                    <Link to={`/students/${student.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>{this.renderPages()}</div>
        </div>
      );
    }
  }

  renderPages() {
    const { totalPage, currentPage } = this.state;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPage;
    let pageNumbers = [];
    if (totalPage < 3) {
      pageNumbers = range(1, totalPage + 1);
    } else {
      if (currentPage === 1) {
        pageNumbers = [1, 2, 3];
      } else if (currentPage === totalPage) {
        pageNumbers = [totalPage - 2, totalPage - 1, totalPage];
      } else {
        pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
      }
    }
    return (
      <nav className="pagination is-centered">
        {hasPrev && (
          <a
            className="pagination-previous"
            onClick={this.fetchStudentsByPage.bind(this, currentPage - 1)}
          >
            Previous
          </a>
        )}
        {hasNext && (
          <a
            className="pagination-next"
            onClick={this.fetchStudentsByPage.bind(this, currentPage + 1)}
          >
            Next
          </a>
        )}
        <ul className="pagination-list">
          {" "}
          {pageNumbers.map(pageNumber => (
            <a
              key={pageNumber}
              className={classnames("pagination-link", {
                "is-current": currentPage === pageNumber
              })}
              onClick={
                currentPage === pageNumber
                  ? undefined
                  : this.fetchStudentsByPage.bind(this, pageNumber)
              }
            >
              {" "}
              {pageNumber}{" "}
            </a>
          ))}{" "}
        </ul>
      </nav>
    );
  }

  render() {
    return (
      <MainContent>
        <h1 className="title">Students</h1>
        <Link
          className="button is-link newStudent_button"
          to="students/createstudent"
        >
          New Student
        </Link>
        {this.state.isLoading && <PageLoader />}
        {!this.state.isLoading && this.renderStudents()}
      </MainContent>
    );
  }
}

export default StudentList;
