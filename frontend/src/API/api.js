// utils/api.js
export const fetchJobById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/talenthub/jobs`);
  if (!res.ok) throw new Error("Gagal fetch jobs");
  const data = await res.json();
  const job = data.jobs.find(j => j.job_id === parseInt(id));
  if (!job) throw new Error("Job tidak ditemukan");
  return job;
};

export const fetchCompanyByEmployerId = async (employer_id) => {
  const res = await fetch(`http://localhost:5000/api/talenthub/profiles`);
  if (!res.ok) throw new Error("Gagal fetch company profiles");
  const profiles = await res.json();
  return profiles.find(p => p.user_id === employer_id) || null;
};

export const fetchRelatedJobs = async (currentJobId) => {
  const res = await fetch(`http://localhost:5000/api/talenthub/jobs`);
  if (!res.ok) throw new Error("Gagal fetch jobs");
  const data = await res.json();
  return data.jobs.filter(j => j.job_id !== parseInt(currentJobId));
};
