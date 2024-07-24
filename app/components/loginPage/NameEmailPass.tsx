export default function NameEmailPass({
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    setLoginState,
  }: {
    name: string;
    email: string;
    password: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setLoginState: React.Dispatch<React.SetStateAction<number>>;
  }) {
    return (
      <>
        <h1>Join the adventure</h1>
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <button
            onClick={() => {
              if (name !== "" && email !== "" && password !== "") {
                setLoginState(1);
              }
            }}
          >
            Next
          </button>
        </div>
      </>
    );
  }
  