import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, createNote, updateNote } from './requests'

function App() {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess: (newNote) => {
      //queryClient.invalidateQueries({ queryKey: ['notes']})
      queryClient.setQueriesData(['notes'], notes.concat(newNote))
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (updatedNote) => {
      queryClient.setQueriesData(['notes'], notes.map(note=> note.id === updatedNote.id ? updatedNote : note))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({content, important:true})
  }

  const toggleImportanceOf = note => {
    updateNoteMutation.mutate({...note, important: !note.important})
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>loading data...</div>

  const notes = result.data
  
  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note"/>
        <button type="submit">add</button>
      </form>
      {notes.map(note => 
        <li key={note.id} onClick={()=> toggleImportanceOf(note)}>
          {note.content}
          <strong> {note.important ? 'important': ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App
