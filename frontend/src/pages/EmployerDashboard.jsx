import { useState, useEffect } from "react";
import axios from "axios";
function EmployerDashboard() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJobs] = useState([]);
  const loadJobs = async () => {
    try {
      const res = await axios.get("/api/jobs/");
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
      const res = await axios.post("/api/jobs/create", {
        title: title,
        company_name: company,
        location: location,
        salary: salary,
        experience: experience,
        job_type: jobType,
        description: description,
        skills: skills,
      });
      alert(res.data.message);
      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setExperience("");
      setJobType("");
      setSkills("");
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
          <div className="row">
            <div className="col-md-6">
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
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Salary (e.g. 8 LPA)"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Experience (e.g. 2 Years)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <select
                className="form-control mb-3"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">Select Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Skills (e.g. Python, FastAPI)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
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
                <th>Experience</th>
                <th>Job Type</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company_name}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                  <td>{job.experience}</td>
                  <td>{job.job_type}</td>
                  <td>{job.skills}</td>
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