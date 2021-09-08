import Card from './Card'
import Grid from '@material-ui/core/Grid'
export const CardList = ({ users, text }) => {
  return (
    <Grid container spacing={3}>
      {users
        .filter(
          (item) =>
            item.name.toLowerCase().includes(text.toLowerCase()) ||
            item.email.toLowerCase().includes(text.toLowerCase())
        )
        .map((user) => (
          <Grid key={user.id} item xs={3}>
            <Card user={user}></Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default CardList
