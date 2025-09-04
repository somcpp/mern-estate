import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../redux/auth/authSlice";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const fileRef = useRef(null);
  const userInfo = useSelector(selectUserInfo);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Profile</h1>
      <form className="flex flex-col gap-4">
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
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
