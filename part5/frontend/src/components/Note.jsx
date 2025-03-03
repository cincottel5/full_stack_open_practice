const Note = ({ note, toggleImportance }) => {

  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className="note">
      {/* {note.content} */}
      <span>{note.content}</span>
      {/* Your awesome note: {note.content} */}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note