import { Lang } from "@/app/lib/types";

export default function Bio({
  bio,
  langs,
  setBio,
  setLangs,
  setLoginState,
  submit,
  
}: {
  bio: string;
  langs: Lang[];
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setLangs: React.Dispatch<React.SetStateAction<Lang[]>>;
  setLoginState: React.Dispatch<React.SetStateAction<number>>;
  submit: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const prog_langs = Object.values(Lang);
  return (
    <>
      <p>
        Add your <strong>Languages</strong>
      </p>

      <section className="flex">
        {langs.map((lang) => (
          <button
            onClick={() => {
              setLangs(langs.filter((l) => l !== lang));
            }}
            className="mx-2"
            key={langs.indexOf(lang)}
          >
            {lang}
          </button>
        ))}
      </section>

      <select
        name="Languages"
        value={langs[langs.length - 1]}
        onChange={(e) => {
          const val = e.target.value;

          if (val !== Lang.NOT_SELECTED) {
            setLangs([...langs, val as Lang]);
          }
        }}
      >
        {prog_langs.map((lang) => {
          if (lang === Lang.NOT_SELECTED) {
            return (
              <option key={prog_langs.indexOf(lang)} value={lang} disabled>
                {lang}
              </option>
            );
          }
          return (
            <option key={prog_langs.indexOf(lang)} value={lang}>
              {lang}
            </option>
          );
        })}
      </select>

      <p>
        Add your <strong>Bio</strong>
      </p>

      <textarea
        placeholder="Bio"
        value={bio}
        className="p-4 border border-gray-500 rounded-lg w-full my-2"
        minLength={10}
        onChange={(e) => setBio(e.target.value.trim())}
      />

      <div className="flex w-full justify-evenly">
        <button onClick={() => setLoginState((curr) => curr - 1)}>Back</button>
        <button onClick={submit}>Submit</button>
      </div>
    </>
  );
}
