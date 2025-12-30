import { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    await api.post("/auth/register", form);
    alert("OTP sent to email");
  } catch (error) {
    if (error.response?.status === 429) {
      alert("Too many attempts. Please wait 10 minutes.");
    } else {
      alert(error.response?.data?.message || "Something went wrong");
    }
  }
};


  return (
    <form onSubmit={submitHandler}>
      <input placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button>Register</button>
    </form>
  );
};

export default Register;
