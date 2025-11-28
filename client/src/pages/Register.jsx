import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/UserInput.jsx";
import { registerAdmin } from "../api/admin.js";
import toast from "react-hot-toast";


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const data = await registerAdmin({username , password}) ;
    console.log(data);
    toast.success("Registeration done ")
    setUsername("");
    setPassword("");
    navigate('/create-event');
  } catch (error) {
    toast.error(error.response?.data?.message || "Registeration failed")
  }
  finally{
    setLoading(false);
  }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl text-center font-semibold mb-6">Register</h2>

        <InputField label="Username" type="text" value={username} onChange={setUsername} />
        <InputField label="Password" type="password" value={password} onChange={setPassword} />

        <button
          type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
        {loading ? "Registering..." : "Register "}
        </button>
      </form>
    </div>
  );
}
