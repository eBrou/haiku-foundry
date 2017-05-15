import React from 'react';
import '../../css/login.css';

export default function Login (props) {
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <form class= "sign_in_form" action= "/signup" method="post">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" name="email" class="form-control login_inputs" id="exampleInputEmail1" placeholder="Email" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" name="password" class="form-control login_inputs" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" class="btn btn-primary sign_up_submit" >Submit</button>
        </form>
      </div>
    </div>
  )
}
