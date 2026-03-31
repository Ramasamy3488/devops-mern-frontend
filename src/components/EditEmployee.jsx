import { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../api/employeeApi";
import { useParams, useNavigate } from "react-router-dom";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    empId: "",
    name: "",
    email: "",
    age: "",
    city: "",
  });

  // Load only required fields
  useEffect(() => {
    getEmployeeById(id).then((res) => {
      const { empId, name, email, age, city } = res.data;

      setForm({
        empId: empId || "",
        name: name || "",
        email: email || "",
        age: age || "",
        city: city || "",
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateForm = async (e) => {
    e.preventDefault();

    await updateEmployee(id, form);

    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Edit Employee</h3>

      <form onSubmit={updateForm} className="shadow p-4 rounded bg-light">

        <input
          name="empId"
          value={form.empId}
          placeholder="Employee ID"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="name"
          value={form.name}
          placeholder="Name"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="email"
          value={form.email}
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="age"
          value={form.age}
          placeholder="Age"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="city"
          value={form.city}
          placeholder="City"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-warning w-100">Update Employee</button>
      </form>
    </div>
  );
}

export default EditEmployee;