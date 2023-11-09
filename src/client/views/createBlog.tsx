import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Select, { MultiValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import Createable, { useCreatable } from 'react-select/creatable';
import { ITag } from '../../types';



// const options = [
//     { value: 1, label: 'Tabletop' },
//     { value: 2, label: 'Literature' }
// ]

type Options = MultiValue<{
    value: number;
    label: string;
    __isNew__?: boolean;
}>

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const nav = useNavigate();
    const [options, setOptions] = useState<Options>([]);
    const [selectedOptions, setSelectedOptions] = useState<Options>([]);




    useEffect(() => {
        async function getTags() {
            try {
                const res = await fetch(`/api/tags/`);
                console.log(res);
                const data = await res.json();
                if (res.ok) {
                    const tags: ITag[] = [...data]
                    const tempOptions = tags.map(t => (

                        {
                            value: t.id, label: t.name
                        }

                    ))
                    setOptions(tempOptions)
                } else {
                    alert(data.message)
                }
            } catch (error) {
                alert("Error, check console");
                console.error(error);
            }
        }
        getTags();
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const tagIDs: number[] = [];
        const createdTags: string[] = [];

        for (let i = 0; i < selectedOptions.length; i++) {
            const item = selectedOptions[i];
            if (item.__isNew__) {
                createdTags.push(item.label);
            } else {
                tagIDs.push(item.value)
            }
        }

        const res = await fetch('/api/blogs', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, tagIDs, createdTags })
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                title: "Created a new Blog!",
                icon: 'success',
                confirmButtonText: 'Continue'
            })
            setTitle("");
            setContent("");
        } else {
            alert("Error, check console")
            console.log(`Error, could not create blog \n ${data.message}`);
        }
    };

    return (
        <div className='container'>
            <div className='col-12'>
                <form className='p-2 shadow-md'>
                    <label>What would you like to call your new blog?</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className='form-control' />
                    <label>Blog Content</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} className="form-control" />
                    <label>Tags</label>
                    <Createable isMulti options={options} value={selectedOptions} onChange={e => setSelectedOptions(e)} />
                    <button disabled={!title || !content} onClick={handleSubmit} className="btn btn-success m-2">
                        Create Blog
                    </button>
                    <button onClick={() => nav(`/blogs`)} className="btn btn-warning m-1" >Go Back</button>
                </form>
            </div>
        </div>
    );

}

export default CreateBlog;