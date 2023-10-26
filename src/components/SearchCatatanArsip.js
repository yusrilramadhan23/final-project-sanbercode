import { getArchivedNotes } from '../utils/local-data'

function SearchCatatanArsip(keyword) {
    const archivedNotes = getArchivedNotes()
    const searchedNotes = archivedNotes.filter(
      (note) => note.title.toLowerCase().includes(keyword.toLowerCase())
    )
  
    return searchedNotes
  }

export default SearchCatatanArsip