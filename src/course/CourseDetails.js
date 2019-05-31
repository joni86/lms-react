import React from "react";
import classnames from "classnames";
import * as CourseApi from "./CourseApi";
import PageLoader from "../common/PageLoader";
import * as yup from "yup";
import { pick } from "lodash/object";
import { getValidationErrors, redirect } from "../common/helper";
import MainContent from "../common/MainContent";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

const schema = yup.object().shape({
  title: yup
    .string()
    .max(50)
    .label("Title")
    .required(),
  language: yup
    .string()
    .max(50)
    .label("Language")
    .required(),
  fee: yup
    .number()
    .positive()
    .min(10)
    .max(5000)
    .label("Fee")
    .required(),
  maxStudent: yup
    .number()
    .positive()
    .min(10)
    .max(40)
    .label("Max students")
    .required(),
  description: yup
    .string()
    .max(250)
    .label("Description")
});

class CourseDetails extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      course: {
        title: "",
        fee: "",
        maxStudent: "",
        language: "",
        description: ""
      },
      isLoading: false,
      errors: "",
      isSaving: false,
      validationErrors: {},
      showDeleteModal: false,
      showSuccessUpdated: false
    };
  }

  async componentDidMount() {
    if (!this.isCreatingNewCourse()) {
      this.setState({ isLoading: true });
      const course = await CourseApi.getCourseById(this.props.match.params.id);
      this.setState({ isLoading: false, course: course });
    }
  }

  handleFieldChange = e => {
    const {
      target,
      target: { name }
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      course: {
        ...this.state.course,
        [name]: value
      },
      validationErrors: {}
    });
  };

  handleSubmit = async e => {
    /*   e.preventDefault();
    const newErrors = await this.validate();
    this.setState({ validationErrors: newErrors });
    if (Object.keys(newErrors).length) {
      return;
    } */
    e.preventDefault();
    const userInput = pick(this.state.course, [
      "title",
      "language",
      "fee",
      "maxStudent",
      "description"
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
    const { course } = this.state;
    try {
      this.setState({ validationErrors: {}, error: "" });
      if (this.isCreatingNewCourse()) {
        await CourseApi.createCourse(course);
        redirect("/courses");
      } else {
        await CourseApi.updateCourse(course.id, course);
        this.setState({ showSuccessUpdated: true });
      }
    } catch (e) {
      this.setState({ isSaving: false });
    }
  };

  isCreatingNewCourse() {
    return this.getCourseId() === "createcourse";
  }
  getCourseId() {
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
      await CourseApi.deleteCourse(this.getCourseId());
      this.setState({ showDeleteModal: false });
      redirect("/courses");
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

  renderForm() {
    const {
      course: { title, fee, language, maxStudent, description }
    } = this.state;
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                value={title}
                name="title"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["title"] && (
              <p className="help is-danger">
                {this.state.validationErrors["title"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Fee</label>
            <div className="control">
              <input
                className="input"
                value={fee}
                name="fee"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["fee"] && (
              <p className="help is-danger">
                {this.state.validationErrors["fee"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Max Students</label>
            <div className="control">
              <div className="select">
                <select
                  value={maxStudent}
                  name="maxStudent"
                  onChange={this.handleFieldChange}
                >
                  <option>--Select--</option>
                  <option value={10}>10</option>
                  <option value={16}>16</option>
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            {this.state.validationErrors["maxStudent"] && (
              <p className="help is-danger">
                {this.state.validationErrors["maxStudent"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Language</label>
            <div className="control">
              <div className="select">
                <select
                  value={language}
                  name="language"
                  onChange={this.handleFieldChange}
                >
                  <option>--Select--</option>
                  <option value="csharp">C#</option>
                  <option value="js">JS</option>
                  <option value="python">Python</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>
            {this.state.validationErrors["language"] && (
              <p className="help is-danger">
                {this.state.validationErrors["language"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                value={description}
                name="description"
                onChange={this.handleFieldChange}
              />
            </div>
            {this.state.validationErrors["description"] && (
              <p className="help is-danger">
                {this.state.validationErrors["description"]}
              </p>
            )}
          </div>
          <div className="field is-grouped">
            <div className="control">
              <input
                className="button is-link"
                type="submit"
                value={this.isCreatingNewCourse() ? "Create" : "Save"}
              />
            </div>
            <div className="control">
              <Link className="button is-text" to="/courses">
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
          {this.isCreatingNewCourse() ? "New course" : "Course details"}
        </h1>
        {this.state.showSuccessUpdated && (
          <div className="notification is-success">
            <button className="delete" onClick={this.handleSuccessUpdated} />
            Successfully saved course
          </div>
        )}
        {!this.isCreatingNewCourse() && (
          <button
            className="button is-danger delete_button"
            onClick={this.handleDelete}
          >
            Delete course
          </button>
        )}
        {!this.state.isLoading && this.state.course && this.renderForm()}
        {!this.state.isLoading && !this.state.course && (
          <h3>Course Not Found</h3>
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
              <p>Are you sure you want to delete this course?</p>
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

/* CourseDetails.propTypes = {
  match: PropTypes.object
}; */

export default CourseDetails;
