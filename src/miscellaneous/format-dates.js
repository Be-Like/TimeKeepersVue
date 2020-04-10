export const formatDate = payDate => {
  let date = new Date(payDate)
    let monthNames = [
      "Jan","Feb","Mar",
      "Apr","May","Jun",
      "Jul","Aug","Sep",
      "Oct","Nov","Dec"
    ]

    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    return "" + monthNames[month] + " " + day + ", " + year
}
