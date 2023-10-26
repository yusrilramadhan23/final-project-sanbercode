import React from 'react'
import { Link } from 'react-router-dom'
import { showFormattedDate } from '../utils'
import parser from 'html-react-parser'
import PropTypes from 'prop-types'

function ItemCatatan({note}) {

    const {id, title, createdAt, body} = note
    return (
        <div className="note-item">
            <h3 className="note-item__title">
                <Link to={`/note/${id}`}>{title}</Link>
            </h3>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <div className="note-item__body">{parser(body)}</div>
        </div>
    )
}

ItemCatatan.propTypes = {
    note : PropTypes.object
}

export default ItemCatatan