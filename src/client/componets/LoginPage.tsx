import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api-service';




const LoginPage = () => {

    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // useEffect(() => {
    //     apiService('/auth/login').then(data => console.log(data))

    //     // async function loggingIn() {
    //     //     try {
    //     //         const res = await fetch(`/auth/login`);
    //     //         console.log(res);
    //     //         const loginRes = await res.json();

    //     //         if (res.ok) {
    //     //             return redirect('/');

    //     //         } else {
    //     //             alert("Login Router Reached, Log in Failed");
    //     //         }
    //     //     } catch (error) {
    //     //         alert("Error, check console");
    //     //         console.error(error);
    //     //     }
    //     // }
    //     // loggingIn();
    // }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        apiService('/auth/login', 'POST', { email, password }).then(data => console.log(data))
            .then(token => console.log(token))
            .catch(() =>
                Swal.fire({
                    title: "Log in failed, please check that both fields are filled out and spelled correctly",
                    icon: 'error',
                    confirmButtonText: 'Continue'
                }));




        if (!email || !password) {
            Swal.fire({
                title: "Log in failed, both a username and a password are required",
                icon: 'error',
                confirmButtonText: 'Continue'
            })
            // } else if (Error) {
            //     Swal.fire({
            //         title: "Log in failed, please check that both fields are filled out and spelled correctly",
            //         icon: 'error',
            //         confirmButtonText: 'Continue'
            //     })
            //     console.log('[error]', Error);
        } else {
            // const res = await fetch('/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: givenUsername, password: givenPassword })
            // });
            // const loginResponse = await res.json();
            // console.log(loginResponse);
            Swal.fire({
                title: "Logged in!",
                icon: 'success',
                confirmButtonText: 'Continue'
            })
            setPassword('');
            // return redirect('');
            nav("/");

        }
    }


    return (
        <div className='container p-4'>

            <div className='row mt-5 justify-content-center'>
                <div className='col-md-6'>
                    <div className='p-3 border rounded-lg bg-dark text-center'>Log in:</div>
                    <form className='form-group p-3 border rounded-lg bg-light'>
                        <label>Email</label>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} className="form-control p-2" />
                        <label>Password</label>
                        <input type='text' value={password} onChange={e => setPassword(e.target.value)} className="form-control p-2" />


                        <button disabled={!email || !password} onClick={handleSubmit} className='btn btn-primary m-2'>Log in</button>
                    </form>

                </div>
            </div>
        </div>
    )

}


// interface LoginProps { };

export default LoginPage;


