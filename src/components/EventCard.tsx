// A pretty activity card with cover image + tags + join button
import { EventItem } from '../lib/demoData';
import { Link } from 'react-router-dom';

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card overflow-hidden group">
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={event.cover}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <p className="text-sm opacity-80 line-clamp-2">{event.about}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {event.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="text-xs opacity-80">
            {event.location ? `📍 ${event.location}` : 'Online / TBA'}
          </div>
          <Link to={`/groups?event=${event.id}`} className="btn-primary">Join Group</Link>
        </div>
      </div>
    </article>
  );
}
