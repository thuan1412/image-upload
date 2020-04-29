import React, { Component } from "react";

import CustomButton from "../../components/custom -button/CustomButton";

import "./styles.scss";

const API = "http://localhost:3001/";
const GET_PHOTO_URL = API + "photos";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      photos: null,
    };
  }

  componentDidMount() {
    fetch(GET_PHOTO_URL)
      .then((response) => response.json())
      .then((data) =>
        this.setState({ isLoading: false, photos: data["photos"] })
      );
  }

  renderTableContent(photos) {
    // console.log(element)
    return photos.map((row) => (
      <tr key={row.id} className="row">
        <td className="id">{row.id}</td>
        <td className="photo">
          <img src={API + row.photoPath}></img>
        </td>
        <td className="description">{row.description}</td>
        <td className="name">{row.name}</td>
        <td className="edit">
          <CustomButton buttonType="edit-btn">Edit</CustomButton>
        </td>
        <td className="delete">
          <CustomButton buttonType="delete-btn">Delete</CustomButton>
        </td>
      </tr>
    ));
  }
  render() {
    return (
      <div className="home-container">
        <CustomButton buttonType="add-btn">Add Image</CustomButton>
        <table className="detail-photos">
          <thead>
            <tr className="header">
              <th className="id">Id</th>
              <th className="photo">Photo</th>
              <th className="description">Description</th>
              <th className="name">Name</th>
              <th className="edit">Edit</th>
              <th className="delete">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.isLoading
              ? null
              : this.renderTableContent(this.state.photos)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HomePage;
