let monthNames = [
  "Jan","Feb","Mar",
  "Apr","May","Jun",
  "Jul","Aug","Sep",
  "Oct","Nov","Dec"
]

export const formatDate = passedDate => {
  let date = new Date(passedDate)

  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()

  return "" + monthNames[month] + " " + day + ", " + year
}

export const formatDateTime = passedDate => {
  let date = new Date(passedDate)

  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()

  let hour = date.getHours()
  hour = hour % 12 === 0 ? 12 : hour % 12
  let minutes = date.getMinutes()
  minutes = minutes < 10 ? '0' + minutes : minutes
  let period = date.getHours() < 12 ? 'am' : 'pm'

  return `${monthNames[month]} ${day}, ${year} at ${hour}:${minutes} ${period}`
}

export const formatTime = passedDate => {
  let date = new Date(passedDate)

  let hour = date.getHours()
  hour = hour % 12 === 0 ? 12 : hour % 12
  let minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  let period = hour < 12 ? 'am' : 'pm'

  return `${hour}:${minute} ${period}`
}
