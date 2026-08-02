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
          onClick={() => navigate("/")}
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
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4>Software Developer</h4>
              <p>Company: Google</p>
              <button className="btn btn-primary">
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4>Python Developer</h4>
              <p>Company: Microsoft</p>
              <button className="btn btn-primary">
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4>Frontend Developer</h4>
              <p>Company: Amazon</p>
              <button className="btn btn-primary">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;