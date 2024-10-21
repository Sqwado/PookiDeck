
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BackBtn = () => {
    return (
        <button onClick={() => window.history.back()} className="text-black dark:text-white text-xl font-semibold flex items-center justify-center 
        p-2 rounded-lg w-max">
            <FaArrowLeft className="inline-block mr-2" />
        </button>
    );
}

export default BackBtn;
