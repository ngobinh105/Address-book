import { Box, Typography } from '@material-ui/core'
import MuiCard from '@material-ui/core/Card'
import randomColor from 'randomcolor'
const Card = ({ user }) => {
  const color = randomColor()
  return (
    <MuiCard>
      <Box padding={2}>
        <Typography
          variant='h5'
          style={{
            color,
            borderBottom: '1px solid black',
          }}
          gutterBottom
        >
          {user.name}
        </Typography>
        <Typography variant='subtitle2'>
          {user.address.suite}, {user.address.street}
        </Typography>

        <Typography variant='subtitle2'>
          {user.address.city}, {user.address.zipcode}
        </Typography>
        <Typography variant='body2'>{user.email}</Typography>
        <Typography variant='body2'>{user.phone}</Typography>
      </Box>
    </MuiCard>
  )
}

export default Card
