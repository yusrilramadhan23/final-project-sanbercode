import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LocaleContext from '../contexts/LocaleContext'
import useInput from '../hooks/useInput'
import { register } from '../utils/network-data'

function RegisterPage() {
  const[name, onNameChangeHandler] = useInput('')
  const[email, onEmailChangeHandler] = useInput('')
  const[password, onPasswordChangeHandler] = useInput('')
  const[confirmPassword, onConfirmPasswordHandler] = useInput('')
  const navigate = useNavigate();

  async function onSubmitHandler(event){
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Pastikan password sesuai!')
      return
    }
    const data = {name, email, password}
    const { error } = await register(data)
    if (!error) {
       navigate('/')
    }
  }

  return (
    <LocaleContext.Consumer>
        {({locale}) => (
            <div className='register-page'>
                <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register account.'}</h2>
                <form className="input-register" onSubmit={onSubmitHandler}>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={onNameChangeHandler}
                    />
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
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        value={confirmPassword} 
                        onChange={onConfirmPasswordHandler}
                    />
                    <button type="submit">Register</button>
                </form>
                <p>{locale === 'id' ? 'Sudah punya akun ?' : 'Already have an account ?' }<Link to="/"> {locale === 'id' ? 'Login di sini' : 'Login here'}</Link>
            </p>
            </div>
        )}
    </LocaleContext.Consumer>
  )
}

export default RegisterPage