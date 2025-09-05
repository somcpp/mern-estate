import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync, selectUserInfo, updateUserAsync,signoutUserAsync } from "../redux/auth/authSlice";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import CreateListing from "./createListing";
import { Link } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const userInfo = useSelector(selectUserInfo);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleFileUpload = async (file) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setFormData({ ...formData, avatar: downloadURL });
      console.log(formData)
      setError(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(true);
    }
  };
  const handleChange = async (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      console.log(formData);
      await dispatch(updateUserAsync({
        userData: formData,
        id: userInfo._id
      }));
      setLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  const handleDeleteUser = async () => {
    try{
      await dispatch(deleteUserAsync(userInfo._id));
    }catch(err){
      console.log(err)
    }
  }

  const handleSignOut = async () => {
    try{
      await dispatch (signoutUserAsync());
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleFileUpload(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || userInfo.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {error && (
          <p className="text-sm text-red-700 self-center">
            Error uploading image (must be less than 2MB)
          </p>
        )}

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={userInfo.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={userInfo.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
        disabled={loading}
        className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'update'}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
