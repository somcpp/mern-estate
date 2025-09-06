import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAsync,
  selectUserInfo,
  updateUserAsync,
  signoutUserAsync,
} from "../redux/auth/authSlice";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
import {
  getUserListingsAsync,
  selectUserListings,
  deleteListingAsync
} from "../redux/List/listSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  // Redux state
  const userInfo = useSelector(selectUserInfo);
  const userListings = useSelector(selectUserListings);

  // Local state
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListings, setShowListings] = useState(false);
  // === Handlers ===
  const handleFileUpload = async (file) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setFormData({ ...formData, avatar: downloadURL });
      setError(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setUpdateSuccess(false);

      await dispatch(
        updateUserAsync({
          userData: formData,
          id: userInfo._id,
        })
      );

      setUpdateSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteListing = async(id) => {
    try{
      await dispatch(deleteListingAsync(id));
      await dispatch(getUserListingsAsync(userInfo._id))
    }catch(error){
      console.log(error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUserAsync(userInfo._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await dispatch(signoutUserAsync());
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowListings = async () => {
    try {
      await dispatch(getUserListingsAsync(userInfo._id));
      setShowListings(true);
    } catch (err) {
      console.error(err);
    }
  };

  // === Render ===
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Profile</h1>

      {/* Profile Update Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Avatar Upload */}
        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileRef}
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />

        <img
          src={formData.avatar || userInfo.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {error && (
          <p className="text-sm text-red-700 self-center">
            Error uploading image (must be less than 2MB)
          </p>
        )}

        {/* User Fields */}
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
          defaultValue={userInfo.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          defaultValue={userInfo.email}
          onChange={handleChange}
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        {/* Update + Create Listing Buttons */}
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>

        <Link
          to="/create-listing"
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>

      {/* Account Actions */}
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

      {/* Success Message */}
      {updateSuccess && (
        <p className="text-green-500 mt-5 text-center">
          User updated successfully!
        </p>
      )}

      {/* Show Listings */}
      <button
        onClick={handleShowListings}
        className="text-green-700 w-full p-2 rounded-2xl bg-amber-300 text-center hover:cursor-pointer relative mx-auto mt-5"
      >
        Show Listings
      </button>

      {showListings && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>

              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                 className="text-red-700 uppercase hover:cursor-pointer">
                  Delete
                </button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
