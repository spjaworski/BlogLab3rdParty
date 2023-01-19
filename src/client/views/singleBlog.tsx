import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../componets/blogCard';
import { IBlog } from '../../types';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<IBlog>();
    const nav = useNavigate();

    // async function DeleteBlog(id: string | undefined) {
    //     const res = await fetch(`/api/blogs/${id}`, {
    //         method: 'delete'
    //     });

    //     if (res.ok) {

    //         Swal.fire({
    //             title: 'blog deleted',
    //             icon: 'success',
    //             confirmButtonText: 'Continue'
    //         }).then(() => {
    //             nav('/blogs')
    //         })


    //     } else {
    //         console.log(`Error, could not delete blog \n ${Error}`);
    //     }

    // }

    useEffect(() => {
        async function getSingleBlog() {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                console.log(res);
                const blog = await res.json();

                if (res.ok) {
                    setBlog(blog);
                } else {
                    alert(blog.message);
                }
            } catch (error) {
                alert("Error, check console");
                console.error(error);
            }
        }
        getSingleBlog();
    }, [id])

    return (
        <div className="row justify-content-center">
            {blog && <BlogCard blog={blog} isBlogDetailed />}
            {/* <button onClick={() => { DeleteBlog(id) }} className='btn btn-danger m-1'>Delete Blog</button> */}
        </div>
    )
};

export default SingleBlog;