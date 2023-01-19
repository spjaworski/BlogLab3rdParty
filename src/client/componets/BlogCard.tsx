import * as React from 'react';
import { IBlog } from '../../types';
import { NewBlog } from '../../types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import blogs from '../../server/database/blogs';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog, isBlogDetailed }: BlogCardProps) => {
    const nav = useNavigate();
    return (
        <div className="shadow-lg m-4 p-4">
            <div className="card m-2">
                <Link style={{ textDecoration: "none" }} to={`/blogs/${blog.id}`}>
                    <div className="card-title text-center bg-primary text-light m-2 p-2">
                        <span className='m-2'>{blog.title}</span>
                    </div>
                </Link>
                {isBlogDetailed && <div className='row'>
                    <span className='text-center m-1'>{blog.content}</span>
                    <span className="text-center m-1">
                        {blog.tags}
                    </span>
                    <span className='justify-content-end'>
                        <Link to={`/blogs/${blog.id}/edit`}>
                            <button className='btn btn-warning m-1 p-2 col-2 justify-content-end'>Edit</button>
                        </Link>
                    </span>
                    <span className='justify-content-end'>
                        <button onClick={() => nav(`/blogs`)} className="btn btn-warning m-1 p-2 col-2" >Go Back</button>
                    </span>
                </div>}
            </div>

        </div>

    )
}

interface BlogCardProps {
    blog: IBlog;
    isBlogDetailed?: boolean;
}

export default BlogCard;