import { useActivities } from '../hooks/useActivities';

export default function Explore() {
  const { data: activities = [], isLoading } = useActivities();

  return (
    <section className="space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold">Explore Activities</h1>
        <p className="opacity-90">Find buddies and groups — deep blue edition 💙</p>
      </header>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card h-64 animate-pulse" />
          <div className="card h-64 animate-pulse" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {activities.map((a, idx) => (
            <article key={a.id || `activity-${idx}`} className="card p-0 overflow-hidden">
              {a.image && <img src={a.image} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="opacity-80 text-sm">{a.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.tags?.map((t) => (
                    <span key={`${a.id}-${t}`} className="px-2 py-0.5 rounded bg-white/10 text-xs">#{t}</span>
                  ))}
                </div>
                <button className="btn-primary mt-4 w-full">Join Activity</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}