import React from 'react'

const login = () => {
  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder='Email' required />
        <input type="password" name="password" placeholder='Password' required />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default login
