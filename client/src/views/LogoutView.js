import React from 'react'

const LogoutView = () => {
    const handleClick = () => {
        localStorage.removeItem('token')
        window.location.replace('/')
    }
    return (
        <div>
            <h1>Logout</h1>
            <button onClick={() => handleClick()}>Logout</button>
        </div>
    )
}

export default LogoutView;