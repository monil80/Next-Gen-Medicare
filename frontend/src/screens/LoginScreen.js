import React, { useState, useEffect } from "react";
import { getuser } from "../redux/actions/userAction";
import { getcart, emptycart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";

import axios from "axios";
import { useHistory } from "react-router-dom";
import FormInput from "../components/FormInput";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    const data = { email: user.email, password: user.password };
    axios
      .post("http://localhost:5000/api/auth/login", data)
      .then((res) => {
        localStorage.setItem("auth-token", res.data.accessToken);
        localStorage.setItem("auth-token-id", res.data._id);
      })
      .then((res) => {
        dispatch(getuser());
        dispatch(getcart());

        navigate.push("/");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      const check1 = window.confirm("are you sure you want to log out ");

      if (check1) {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("auth-token-id");
        localStorage.removeItem("cart");
        dispatch(getuser());
        dispatch(emptycart());
        navigate.push("/login");
      } else {
        navigate.push("/");
      }
    }
  }, [navigate, dispatch]);

  const inputs = [
    {
      id: 4,
      name: "email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Your Email",
      required: true,
    },

    {
      id: 5,
      name: "password",
      type: "password",

      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
  return (
    <>
      <div>
        <section
          className="vh-100 bg-image"
          style={{
            backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp`,
          }}
        >
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card">
                    <div className="card-body p-4">
                      <h2 className="text-uppercase text-center mb-4">
                        Login into account
                      </h2>
                      <form>
                        {inputs.map((input) => (
                          <FormInput
                            key={input.id}
                            {...input}
                            value={user[input.name]}
                            onchange={handleChange}
                          />
                        ))}

                        <div className="d-flex justify-content-center">
                          <button
                            disabled={
                              user.email.length < 5 || user.password.length < 8
                            }
                            type="button"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                            onClick={login}
                          >
                            Sign IN
                          </button>
                        </div>
                        <p className="text-center text-muted mt-4 mb-0">
                          don't have an account?{" "}
                          <a href="/register" className="fw-bold text-body">
                            <u>Register here</u>
                          </a>
                        </p>
                        <p className="text-center text-muted mt-4 mb-0">
                          Go To Home?
                          <a href="/" className="fw-bold text-body">
                            <u>Click here</u>
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
