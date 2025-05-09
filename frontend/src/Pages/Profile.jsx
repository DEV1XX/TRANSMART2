import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const storedName = localStorage.getItem('name') || 'Guest';
    const storedEmail = localStorage.getItem('email') || 'No email found';
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];

    setName(storedName);
    setEmail(storedEmail);
    setCategories(storedCategories);
  };

  return (
    <div className='flex justify-center flex-col'>
      <div className='flex justify-center flex-col items-center'>
        <div className='h-[15vh] w-[15vh] bg-blue-300 text-3xl rounded-full flex justify-center items-center'>
          {name.charAt(0).toUpperCase()}
        </div>
        <div className='text-2xl dark:text-white mt-4'>{name}</div>
      </div>

      <div className='text-xl md:text-2xl p-6 dark:text-white'>
        Your Categories:
        <div className='flex flex-wrap mt-2'>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index} className='bg-slate-300 dark:bg-slate-700 pl-2 pr-2 dark:text-white rounded-md flex items-center m-2 text-sm md:text-base py-1 md:py-2'>
                {category}
                <div className='bg-slate-500 dark:bg-slate-900 rounded-full h-5 w-5 md:h-6 md:w-6 flex justify-center items-center ml-2 hover:scale-110'>
                  <button>
                    <CloseIcon style={{ fontSize: '12px' }} className='md:text-sm' />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No categories added.</p>
          )}
        </div>

        <div>
          <button className='bg-blue-500 dark:text-white dark:hover:bg-slate-700 hover:scale-110 rounded-md p-2 text-base m-5 ml-0'>
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
