// apps/frontend/src/components/MemberList.tsx
export default function MemberList({ members = [] as string[] }) {
  const list = members.length ? members : ['Alice', 'Bob', 'Charlie'];
  return (
    <div className="card p-3">
      <div className="font-semibold mb-2">Members</div>
      <ul className="space-y-1">
        {list.map((m) => (
          <li key={m} className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-400 rounded-full" />
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
