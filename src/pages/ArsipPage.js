import React from 'react'
import { getArchivedNotes} from '../utils/network-data'
import SearchBar from '../components/SearchBar'
import ListCatatan from '../components/ListCatatan'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContext'

function ArsipPageWrapper() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const title = searchParams.get('title')

  function onSearchParams(keyword) {
    setSearchParams({ title: keyword })
  }

  function navigateHome() {
    navigate('/note/new')
  }

  return (
    <ArsipPage navigate={navigateHome} title={title} onSearch={onSearchParams}/>
  )
}

class ArsipPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      keyword: props.title || '',
      loading: true
    }

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this)
    this.onAddClickHandler = this.onAddClickHandler.bind(this)
  }

  async componentDidMount() {
    const {data} = await getArchivedNotes()
    this.setState({ notes: data, loading: false})
  }

  NotesFilter() {
    const { notes, keyword } = this.state
    return notes.filter(
      (note) => note.title.toLowerCase().includes(keyword.toLowerCase()),
    )
  }

  onKeywordChangeHandler(keyword) {
    this.setState({ keyword})
    const { onSearch } = this.props
    onSearch(keyword)
  }

  onAddClickHandler(event) {
    event.preventDefault()
    const { navigate } = this.props
    navigate()
  }

  render() {
    const {keyword, loading} = this.state
    if(loading){
      return(
        <h2>Loading ...</h2>
      )
    }

    return (
      <LocaleContext.Consumer>
        {({locale}) => (
          <div className='detail-page'>
            <h1>{locale === 'id' ? 'Catatan Arsip' : 'Archived Note'}</h1>
            <SearchBar keyword={keyword} keywordChange={this.onKeywordChangeHandler} />
            <ListCatatan notes={this.NotesFilter()} />
          </div>
        )}
      </LocaleContext.Consumer>
    )
  }
}

ArsipPage.propTypes = {
  navigate: PropTypes.func.isRequired
}

export default ArsipPageWrapper
