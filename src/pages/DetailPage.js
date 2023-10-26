import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {getNote, deleteNote, archiveNote, unarchiveNote} from '../utils/network-data'
import DetailCatatan from '../components/DetailCatatan'
import  PropTypes from 'prop-types'
import NotFoundPage from './NotFoundPage'

function DetailPageWrapper() {
  const navigate = useNavigate()
  const {id} = useParams()

  function navigateHome() {
    navigate('/')
  }

  return (
    <DetailPage id={id} navigate={navigateHome} />
  )
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      note: {},
      loading: true
    }

    this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this)
    this.onArchiveClickHandler = this.onArchiveClickHandler.bind(this)
    this.onUnarchiveClickHandler = this.onUnarchiveClickHandler.bind(this)
  }

  async componentDidMount() {
    const{id} = this.props
    const{data} = await getNote(id)
    this.setState({ note: data, loading: false})
  }

async onDeleteClickHandler(id) {
  await deleteNote(id)
  const { navigate } = this.props
  navigate()
}
  async onArchiveClickHandler(id) {
    await archiveNote(id)
    const { navigate } = this.props
    navigate()
  }

  async onUnarchiveClickHandler(id) {
    await unarchiveNote(id)
    const { navigate } = this.props
    navigate()
  }

  render() {
    const { note, loading } = this.state
    if(note === undefined){
      return <NotFoundPage />
    }

    if(loading){
      return(
        <h2>Loading ...</h2>
      )
    }

    return (
      <DetailCatatan
        note={note}
        deleteNote={this.onDeleteClickHandler}
        archiveNote={this.onArchiveClickHandler}
        unarchiveNote={this.onUnarchiveClickHandler}
      />
    )
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired
}

export default DetailPageWrapper
