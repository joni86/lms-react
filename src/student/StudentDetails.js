import React from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import MainContent from "../common/MainContent";
import { getValidationErrors, redirect } from "../common/helper";
import { pick } from "lodash/object";
import * as StudentApi from "./StudentApi";
import classnames from "classnames";
import PageLoader from "../common/PageLoader";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .max(50)
    .label("First name")
    .required(),
  lastName: yup
    .string()
    .max(50)
    .label("Last name")
    .required(),
  gender: yup
    .string()
    .label("Gender")
    .required(),
  dateOfBirth: yup
    .string()
    .label("Date of birth")
    .required(),
  email: yup
    .string()
    .email()
    .label("Email")
    .required(),
  credit: yup
    .number()
    .positive()
    .label("Credit")
    .required()
});

class StudentDetails extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      student: {
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        credit: ""
      },
      isLoading: false,
      errors: "",
      validationErrors: {},
      showDeleteModal: false,
      showSuccessUpdated: false,
      isSaving: false
    };
  }

  async componentDidMount() {
    if (!this.isCreatingNewStudent()) {
      this.setState({ isLoading: true });
      const student = await StudentApi.getStudentById(
        this.props.match.params.id
      );
      this.setState({ isLoading: false, student: student });
    }
  }

  isCreatingNewStudent() {
    return this.getStudentId() === "createstudent";
  }

  getStudentId() {
    return this.props.match.params.id;
  }

  handleDelete = () => {
    this.setState({ showDeleteModal: true });
  };

  handleCancelDelete = () => {
    this.setState({ showDeleteModal: false });
  };

  handleContinueDelete = async () => {
    try {
      await StudentApi.deleteStudent(this.getStudentId());
      this.setState({ showDeleteModal: false });
      redirect("/students");
    } catch (err) {
      this.setState({
        error: "error occured while deleting",
        showDeleteModal: false
      });
    }
  };

  handleSuccessUpdated = () => {
    this.setState({ showSuccessUpdated: false });
  };

  handleFieldChange = e => {
    const {
      target,
      target: { name }
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      student: {
        ...this.state.student,
        [name]: value
      },
      validationErrors: {}
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const userInput = pick(this.state.student, [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "email",
      "credit"
    ]);
    try {
      await schema.validate(userInput, {
        abortEarly: false
      });
    } catch (err) {
      const validationErrors = getValidationErrors(err);
      this.setState({ validationErrors, isSaving: false });
      return;
    }
    const { student } = this.state;
    try {
      this.setState({ validationErrors: {}, error: "" });
      if (this.isCreatingNewStudent()) {
        await StudentApi.createStudent(student);
        redirect("/students");
      } else {
        await StudentApi.updateStudent(student.id, student);
        this.setState({ showSuccessUpdated: true });
      }
    } catch (e) {
      this.setState({ isSaving: false });
    }
  };

  renderForm() {
    const {
      student: { firstName, lastName, gender, dateOfBirth, email, credit }
    } = this.state;
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                className="input"
                value={firstName}
                name="firstName"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["firstName"] && (
              <p className="help is-danger">
                {this.state.validationErrors["firstName"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                className="input"
                value={lastName}
                name="lastName"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["lastName"] && (
              <p className="help is-danger">
                {this.state.validationErrors["lastName"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select">
                <select
                  value={gender}
                  name="gender"
                  onChange={this.handleFieldChange}
                >
                  <option>--Select--</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>
            {this.state.validationErrors["gender"] && (
              <p className="help is-danger">
                {this.state.validationErrors["gender"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">
              {!this.isCreatingNewStudent()
                ? "Date Of Birth"
                : "Date Of Birth (YYYY-MM-DD)"}
            </label>
            <div className="control">
              <input
                className="input"
                value={dateOfBirth}
                name="dateOfBirth"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["dateOfBirth"] && (
              <p className="help is-danger">
                {this.state.validationErrors["dateOfBirth"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                value={email}
                name="email"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["email"] && (
              <p className="help is-danger">
                {this.state.validationErrors["email"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Credit</label>
            <div className="control">
              <input
                className="input"
                value={credit}
                name="credit"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["credit"] && (
              <p className="help is-danger">
                {this.state.validationErrors["credit"]}
              </p>
            )}
          </div>
          <div className="field is-grouped">
            <div className="control">
              <input
                className="button is-link"
                type="submit"
                value={this.isCreatingNewStudent() ? "Create" : "Save"}
              />
            </div>
            <div className="control">
              <Link className="button is-text" to="/students">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <MainContent>
        {this.state.isLoading && <PageLoader />}
        <h1 className="title">
          {this.isCreatingNewStudent() ? "New student" : "Student details"}
        </h1>
        {this.state.showSuccessUpdated && (
          <div className="notification is-success">
            <button className="delete" onClick={this.handleSuccessUpdated} />
            Successfully saved student
          </div>
        )}
        {!this.isCreatingNewStudent() && (
          <button
            className="button is-danger delete_button"
            onClick={this.handleDelete}
          >
            Delete student
          </button>
        )}
        {!this.state.isLoading && this.state.student && this.renderForm()}
        {!this.state.isLoading && !this.state.student && (
          <h3>Student Not Found</h3>
        )}
        <div
          className={classnames("modal", {
            "is-active": this.state.showDeleteModal
          })}
        >
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Are you sure to continue?</p>
              <button
                className="delete"
                aria-label="close"
                onClick={this.handleCancelDelete}
              />
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to delete this student?</p>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={this.handleContinueDelete}
              >
                Yes
              </button>
              <button className="button" onClick={this.handleCancelDelete}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </MainContent>
    );
  }
}

export default StudentDetails;
