import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-primary border">
            <Link to="/" className="btn btn-lightBlue m-2 border">
                Home
            </Link>
            <Link to="/blogs" className='btn btn-lightBlue m-2 border'>
                Blogs
            </Link>
            <Link to="/create" className='btn btn-lightBlue m-2 border'>
                Create a Blog
            </Link>
            <Link to="/donate" className='btn btn-lightBlue m-2 border'>
                Donate
            </Link>
            <Link to="/email" className='btn btn-lightBlue m-2 border'>
                Contact us
            </Link>
            <Link to="/login" className='btn btn-primary border m-2 justify-content-right'>
                Log in
            </Link>
            <Link to="/register" className='btn btn-primary border m-2 justify-content-right'>
                Sign up
            </Link>
        </div>
    );
};

export default Navbar