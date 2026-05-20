import React from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(3, "Password too short"),
});

function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

  const { login } = useAuth();
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      login(res.data.data);

      reset();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(form);
//       login(res.data.data);
//       // console.log(res.data);
//       setForm({
//         email: "",
//         password: "",
//       });
//       navigate('/')
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <input
          name="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting?"Logging In...":"Login"}
        </button>

        <Link to={"/register"}>Not Registered ? Register First</Link>
      </form>
    </div>
  );
}

export default Login;
