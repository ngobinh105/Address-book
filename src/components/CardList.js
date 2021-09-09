import Card from './Card'
import Grid from '@material-ui/core/Grid'
import MuiCard from '@material-ui/core/Card'
import { Box } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import backendUrl from '../backendUrl'
export const CardList = ({ users, text, setUsers }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [suite, setSuite] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const resetForm = () => {
    setName('')
    setStreet('')
    setSuite('')
    setCity('')
    setZipcode('')
    setEmail('')
    setPhone('')
  }

  return (
    <>
      <Grid container spacing={3}>
        {users
          .filter(
            (item) =>
              item.name.toLowerCase().includes(text.toLowerCase()) ||
              item.email.toLowerCase().includes(text.toLowerCase())
          )
          .map((user) => (
            <Grid
              onClick={() => {
                setOpen(true)
                setIsUpdate(true)
                setId(user.id)
                setName(user.name)
                setStreet(user.address.street)
                setSuite(user.address.suite)
                setCity(user.address.city)
                setZipcode(user.address.zipcode)
                setEmail(user.email)
                setPhone(user.phone)
              }}
              key={user.id}
              item
              xs={3}
              style={{ cursor: 'pointer' }}
            >
              <Card user={user}></Card>
            </Grid>
          ))}
        <Grid item xs={3}>
          <MuiCard>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height={160}
              padding={2}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIsUpdate(false)
                setOpen(true)
                resetForm()
              }}
            >
              <AddCircleOutlineIcon
                style={{ fontSize: '50px' }}
              ></AddCircleOutlineIcon>
            </Box>
          </MuiCard>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {isUpdate ? 'Edit Contact Info' : 'Add Contact Info'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in new contact information.
          </DialogContentText>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin='dense'
                label='Name'
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                fullWidth
                margin='dense'
                label='Suite'
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                fullWidth
                margin='dense'
                label='Street'
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                margin='dense'
                label='City'
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                fullWidth
                margin='dense'
                label='Zipcode'
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                margin='dense'
                label='Phone'
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin='dense'
                label='Email'
                type='email'
              ></TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
            }}
            variant='outlined'
          >
            Cancel
          </Button>

          {isUpdate ? (
            <Button
              color='secondary'
              variant='contained'
              onClick={async () => {
                await fetch(`${backendUrl}/${id}`, {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                })
                setUsers(users.filter((user) => user.id !== id))
                resetForm()
                setOpen(false)
              }}
            >
              Delele
            </Button>
          ) : (
            ''
          )}
          <Button
            onClick={async () => {
              const newUser = {
                name,
                address: { street, suite, city, zipcode },
                email,
                phone,
              }
              if (isUpdate) {
                const res = await fetch(
                  `${backendUrl}/users/${id}`,

                  {
                    method: 'PUT', // or 'PUT'
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                  }
                )
                const data = await res.json()
                setUsers(users.map((user) => (user.id !== id ? user : data)))
              } else {
                const res = await fetch(`${backendUrl}/users`, {
                  method: 'POST', // or 'PUT'
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newUser),
                })
                const data = await res.json()

                setUsers([...users, data])
              }

              resetForm()
              setOpen(false)
            }}
            color='primary'
            variant='contained'
          >
            {isUpdate ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CardList
