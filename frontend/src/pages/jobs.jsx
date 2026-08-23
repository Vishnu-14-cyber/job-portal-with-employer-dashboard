import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/jobs/")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log(err));
  }, []);

  const openForm = (jobId) => {
    setSelectedJobId(jobId);
    setApplicantName("");
    setEmail("");
    setPhone("");
  };

  const handleApply = async (jobId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/jobs/apply/${jobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicant_name: applicantName,
          email: email,
          phone: phone,
        }),
      });
      if (!res.ok) throw new Error("Apply failed");
      setAppliedJobs([...appliedJobs, jobId]);
      setSelectedJobId(null);
    } catch (err) {
      console.log(err);
      alert("Failed to submit application");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Find Jobs</h2>
      <p className="text-center text-muted">
        {jobs.length} job{jobs.length === 1 ? "" : "s"} available
      </p>

      {jobs.length === 0 ? (
        <div className="alert alert-info text-center">No jobs available.</div>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div className="col-md-6 mb-4" key={job.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title">{job.title}</h4>
                  <h6 className="card-subtitle mb-3 text-muted">
                    {job.company_name}
                  </h6>
                  <p className="mb-1">
                    <b>Location:</b> {job.location}
                  </p>
                  <p className="mb-1">
                    <b>Salary:</b> {job.salary}
                  </p>
                  <p className="mb-1">
                    <b>Experience:</b> {job.experience}
                  </p>
                  <p className="mb-1">
                    <b>Job Type:</b> {job.job_type}
                  </p>
                  <p className="text-secondary flex-grow-1">
                    {job.description}
                  </p>
                  {appliedJobs.includes(job.id) ? (
                    <div className="alert alert-success mb-0 mt-2">
                      Job applied successfully
                    </div>
                  ) : selectedJobId === job.id ? (
                    <form
                      className="mt-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleApply(job.id);
                      }}
                    >
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Full Name"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        required
                      />
                      <input
                        type="email"
                        className="form-control mb-2"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        type="tel"
                        className="form-control mb-2"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <button type="submit" className="btn btn-success me-2">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setSelectedJobId(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      className="btn btn-primary align-self-start"
                      onClick={() => openForm(job.id)}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Jobs;