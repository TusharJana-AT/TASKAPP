import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authAPI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
    name: z.string().max(20, "Too Big Name"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(3, "Password too short"),
});

function Register() {
    //   const [form, setForm] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //   });

    const { login } = useAuth();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({resolver:zodResolver(registerSchema)})

    const onSubmit = async(data) => {
        try {
            const res = await registerUser(datax);
            login(res.data.data);

            reset()
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center">Register</h2>

                <div>
                    <input
                        name="name"
                        placeholder="Name"
                        //   value={form.name}
                        //   onChange={handleChange}
                        {...register("name")}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        name="email"
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
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;
