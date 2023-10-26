import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ButtonCatatan from '../components/ButtonCatatan'
import ListCatatan from '../components/ListCatatan'
import SearchBar from '../components/SearchBar'

import * as FIPlus from 'react-icons/fi'
import LocaleContext from '../contexts/LocaleContext'
import { getActiveNotes } from '../utils/network-data'

function HomePage(){
    const[keyword, setKeyword] = useState()
    const[notes, setNotes] = useState([])
    const[loading, setLoading] = useState(true)
    const[searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchNotes = async () => {
            const { data } = await getActiveNotes()
            setNotes(data)
        }
        fetchNotes()
        setKeyword(searchParams.get('keyword') || '')
        setLoading(false)
    }, [])

    const NotesFilter = () => notes.filter(
        (note) => note.title.toLowerCase().includes(keyword.toLowerCase())
    )
    
    const onKeywordChangeHandler = (keywordInput) => {
        setKeyword(keywordInput)
        setSearchParams({keyword: keywordInput})
    }

    const onAddClickHandler = () => navigate('/note/new')
    
    const render = () => {
        if(loading){
            return(
                <h2>Loading ...</h2>
            )
        }
        return (
          <LocaleContext.Consumer>
            {({locale}) => (
                <div className='detail-page'>
                    <h1>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h1>
                    <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
                    <ListCatatan notes={NotesFilter()} />
                    <div className="homepage__action">
                    <ButtonCatatan type="button" title="Tambah" onClick={onAddClickHandler}>
                        <FIPlus.FiPlus />
                    </ButtonCatatan>
                    </div>
                </div>
            )}
          </LocaleContext.Consumer>
        );
    }
    return render()
}

export default HomePage