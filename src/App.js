import React, { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import AuthUserContext from './contexts/AuthUserContext'
import ChangeThemeContext from './contexts/ChangeThemeContext'
import LocaleContext from './contexts/LocaleContext'
import AddPageWrapper from './pages/AddPage'
import ArsipPageWrapper from './pages/ArsipPage'
import DetailPageWrapper from './pages/DetailPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import { getUserLogged, putAccessToken } from './utils/network-data'

function App() {
  const[locale, setLocale] = useState(() => localStorage.getItem('locale') || 'id')
  const[theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const[authUser, setAuthUser] = useState(null)
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem('locale',locale)
  }, [locale])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  },[theme])

  useEffect(() => {
    async function initAuthed() {
      const { data } = await getUserLogged()
      setAuthUser(data)
      setLoading(false)
    }
    initAuthed()
    return () => {
      setAuthUser('')
      setLoading('')
    }
  }, [])

  const onLogin = async ({ accessToken }) => {
    putAccessToken(accessToken)
    const { data } = await getUserLogged()
    setAuthUser(data)
  }

  const Logout = () => {
    setAuthUser(null)
    putAccessToken('')
  }

  const authUserContextValue = useMemo(() => (
    { authUser, setAuthUser, Logout }
  ), [authUser])

  const toggleLocale = () => setLocale((prevState) => (prevState === 'id' ? 'en' : 'id'))
  const toggleTheme = () => setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'))
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme])
  const localeContextValue = useMemo(() => ({ locale, toggleLocale }), [locale])

  const render = () => {
    if(loading){
      return(
        <div>Loading ...</div>
      )
    }

    if(authUser === null){
      return (
        <AuthUserContext.Provider value={authUserContextValue}>
          <ChangeThemeContext.Provider value={themeContextValue}>
            <LocaleContext.Provider value={localeContextValue}>
              <div className="app-container">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<LoginPage Login={onLogin} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
              </div>
            </LocaleContext.Provider>
          </ChangeThemeContext.Provider>
        </AuthUserContext.Provider>
      )
    }

    return (
      <AuthUserContext.Provider value={authUserContextValue}>
        <ChangeThemeContext.Provider value={themeContextValue}>
          <LocaleContext.Provider value={localeContextValue}>
            <div className="app-container">
              <Header />
              <div>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/note/new" element={<AddPageWrapper />} />
                  <Route path="/archives" element={<ArsipPageWrapper />} />
                  <Route path="/note/:id" element={<DetailPageWrapper />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>              
          </LocaleContext.Provider>
        </ChangeThemeContext.Provider>
      </AuthUserContext.Provider>
    )
  }

  return render()
}

export default App
