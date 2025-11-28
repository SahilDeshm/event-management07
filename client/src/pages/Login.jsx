import { useState } from "react";
import InputField from "../components/UserInput.jsx";
import {useNavigate} from "react-router-dom";
import { loginAdmin } from "../api/admin.js";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data= await loginAdmin({username , password});
      console.log("json-webtoken"  , data.token);
      toast.success("Login successfully")
      navigate("/create-event")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>

        <InputField label="Username" type="text" value={username} onChange={setUsername} />
        <InputField label="Password" type="password" value={password} onChange={setPassword} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
         {loading ? "Login in  action..." :  "Login"}
        </button>
      </form>
    </div>
  );
}
