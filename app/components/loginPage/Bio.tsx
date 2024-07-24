export default function Bio({
  bio,
  setBio,
  setLoginState,
}: {
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setLoginState: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
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
        <button>Submit</button>
      </div>
    </>
  );
}
