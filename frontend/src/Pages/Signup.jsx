import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Camera, Upload, User } from "lucide-react";
import uploadImage from "../utils/uploadImage";

const Signup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const onSubmit = async (data) => {
    console.log("Submitted data:", data);
    setIsUploading(true);
    
    try {
      // First, upload the profile image if one was selected
      let profileImageUrl = null;
      if (profileImage) {
        const imageResponse = await uploadImage(profileImage);
        profileImageUrl = imageResponse.imageUrl || ""; // Assuming the API returns an imageUrl property
      }
      
      // Then register the user with the image URL
      const userData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        profileImageUrl,
      };
      
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, userData);
      console.log("Signup successful:", response.data);
      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token",token);
      }
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error("Signup error:", error.response.data.message);
        // Optionally: toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error:", error.message);
        // Optionally: toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Picture Upload */}
          <div className="mb-6 flex flex-col items-center">
            <label className="block text-sm font-medium mb-2 text-center">Profile Picture</label>
            <div 
              className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-blue-500 hover:border-blue-600 transition-all"
              onClick={triggerFileInput}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <User size={40} className="mb-1" />
                  <Camera size={24} className="text-blue-500" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-xs text-gray-600 mt-2 flex items-center">
              <Upload size={14} className="mr-1" />
              Click to upload
            </p>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              {...register("fullName", {
                required: "Name is required!",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              {...register("password", {
                required: "Password is required!",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-md hover:bg-blue-600 transition font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUploading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline ml-1 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;