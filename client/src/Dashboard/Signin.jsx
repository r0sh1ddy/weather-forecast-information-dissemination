import React, { useState } from 'react';
import axios from 'axios';


function Signin() {
    const [formData, setFormData] = useState({
        emailAddress: '',
        password: '',
        agreeToTerms: false,
      });
    
      // Function to handle changes in form inputs
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update form data state with the new value
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      // Function to handle form submission
      const handleSubmit = async (event) => {
        event.preventDefault();
        // You can now access form data from the formData state
        console.log('Form data:', formData);
        // Here you can perform further actions like sending the data to a server
                try {
            // Send a POST request to your endpoint
            const response = await axios.post('http://localhost:9764/auth/login', formData);
            console.log('Response:', response.data);
            // Handle successful response
          } catch (error) {
            console.error('Error:', error);
            // Handle error
          }

      };

  return (
    <div><div class="wrapper  bg-primary">
    <div class="authentication-header"></div>
    <header class="login-header shadow">
        <nav class="navbar navbar-expand-lg navbar-light bg-black rounded fixed-top rounded-0 shadow-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="assets/images/sun.png" width="140" alt="" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent1">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"> <a class="nav-link active" aria-current="page" href="#"><i class='bx bx-home-alt me-1'></i>Home</a>
                        </li>
                        <li class="nav-item"> <a class="nav-link" href="#"><i class='bx bx-user me-1'></i>About</a>
                        </li>
                        <li class="nav-item"> <a class="nav-link" href="#"><i class='bx bx-category-alt me-1'></i>Features</a>
                        </li>
                        <li class="nav-item"> <a class="nav-link" href="#"><i class='bx bx-microphone me-1'></i>Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-4">
        <div class="container-fluid">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                <div class="col mx-auto">
                    <div class="card mt-5 mt-lg-0">
                        <div class="card-body">
                            <div class="p-4 rounded">
                                <div class="text-center">
                                    <h3 class="">Sign in</h3>
                                    <p>Don't have an account yet? <a href="/signup">Sign up here</a>
                                    </p>
                                </div>
                                <div class="d-grid">
                                    <a class="btn my-4 shadow-sm btn-white" href="javascript:;"> <span class="d-flex justify-content-center align-items-center">
                      <img class="me-2" src="assets/images/icons/search.svg" width="16" alt="Image Description"/>
                      <span>Sign in with Google</span>
                                        </span>
                                    </a> <a href="/home" class="btn btn-facebook"><i class="bx bxl-facebook"></i>Sign in with Facebook</a>
                                </div>
                                <div class="login-separater text-center mb-4"> <span>OR SIGN IN WITH EMAIL</span>
                                    <hr/>
                                </div>
                                <div class="form-body">
                                    <form class="row g-3" onSubmit={handleSubmit}>
                                        <div class="col-12">
                                            <label for="inputEmailAddress" class="form-label">Email Address</label>
                                            <input name='emailAddress' value={formData.emailAddress}onChange={handleInputChange} type="email" class="form-control" id="inputEmailAddress" placeholder="Email Address"required/>
                                        </div>
                                        <div class="col-12">
                                            <label for="inputChoosePassword" class="form-label">Enter Password</label>
                                            <div class="input-group" id="show_hide_password">
                                                <input name="password"value={formData.password}onChange={handleInputChange} type="password" class="form-control border-end-0" id="inputChoosePassword"  placeholder="Enter Password"required/> <a href="javascript:;" class="input-group-text bg-transparent"><i class='bx bx-hide'></i></a>
                                            </div>
                                        </div>
                                        <div class="col-md-6" >
                                            <div class="form-check form-switch">
                                                <input name="agreeToTerms" value={formData.agreeToTerms}onChange={handleInputChange} class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/>
                                                <label class="form-check-label"  for="flexSwitchCheckChecked">Remember Me</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 text-end">	<a href="/forgotpass">Forgot Password ?</a>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid">
                                            <a href="/home" class="btn btn-primary">
                                             <i class="bx bxs-lock-open"></i> Sign in
                                            </a>
                                            


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
    <footer class="bg-black shadow-sm border-top p-2 text-center fixed-bottom">
        <p class="mb-0 text-white">Copyright © 2024. All right reserved.</p>
    </footer>
</div></div>
  )
}

export default Signin