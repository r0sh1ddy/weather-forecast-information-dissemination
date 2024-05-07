import React, { useState, useEffect } from "react";
import axios from "axios";
import PerfectScrollbar from "perfect-scrollbar";
//import Signup from "./";"

function Signup() {
  useEffect(() => {
    // Initialize PerfectScrollbar when the component mounts
    const ps = new PerfectScrollbar("#scrollableContent");
    
    // Clean up PerfectScrollbar when the component unmounts
    return () => {
      ps.destroy();
    };
  }, []); // Empty dependency array to run the effect only once

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    county: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data:", formData);
  
    try {
      const response = await axios.post(
        "http://localhost:9764/auth/signup",
        formData
      );
      console.log("Response:", response.data);
  
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Signup failed. Please try again.");
    }
  };
  return (
    <div>
      <div class="wrappe bg-secondary">
        <div class="authentication-header"></div>
        <header class="login-header shadow">
          <nav class="navbar navbar-expand-lg navbar-light  bg-black rounded fixed-top rounded-0 shadow-sm">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
                <img src="assets/images/sun.png" width="140" alt="" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent1"
                aria-controls="navbarSupportedContent1"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                {" "}
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                class="collapse navbar-collapse"
                id="navbarSupportedContent1"
              >
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    {" "}
                    <a class="nav-link active" aria-current="page" href="#">
                      <i class="bx bx-home-alt me-1"></i>Home
                    </a>
                  </li>
                  <li class="nav-item">
                    {" "}
                    <a class="nav-link" href="#">
                      <i class="bx bx-user me-1"></i>About
                    </a>
                  </li>
                  <li class="nav-item">
                    {" "}
                    <a class="nav-link" href="#">
                      <i class="bx bx-category-alt me-1"></i>Features
                    </a>
                  </li>
                  <li class="nav-item">
                    {" "}
                    <a class="nav-link" href="#">
                      <i class="bx bx-microphone me-1"></i>Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div class="d-flex align-items-center justify-content-center my-5">
          <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
              <div class="col mx-auto">
                <div class="card mt-5">
                  <div class="card-body">
                    <div class="border p-4 rounded">
                      <div class="text-center">
                        <h3 class="">Sign Up</h3>
                        <p>
                          Already have an account?{" "}
                          <a href="authentication-signin-with-header-footer.html">
                          </a>
                        </p>
                      </div>
                      <div class="d-grid">
                        <a
                          class="btn my-4 shadow-sm btn-white"
                          href="javascript:;"
                        >
                          {" "}
                          <span class="d-flex justify-content-center align-items-center">
                            <img
                              class="me-2"
                              src="assets/images/icons/search.svg"
                              width="16"
                              alt="Image Description"
                            />
                            <span>Sign Up with Google</span>
                          </span>
                        </a>{" "}
                        <a href="javascript:;" class="btn btn-facebook">
                          <i class="bx bxl-facebook"></i>Sign Up with Facebook
                        </a>
                      </div>
                      <div class="login-separater text-center mb-4">
                        {" "}
                        <span>OR SIGN UP WITH EMAIL</span>
                        <hr />
                      </div>
                      <div class="form-body">
                        <form class="row g-3" onSubmit={handleSubmit}>
                          <div class="col-sm-6">
                            <label for="inputFirstName" class="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              class="form-control"
                              id="inputFirstName"
                              placeholder="Jhon"
                            />
                          </div>
                          <div class="col-sm-6">
                            <label for="inputLastName" class="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              class="form-control"
                              id="inputLastName"
                              placeholder="Deo"
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={formData.emailAddress}
                              onChange={handleInputChange}
                              name="emailAddress"
                              class="form-control"
                              id="inputEmailAddress"
                              placeholder="example@user.com"
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">
                              Password
                            </label>
                            <div class="input-group" id="show_hide_password">
                              <input
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                name="password"
                                class="form-control border-end-0"
                                id="inputChoosePassword"
                                placeholder="Enter Password"
                              />{" "}
                              <a
                                href="javascript:;"
                                class="input-group-text bg-transparent"
                              >
                                <i class="bx bx-hide"></i>
                              </a>
                            </div>
                          </div>
                          <div class="col-12">
                            <label for="inputSelectCountry" class="form-label">
                              Country
                            </label>
                            <select
                              class="form-select"
                              value={formData.country}
                              onChange={handleInputChange}
                              name="country"
                              id="inputSelectCountry"
                              aria-label="Default select example"
                            >
                              <option selected>Embu</option>
                              <option value="16">Tharaka-Nithi</option>
                              <option value="">Isiolo</option>
                              <option value="">Meru</option>
                              <option value="">Kirinyaga</option>
                              <option value="">Nyeri</option>
                              <option value="">Muranga</option>
                              <option value="">Kiambu</option>
                              <option value="18">Nyandarua</option>
                              <option value="">Nakuru</option>
                            </select>
                          </div>
                          <div class="col-12">
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                value={formData.username}
                                onChange={handleInputChange}
                                name="agreeToTerms"
                                type="checkbox"
                                id=""
                              />
                              <label
                                class="form-check-label"
                                for="flexSwitchCheckChecked"
                              >
                                I read and agree to Terms & Conditions
                              </label>
                            </div>
                          </div><div class="col-12">
                            <div class="d-grid">
                    
                              <button type="submit" class="btn btn-secondary">
                              <i class="bx bxs-lock-open"></i> Sign up
                              </button>
                            </div>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="bg-black border-top p-5 text-center  absolute">
          <p class="mb-0">Copyright © 2024. All right reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Signup;
 