import React from 'react'
import { showFormattedDate } from '../utils'
import parser from 'html-react-parser'
import ButtonCatatan from './ButtonCatatan'
import PropTypes from 'prop-types'

import * as BIArchiveIn from 'react-icons/bi'
import * as BIArchiveOut from 'react-icons/bi'
import * as MDDelete from 'react-icons/md'

function DetailCatatan({note, archiveNote, unarchiveNote, deleteNote}) {
    const {id, title, body, createdAt, archived} = note

    return (
        <div className="detail-page">
            {
                note ? (
                    <div>
                        <h2 className="detail-page__title">{title}</h2>
                        <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
                        <div className="detail-page__body">{parser(body) || 'loading'}</div>
                    </div>
                ) : <h2 className="detail-page__not-found">Tidak ada catatan</h2>
            }
            <div className="detail-page__action">
                {
                    archived ? (
                        <ButtonCatatan className="action" type="button" title="Aktifkan" onClick={() => unarchiveNote(id)}>
                            <BIArchiveOut.BiArchiveOut />
                        </ButtonCatatan>
                    ) : (
                        <ButtonCatatan className="action" type="button" title="Arsipkan" onClick={() => archiveNote(id)}>
                            <BIArchiveIn.BiArchiveIn />
                        </ButtonCatatan>
                    )
                }
                <ButtonCatatan className="action" type="button" title="hapus" onClick={() => deleteNote(id)}>
                    <MDDelete.MdOutlineDelete />
                </ButtonCatatan>                
            </div>
        </div>
    )
}

DetailCatatan.propType = {
    note: PropTypes.object.isRequired,
    archiveInNote : PropTypes.func.isRequired,
    archiveOutNote : PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired
}

export default DetailCatatan