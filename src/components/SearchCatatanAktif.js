import { getActiveNotes } from '../utils/local-data'

function SearchCatatanAktif(keyword) {
    const activeNotes = getActiveNotes()
    const searchNotes = activeNotes.filter(
        (note) => note.title.toLowerCase().includes(keyword.toLowerCase())
    )

  return searchNotes
}

export default SearchCatatanAktif