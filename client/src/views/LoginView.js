import React, { useState } from 'react'

const LoginView = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    console.log(table)
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('username', formData?.username);
        data.append('password', formData?.password);
        fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            body: data,
        })
            .then(res => {
                res.json().then(res => {
                    if (res.token) {
                        localStorage.setItem('token', res.token)
                        window.location.replace('/')
                    }
                })
            })
            .catch(err => {
                console.log('Network error')
            })
    }
    return (
        <div>
            <h1>LoginView</h1>
            <form
            method='post'
                ref={formData}
                onSubmit={e => handleSubmit(e)}
            >
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData?.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData?.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginView;