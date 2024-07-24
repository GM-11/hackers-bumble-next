import { Gender, Os, Role } from "@/app/lib/utils/types";

export default function RoleOsGender({
  os,
  role,
  gender,
  setOs,
  setRole,
  setGender,
  setLoginState,
}: {
  os: Os;
  role: Role;
  gender: Gender;
  setOs: React.Dispatch<React.SetStateAction<Os>>;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  setGender: React.Dispatch<React.SetStateAction<Gender>>;
  setLoginState: React.Dispatch<React.SetStateAction<number>>;
}) {
  const roles = Object.values(Role);
  const oss = Object.values(Os);
  const genders = Object.values(Gender);
  return (
    <>
      <p>
        Select your <strong>Role</strong>
      </p>
      <select
        name="Roles"
        value={role}
        onChange={(e) => {
          const val = e.target.value;
          if (val !== Role.NOT_SELECTED) {
            setRole(val as Role);
          }
        }}
      >
        {roles.map((role) => {
          if (role === Role.NOT_SELECTED) {
            return (
              <option key={roles.indexOf(role)} value={role} disabled>
                {role}
              </option>
            );
          }
          return (
            <option key={roles.indexOf(role)} value={role}>
              {role}
            </option>
          );
        })}
      </select>

      <p>
        Select your <strong>OS</strong>
      </p>

      <select
        name="OS"
        value={os}
        onChange={(e) => {
          const val = e.target.value;
          if (val !== Os.NOT_SELECTED) {
            setOs(val as Os);
          }
        }}
      >
        {oss.map((o) => {
          if (o === Os.NOT_SELECTED) {
            return (
              <option key={oss.indexOf(o)} value={o} disabled>
                {o}
              </option>
            );
          }
          return (
            <option key={oss.indexOf(o)} value={o}>
              {o}
            </option>
          );
        })}
      </select>

      <p>
        Select your <strong>Gender</strong>
      </p>

      <select
        name="Genders"
        value={gender}
        onChange={(e) => {
          const val = e.target.value;
          if (val !== Gender.NOT_SELECTED) {
            setGender(val as Gender);
          }
        }}
      >
        {genders.map((gender) => {
          if (gender === Gender.NOT_SELECTED) {
            return (
              <option key={genders.indexOf(gender)} value={gender} disabled>
                {gender}
              </option>
            );
          }
          return (
            <option key={genders.indexOf(gender)} value={gender}>
              {gender.toUpperCase()}
            </option>
          );
        })}
      </select>

      <div className="flex w-full justify-evenly">
        <button onClick={() => setLoginState((curr) => curr - 1)}>Back</button>
        <button onClick={() => setLoginState((curr) => curr + 1)}>Next</button>
      </div>
    </>
  );
}
