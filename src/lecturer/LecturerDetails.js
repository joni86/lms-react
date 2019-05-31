import React from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import MainContent from "../common/MainContent";
import { getValidationErrors, redirect } from "../common/helper";
import { pick } from "lodash/object";
import classnames from "classnames";
import PageLoader from "../common/PageLoader";
import * as LecturerApi from "./LecturerApi";

const schema = yup.object().shape({
  name: yup
    .string()
    .max(100)
    .label("Name")
    .required(),
  staffNumber: yup
    .number()
    .positive()
    .label("Staff Number")
    .required(),
  email: yup
    .string()
    .email()
    .label("Email")
    .required(),
  bibliography: yup
    .string()
    .label("Bibliography")
    .required()
});

class LecturerDetails extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      lecturer: {
        name: "",
        staffNumber: "",
        email: "",
        bibliography: ""
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
    if (!this.isCreatingNewLecturer()) {
      this.setState({ isLoading: true });
      const lecturer = await LecturerApi.getLecturerById(
        this.props.match.params.id
      );
      this.setState({ isLoading: false, lecturer: lecturer });
    }
  }

  isCreatingNewLecturer() {
    return this.getLecturerId() === "createlecturer";
  }

  getLecturerId() {
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
      await LecturerApi.deleteLecturer(this.getLecturerId());
      this.setState({ showDeleteModal: false });
      redirect("/lecturers");
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
      lecturer: {
        ...this.state.lecturer,
        [name]: value
      },
      validationErrors: {}
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const userInput = pick(this.state.lecturer, [
      "name",
      "staffNumber",
      "email",
      "bibliography"
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
    const { lecturer } = this.state;
    try {
      this.setState({ validationErrors: {}, error: "" });
      if (this.isCreatingNewLecturer()) {
        await LecturerApi.createLecturer(lecturer);
        redirect("/lecturers");
      } else {
        await LecturerApi.updateLecturer(lecturer.id, lecturer);
        this.setState({ showSuccessUpdated: true });
      }
    } catch (e) {
      this.setState({ isSaving: false });
    }
  };

  renderForm() {
    const {
      lecturer: { name, staffNumber, email, bibliography }
    } = this.state;
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                value={name}
                name="name"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["name"] && (
              <p className="help is-danger">
                {this.state.validationErrors["name"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Staff Number</label>
            <div className="control">
              <input
                className="input"
                value={staffNumber}
                name="staffNumber"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["staffNumber"] && (
              <p className="help is-danger">
                {this.state.validationErrors["staffNumber"]}
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
            <label className="label">Bibliography</label>
            <div className="control">
              <input
                className="input"
                value={bibliography}
                name="bibliography"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["bibliography"] && (
              <p className="help is-danger">
                {this.state.validationErrors["bibliography"]}
              </p>
            )}
          </div>
          <div className="field is-grouped">
            <div className="control">
              <input
                className="button is-link"
                type="submit"
                value={this.isCreatingNewLecturer() ? "Create" : "Save"}
              />
            </div>
            <div className="control">
              <Link className="button is-text" to="/lecturers">
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
          {this.isCreatingNewLecturer() ? "New lecturer" : "Lecturer details"}
        </h1>
        {this.state.showSuccessUpdated && (
          <div className="notification is-success">
            <button className="delete" onClick={this.handleSuccessUpdated} />
            Successfully saved lecturer
          </div>
        )}
        {!this.isCreatingNewLecturer() && (
          <button
            className="button is-danger delete_button"
            onClick={this.handleDelete}
          >
            Delete lecturer
          </button>
        )}
        {!this.state.isLoading && this.state.lecturer && this.renderForm()}
        {!this.state.isLoading && !this.state.lecturer && (
          <h3>Lecturer Not Found</h3>
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
              <p>Are you sure you want to delete this lecturer?</p>
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

export default LecturerDetails;
