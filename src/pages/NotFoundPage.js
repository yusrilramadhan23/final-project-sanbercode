import React from 'react'
import LocaleContext from '../contexts/LocaleContext'

function NotFoundPage() {
  return (
    <LocaleContext.Consumer>
      {({locale}) => (
        <div className='detail-page'>
          <div className="not-found-page">
            <h2 className="not-found-page__title">404</h2>
            <p className="not-found-page__body">{locale === 'id' ? 'Halaman tidak ditemukan' : 'Page not found'}</p>
          </div>
        </div>
      )}
    </LocaleContext.Consumer>
  )
}

export default NotFoundPage
