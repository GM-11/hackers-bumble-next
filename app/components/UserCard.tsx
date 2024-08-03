import { Role, Os, Lang } from "../lib/types";

type u = {
  id: any;
  name: string;
  email: string;
  role: Role[];
  os: Os;
  langs: Lang[];
  gender: string;
};

function UserCard({ match }: { match: u }) {
  const langs = match.langs;
  return (
    <div className="border border-primary w-min m-4">
      <h2>{match.name}</h2>
      <p>{match.role}</p>
      <p>{match.os}</p>
      <section className="flex">
        {langs.map((l) => (
          <p key={langs.indexOf(l)} className="mr-2">
            {l}
          </p>
        ))}
      </section>
    </div>
  );
}

export default UserCard;
