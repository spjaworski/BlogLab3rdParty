import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-primary">
            <Link to="/" className="btn btn-light m-2">
                Home
            </Link>
            <Link to="/blogs" className='btn btn-light m-2'>
                Blogs
            </Link>
            <Link to="/create" className='btn btn-light m-2'>
                Create a Blog
            </Link>
            <Link to="/donate" className='btn btn-light m-2'>
                Donate
            </Link>
        </div>
    );
};

export default Navbar