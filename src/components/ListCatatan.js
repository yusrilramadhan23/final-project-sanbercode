import React, { useContext } from 'react'
import ItemCatatan from './ItemCatatan'
import PropTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContext'

function ListCatatan({notes}) {
  const{locale} = useContext(LocaleContext) 

  return (
    <div className="notes-list">
        {
            notes.length > 0 ? notes.map((note) => 
                <ItemCatatan key={note.id} note={note}/>
            ) :
            <div className="notes-list-empty">
               <p>{locale === 'id' ? 'Tidak ada catatan' : 'No notes'}</p> 
            </div>
        }
    </div>
  )
}

ListCatatan.propTypes = {
    notes : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ListCatatan