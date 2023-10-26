import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LocaleContext from '../contexts/LocaleContext'

function Navigation() {
  const{locale} = useContext(LocaleContext);

  return (
    <div className="navigation">
        <ul>
            <li><Link to='/archives'>{locale === 'id' ? 'Terarsip' :  'archived'}</Link></li>
        </ul>
    </div>
  )
}

export default Navigation