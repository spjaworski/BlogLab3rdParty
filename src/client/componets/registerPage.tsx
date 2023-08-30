import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {



    const [givenUsername, setGivenUsername] = useState('');
    const [givenPassword, setGivenPassword] = useState('');


    useEffect(() => {
        async function newRegister() {
            try {
                const res = await fetch(`/auth/register`);
                console.log(res);
                const loginRes = await res.json();

                if (res.ok) {
                    return redirect('/');

                } else {
                    alert("Login Router Reached, Log in Failed");
                }
            } catch (error) {
                alert("Error, check console");
                console.error(error);
            }
        }
        // newRegister();
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!givenUsername || !givenPassword) {
            Swal.fire({
                title: "Register failed, both a username and a password are required",
                icon: 'error',
                confirmButtonText: 'Continue'
            })
        }


        if (Error) {
            Swal.fire({
                title: "Register failed, please check that both fields are filled out and spelled correctly",
                icon: 'error',
                confirmButtonText: 'Continue'
            })
            console.log('[error]', Error);
        } else {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ givenUsername, givenPassword })
            });
            const loginResponse = await res.json();
            console.log(loginResponse);
            Swal.fire({
                title: "Logged in!",
                icon: 'success',
                confirmButtonText: 'Continue'
            })
            setGivenPassword('');
            return redirect('/');

        }
    }


    return (
        <div className='container p-4'>
            {/* <div className='row mt-5 justify-content-center'>
                <div className='col-md-6'>
                    <div className='p-3 border rounded-lg justify-content-center'> Register</div>
                    <form className='form-group p-3 border rounded-lg'>
                        <label>New Username</label>
                        <input type='text' value={givenUsername} onChange={e => setGivenUsername(e.target.value)} className="form-control p-2" />
                        <label>Password</label>
                        <input type='text' value={givenPassword} onChange={e => setGivenPassword(e.target.value)} className="form-control p-2" />
                        <button disabled={!givenUsername || !givenPassword} onClick={handleSubmit} className='btn btn-primary'>Log in</button>
                    </form>

                </div>
            </div> */}
            <div className='row mt-5 justify-content-center'>
                <div className='col-md-6'>
                    <div className='p-3 border rounded-lg justify-content-center bg-dark text-center'> Register</div>
                    <form className='form-group p-3 border rounded-lg bg-light'>
                        <label>Email</label>
                        <input type='text' value={givenUsername} onChange={e => setGivenUsername(e.target.value)} className="form-control p-2" />
                        <label>Password</label>
                        <input type='text' value={givenPassword} onChange={e => setGivenPassword(e.target.value)} className="form-control p-2" />


                        <button disabled={!givenUsername || !givenPassword} onClick={handleSubmit} className='btn btn-primary m-2'>Log in</button>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default RegisterPage;


