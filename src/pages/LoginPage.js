import React from 'react'
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput'
import { login } from '../utils/network-data';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function LoginPage({Login}) {
  const[email, onEmailChangeHandler] = useInput('')
  const[password, onPasswordChangeHandler] = useInput('')
  
  async function onSubmitHandler(event){
    event.preventDefault()
    const { error, data } = await login({ email, password })
    if (!error) {
        Login(data)
    }
  }

  return (
    <LocaleContext.Consumer>
        {({locale}) => (        
            <div className='login-container'>
                <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Login to use app, please.'}</h2>
                <form className="input-login" onSubmit={onSubmitHandler}>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={onEmailChangeHandler}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={onPasswordChangeHandler}
                    />
                    <button type="submit">Login</button>
                </form>
                <p>{locale === 'id' ? 'Belum punya akun?' : "Don't have an account? "}<Link to="/register">{locale === 'id' ? 'Daftar di sini' : 'Register here'}</Link></p>
            </div>
        )}
    </LocaleContext.Consumer>
  )
}

LoginPage.propTypes = {
    Login: PropTypes.func.isRequired,
};

export default LoginPage