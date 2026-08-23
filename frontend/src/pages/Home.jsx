import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="bg-primary text-white p-5 rounded text-center">
        <h1>Find Your Dream Job</h1>
        <p>Search thousands of jobs from top companies.</p>
        <button
          className="btn btn-light me-2"
          onClick={() => navigate("/jobs")}
        >
          Find Jobs
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/login")}
        >
          Employer Login
        </button>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
export default Home;