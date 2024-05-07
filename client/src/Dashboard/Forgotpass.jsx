import React, { useState } from 'react';

function Forgotpass() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can implement the functionality to send a password reset email
    console.log('Email:', email);
    // Implement the logic to send a password reset email
  };

  return (
    <div class="card-body">
      <div class="form-body">
        <form class="row g-3" onSubmit={handleSubmit}>
          <div class="col-12">
            <label for="inputEmailAddress" class="form-label">Email Address</label>
            <input 
              type="email" 
              class="form-control" 
              id="inputEmailAddress" 
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div class="col-12">
            <div class="d-grid">
              <button type="submit" class="btn btn-primary">
                Reset Password
              </button>
              <div class="d-grid row g-3">
             <a href="/" class="btn btn-secondary">
             <i></i> Sign up
             </a>
                                              




              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgotpass;
