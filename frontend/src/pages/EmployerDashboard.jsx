import { useState, useEffect } from "react";
import axios from "axios";
function EmployerDashboard() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJobs] = useState([]);
  const loadJobs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/jobs/");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadJobs();
  }, []);
  const handlePostJob = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/jobs/create", {
        title: title,
        company_name: company,
        location: "Chennai",
        salary: "8 LPA",
        experience: "2 Years",
        job_type: "Full Time",
        description: description,
        skills: "Python, FastAPI",
      });
      alert(res.data.message);
      setTitle("");
      setCompany("");
      setDescription("");
      loadJobs();
    } catch (err) {
      alert("Failed to Post Job");
      console.log(err);
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employer Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-primary text-white mb-3">
            <div className="card-body">
              <h5>Total Jobs</h5>
              <h2>{jobs.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white mb-3">
            <div className="card-body">
              <h5>Total Applications</h5>
              <h2>56</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark mb-3">
            <div className="card-body">
              <h5>Active Jobs</h5>
              <h2>{jobs.length}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow">
        <div className="card-body">
          <h3>Post New Job</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <textarea
            className="form-control mb-3"
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            className="btn btn-primary"
            onClick={handlePostJob}
          >
            Post Job
          </button>
        </div>
      </div>
      <div className="card mt-4 shadow">
        <div className="card-body">
          <h3>Posted Jobs</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company_name}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default EmployerDashboard;