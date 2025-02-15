import AuthForm from "../components/AuthForm";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (name: string, email: string, password: string) => {
    try {
      await signup(name, email, password);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
        console.log(error);
      alert("Signup failed");
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
};

export default Signup;
