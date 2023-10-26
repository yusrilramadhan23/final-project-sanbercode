import React from 'react'
import SearchBar from './SearchBar'

class CatatanAktif extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            keyword: ''
        }
    }

    render(){
        const {keyword} = this.state 
        return(
            <div>
                <h1>Catatan Aktif</h1>
                <SearchBar keyword={keyword}/>
            </div>
        )
    }
}

export default CatatanAktif