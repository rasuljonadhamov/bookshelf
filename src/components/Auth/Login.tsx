import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import { useLoginMutation } from "../../api/authApi";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = { email, secret };
      const response = await login(user).unwrap();
      dispatch(setCredentials({ key: response.key, secret: response.secret }));
    } catch (err) {
      console.error("Login error: ", err);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Secret
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={isLoading}
        >
          Login
        </button>
        <Link
          className="bg-green-400 mt-4 block text-center   w-full px-4 py-2 text-white rounded-md hover:opacity-65"
          to={"/register"}
        >
          Register
        </Link>
        {error && (
          <p className="mt-2 text-red-500">Login failed. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default Login;
