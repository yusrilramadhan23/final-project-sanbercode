import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import LocaleContext from '../contexts/LocaleContext'
import AuthUserContext from '../contexts/AuthUserContext'
import ChangeThemeContext from '../contexts/ChangeThemeContext'

import * as BSMoonLight from 'react-icons/bs'
import * as BSSun from 'react-icons/bs'
import * as IOExit from 'react-icons/io'
import * as MDTranslate from 'react-icons/md'

function Header() {
  const{locale, toggleLocale} = useContext(LocaleContext)
  const{authUser, Logout} = useContext(AuthUserContext)
  const{theme, toggleTheme} = useContext(ChangeThemeContext)

  return (
    <header>
        <h1><Link to='/'>{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
        {authUser ?<Navigation /> : ''}
        <button className='btnToggle-locale' onClick={toggleLocale}>{locale === 'id' ? <MDTranslate.MdGTranslate /> : <MDTranslate.MdGTranslate />}</button>
        <button className='btnToggle-theme' onClick={toggleTheme}>{theme === 'light' ? <BSMoonLight.BsMoon /> : <BSSun.BsSun/>}</button>
        {authUser ? (
          <button className='btn-logout' onClick={Logout}><IOExit.IoMdExit/> {authUser.name}</button>
        ) : ''}
    </header> 
  )
}

export default Header