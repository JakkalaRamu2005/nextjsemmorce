import React from 'react'


const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading:{
    fontSize: '36px',
    marginBottom: '20px',
    color: '#ff0000',
  }
}
const notfound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Not Found Page</h1>
      <p>The page you are looking for does not exist.</p>
      {/* <button onClick={() => window.location.href = '/'}>Go to Home</button> */}
    </div>
  )
}

export default notfound
