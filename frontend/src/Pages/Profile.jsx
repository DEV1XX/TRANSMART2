import React, { useEffect, useState, useRef } from 'react';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [showEditPhotoModal, setShowEditPhotoModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const storedName = localStorage.getItem('name') || 'test13';
    const storedEmail = localStorage.getItem('email') || 'test13@gmail.com';
    const storedImageUrl = localStorage.getItem('profileImageUrl') || '';

    setName(storedName);
    setEmail(storedEmail);
    setProfileImageUrl(storedImageUrl);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setProfileImageUrl(imageUrl);
        localStorage.setItem('profileImageUrl', imageUrl);
      };
      reader.readAsDataURL(file);
    }
    setShowEditPhotoModal(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">

     

      {/* Profile Content */}
      <div className="flex-1 px-4 md:px-8 lg:px-16 m-9">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            {profileImageUrl ? (
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden">
                <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-24 w-24 md:h-32 md:w-32 bg-blue-300 dark:bg-blue-500 rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold text-white">
                {name ? name.charAt(0).toUpperCase() : 'T'}
              </div>
            )}
            
            {/* Edit profile photo button */}
            <button 
              onClick={() => setShowEditPhotoModal(true)}
              className="absolute bottom-0 right-0 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mt-4">{name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-2">Account Information</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Email: {email}</p>
        
        </div>
      </div>

      {/* Change Profile Photo Modal */}
      {showEditPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Change Profile Picture</h3>
            <div className="flex flex-col items-center mb-4">
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Current Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
              ) : (
                <div className="w-32 h-32 bg-blue-300 dark:bg-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4">
                  {name ? name.charAt(0).toUpperCase() : 'T'}
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleProfileImageChange} 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                onClick={triggerFileInput}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Upload Photo
              </button>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowEditPhotoModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleProfileImageChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default Profile;
