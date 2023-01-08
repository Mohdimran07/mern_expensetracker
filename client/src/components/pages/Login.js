import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../features/auth/authSlice";
import BorderExample from "../loader/BorderExample";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, message, isError, isSuccess } = useSelector(
    (state) => state.auth
  );

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if(user) {
      navigate("/")
    }
  }, [isError, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log("logged in", user);
    dispatch(login({user, navigate, toast}));
  };

  if (isLoading) {
    return <BorderExample />;
  }

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phoneimage"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={submitHandler}>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <label className="form-label" for="form1Example13">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={emailChangeHandler}
                  id="form1Example13"
                  className="form-control form-control-lg"
                />
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <label className="form-label" for="form1Example23">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  id="form1Example23"
                  className="form-control form-control-lg"
                />
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* <!-- Checkbox --> */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    checked
                  />
                  <label className="form-check-label" for="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block w-100"
              >
                Sign in
              </button>
              <div className="text-center text-lg-start mt-4 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to="/register" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div>
          {isLoading ? <>
          <BorderExample />
          </>: null}
        </div>
      </div>
    </section>
  );
};

export default Login;
