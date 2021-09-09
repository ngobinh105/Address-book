export default process.env.NODE_ENV === 'production'
  ? 'https://binh-addressbook-backend.herokuapp.com'
  : 'http://localhost:5000'
