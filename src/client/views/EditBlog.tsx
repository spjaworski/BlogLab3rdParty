import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../componets/blogCard';
import { IBlog } from '../../types';



const EditBlog = () => {
    const nav = useNavigate();
    const [blog, setBlog] = useState<IBlog>();
    const [content, setContent] = useState("");
    const { id } = useParams();




    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await fetch(`/api/blogs/${id}/edit`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, content })
        });

        const data = await res.json();

        if (res.ok) {

            Swal.fire({
                title: 'Edited Blog',
                icon: 'success',
                confirmButtonText: 'Continue'
            }).then(() => {
                nav(`/blogs/${id}`)
            })
            setContent("");
        } else {
            alert("Error, check console");
            console.log(`Error, could not edit Blog \n ${data.message}`);
        }

    }

    async function DeleteBlog(id: string | undefined) {

        const res = await fetch(`/api/blogs/${id}`, {
            method: 'delete'
        });

        if (res.ok) {

            Swal.fire({
                title: 'blog deleted',
                icon: 'success',
                confirmButtonText: 'Continue'
            }).then(() => {
                nav('/blogs')
            })


        } else {
            console.log(`Error, could not delete blog \n ${Error}`);
        }

    }

    useEffect(() => {
        async function getSingleBlog() {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                console.log(res);
                const blog = await res.json();

                if (res.ok) {
                    setBlog(blog);
                    // setContent(blog.content);
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
        <div className='row justify-content-center'>
            <div className='col-12 col-md-8'>
                <form className='p-2 shadow-md'>
                    {blog && <BlogCard blog={blog} />}
                    <label>Blog Text</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} className='form-control' />
                    <button disabled={!content} onClick={handleSubmit} className="btn btn-success m-3">
                        Submit Edit
                    </button>
                    <button onClick={() => nav(`/blogs/${id}`)} className="btn btn-warning m-1" >Go Back</button>
                    <div onClick={() => { DeleteBlog(id) }} className='btn btn-danger m-1'>Delete Blog</div>

                </form>

                {/* <button onClick={() => { DeleteBlog(id) }} className='btn btn-danger m-1'>Delete Blog</button> */}

            </div>
        </div>
    )

};


export default EditBlog;