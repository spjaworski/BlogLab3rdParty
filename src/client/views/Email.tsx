import * as React from 'react';
import { useEffect, useState } from 'react';

const Email = () => {
    const [from, setFrom] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch('/api/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ from, subject, message })
        })
            .then(res => res.json())
            .then(result => console.log(result));
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-8'>
                    <form className='form-group p-3 shadow-md'>
                        <input value={from} onChange={e => setFrom(e.target.value)} className="form-control mb-3" />
                        <input value={from} onChange={e => setSubject(e.target.value)} className="form-control mb-3" />
                        <textarea value={message} onChange={e => setMessage(e.target.value)} className="form-control mb-3" />
                        <button onClick={handleSubmit} className="btn btn-primary">Send Email</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Email;