import React, { useEffect, useState } from "react";
import imageLogo from "../image/onlineRegistration.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import BorderExample from "../loader/BorderExample";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const newPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, navigate, message, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== newPassword) {
      toast.error("wrong password", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("hiii");
    } else {
      const user = {
        name,
        email,
        password,
      };
      console.log("user data", user);
      dispatch(register(user));
    }
  };

  if (isLoading) {
    <div className="text-center">
      <BorderExample />
    </div>;
  }

  return (
    <div>
      <section className="vh-100 m-4" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5 ">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={submitHandler}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={nameChangeHandler}
                              id="form3Example1c"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={emailChangeHandler}
                              id="form3Example3c"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                            <input
                              type="password"
                              value={password}
                              onChange={passwordChangeHandler}
                              id="form3Example4c"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example4cd">
                              Confirm password
                            </label>
                            <input
                              type="password"
                              value={newPassword}
                              onChange={newPasswordChangeHandler}
                              id="form3Example4cd"
                              className="form-control"
                            />
                          </div>
                        </div>

                        

                        <div className="w-100 d-flex justify-content-center  mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-md w-100"
                          >
                            Register
                          </button>
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                          <p className="small fw-bold mt-2 pt-1 mb-0">
                            Already a user?{" "}
                            <Link to="/login" className="link-danger">
                              Login
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      {/* <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sampleimage"
                      /> */}
                      <img
                        src={imageLogo}
                        className="img-fluid h-90"
                        alt="Sampleimage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
