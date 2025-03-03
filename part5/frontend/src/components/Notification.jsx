const Notification = ({ message }) => {
  if (message === null) return null

  const style = {
    'border': '1px solid',
    'color': 'rgb(255,0,0)'
  }

  return (
    <div style={style} className="notification">{message}</div>
  )
}

export default Notification