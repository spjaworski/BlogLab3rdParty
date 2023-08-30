import * as React from 'react';
import { useEffect, useState } from 'react';
// import blogs from '../../server/database/blogs';
import { IBlog } from '../../types';
import BlogCard from '../componets/blogCard';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const nav = useNavigate();

    useEffect(() => {
        async function getBlogs() {
            try {
                const res = await fetch('/api/blogs');
                console.log(res)
                const blogs = await res.json();

                if (res.ok) {
                    setBlogs(blogs);
                } else {
                    alert(blogs.message);
                }
            } catch (error) {
                alert("Error, check console");
                console.error(error);
            }
        }
        getBlogs();
    }, [])

    return (
        <div className='container p-1'>
            {/* <span className='justify-content-center'>
                <button onClick={() => nav(`/create/`)} className="btn btn-success m-1 p-2">Create a Blog</button>
            </span> */}
            <div className="row justify-content-center">
                {blogs.map(b => (
                    <BlogCard key={`blog-card-${b.id}`} blog={b} />
                ))}
            </div>
        </div>
    )

}

export default Blogs;

