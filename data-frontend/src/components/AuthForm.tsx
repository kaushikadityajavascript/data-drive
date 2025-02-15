import { useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (name: string, email: string, password: string) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold">{type === "login" ? "Login" : "Signup"}</h2>
      {type === "signup" && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border mt-2"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border mt-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border mt-2"
      />
      <button
        onClick={() => onSubmit(name, email, password)}
        className="bg-blue-500 text-white p-2 mt-4 w-full"
      >
        {type === "login" ? "Login" : "Signup"}
      </button>
    </div>
  );
};

export default AuthForm;
