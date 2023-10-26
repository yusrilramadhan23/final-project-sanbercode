import React from 'react'
import ButtonCatatan from '../components/ButtonCatatan'
import { addNote } from '../utils/network-data'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as FICheck from 'react-icons/fi'

function AddPageWrapper() {
    const navigate = useNavigate()
  
    function navigateHome() {
      navigate('/')
    }
  
    return (
      <AddPage navigate={navigateHome} />
    );
}

class AddPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            body: ''
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this)
        this.onInputHandler = this.onInputHandler.bind(this)
    }
    
    async onSubmitHandler(event) {
        event.preventDefault()
        const {title, body} = this.state
        const note = {
            title,
            body
        }
        await addNote(note)
        const {navigate} = this.props
        navigate()
    }

    onTitleChangeHandler(event) {
        this.setState(()=> {
            return{
                title: event.target.value 
            }
        })
    }

    onInputHandler(event) {
        this.setState(() => {
            return {
                body: event.target.innerHTML
            }
        });
    }

    render(){
        const {title} = this.state

        return(
            <div className='detail-page'>
                <form className="add-new-page__input" onSubmit={this.onSubmitHandler}>
                    <input 
                        type="text" 
                        className="add-new-page__input__title" 
                        value={title} 
                        onChange={this.onTitleChangeHandler} 
                        placeholder="Catatan rahasia" />
                    <div
                        className="add-new-page__input__body"
                        data-placeholder="Sebenarnya saya adalah ...."
                        contentEditable
                        onInput={this.onInputHandler}
                    />
                    <div className="add-new-page__action">
                        <ButtonCatatan type="submit" title="Simpan"><FICheck.FiCheck /></ButtonCatatan>
                    </div>
                </form>
            </div>
        )
    }
}

AddPage.propTypes = {
    navigate: PropTypes.func.isRequired
}

export default AddPageWrapper