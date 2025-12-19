export default function JobDetailFooter({ job }) {
  const formattedDeadline = job.deadline
    ? new Date(job.deadline).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Belum ditentukan";

  return (
    <div className="border-t mt-6 pt-4 text-sm text-gray-600">
      <p><strong>Deadline:</strong> {formattedDeadline}</p>
      <p><strong>Rekruter aktif:</strong> {job.recruiterLastAccess || "Belum diketahui"}</p>
    </div>
  );
}
