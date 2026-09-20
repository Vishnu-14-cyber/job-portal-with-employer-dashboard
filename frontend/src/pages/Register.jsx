import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/auth/register", {
        company_name: companyName,
        username: companyName,
        email: email,
        password: password,
        role: "employer",
      });
      alert(res.data.message);
      setCompanyName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.detail) {
        alert("Registration Failed: " + JSON.stringify(err.response.data.detail));
      } else {
        alert("Registration Failed");
      }
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Employer Register
              </h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-primary w-100"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;