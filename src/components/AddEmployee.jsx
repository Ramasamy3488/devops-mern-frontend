import { useState } from "react";
import { createEmployee } from "../api/employeeApi";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [form, setForm] = useState({
    empId: "",
    name: "",
    email: "",
    age: "",
    city: "",
  });

  const [error, setError] = useState(""); // for alert message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error while typing
  };

  const validateForm = () => {
    const { empId, name, email, age, city } = form;

    if (!empId || !name || !email || !age || !city) {
      return "All fields are required!";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email format!";
    }

    if (isNaN(age) || age <= 0) {
      return "Age must be a valid number!";
    }

    return "";
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createEmployee(form);
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Try again!");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Employee</h3>

      <form onSubmit={submitForm} className="shadow p-4 rounded bg-light">

        {/* 🔴 Alert Message */}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <input
          name="empId"
          placeholder="Employee ID"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Name"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-success w-100">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;