import RelatedJobCard from "./RelatedJobCard";

export default function Sidebar({ job, relatedJobs, navigate }) {
  return (
    <aside className="w-full lg:w-1/3 flex flex-col gap-6">
      {job.benefit_perusahaan?.length > 0 && (
        <div className="border p-4 rounded-2xl bg-white">
          <h4 className="font-semibold text-lg mb-3">Benefit Perusahaan</h4>
          <div className="flex flex-wrap gap-2">
            {job.benefit_perusahaan.map((b, i)  => (
              <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{b}</span>
            ))}
          </div>
        </div>
      )}

      {relatedJobs.length > 0 && (
        <div className="border p-4 rounded-2xl bg-white">
          <h4 className="font-semibold text-lg mb-3">Loker Serupa</h4>
          {relatedJobs.slice(0, 6).map((related) => (
            <RelatedJobCard key={related.id} related={related} navigate={navigate} />
          ))}
        </div>
      )}
    </aside>
  );
}
