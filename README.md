# Tokenizer 🪙
by [Gayatri](https://github.com/gayatrirajgor), [Lukacs](https://github.com/lukacspapp), and [Ricardo](https://github.com/rjriverac)

## Table of Contents
|No. | Content                           | 
|----|-----------------------------------|
|1   | [Project Overview](#overview)     |
|2   | [Project Brief](#brief)           |  
|3   | [Technologies Used](#tech)        | 
|4   | [Approach](#approach)             |
|5   | [Wins & Challenges](#wins)        |
|6   | [Future Ideas](#ideas)            |
|7   | [Result](#result)                 |

<a name="overview"></a>
## 1. Overview
Tokenizer is a full-stack MERN (Mongo, Express, React, NodeJS) NFT e-commerce application built over seven days in a group of three. We chose to create an e-commerce website that was heavily influenced by the [Kraken](https://www.kraken.com/en-gb/) website. After registering, a user can upload and update their NFT. All NFTs have their own pricing charts, allowing users to track price movements across all NFTs.
This project was deployed via Heroku and can be accessed [here](https://tokenizer-nft.herokuapp.com/). 

<a name="brief"></a>
## 2. Brief 📃
* Build a full-stack application, building your own front and back end. 
* Use an Express API to serve the data from a Mongo database.
* Consume your API with a separate front end built with React.
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
* Work in a team, using git to code collaboratively. 
* Be deployed online.

<a name="tech"></a>
## 3. Technologies 💻
Back End:
* MongoDB
* Mongoose
* NodeJS
* Express
* JSONWebToken

Front End: 
* React, React Router
* [Semantic UI](https://react.semantic-ui.com/)
* [Pure React Carousel](https://www.npmjs.com/package/pure-react-carousel) 
* [Animate CSS](https://animate.style/)

Libraries used:
* Axios
* Bcrypt

Other development tools:
* Insomnia 
* [Asana](https://asana.com/) (planning)
* [Recharts](https://recharts.org/en-US/) (a framework for charts)
* Google Jamboard (wireframes) 
* Git & GitHub
* Zoom 
* Slack

<a name="approach"></a>
## 4. Approach ✏️
### Planning 
We first decided to create an e-commerce app as a group. We used Google Jamboard to develop wireframes after deciding on the basis for our app. After we finished our wireframes, we utilised [Asana](https://asana.com/) to determine which tasks needed to be performed and who would be in charge of completing them.

| <img width="1111" alt="Screenshot 2021-12-22 at 11 42 24" src="https://user-images.githubusercontent.com/59033443/147087682-f80aa2c7-4dc2-43d3-b28a-a1dca911e4c3.png"> | <img width="962" alt="Screenshot 2021-12-22 at 11 44 12" src="https://user-images.githubusercontent.com/59033443/147087921-348e9333-c8d5-4cc7-a8da-d109f8f3b796.png"> |
|---|---|
<img width="556" alt="Screenshot 2021-12-22 at 11 58 15" src="https://user-images.githubusercontent.com/59033443/147089510-74d3ffa5-9720-4495-955f-50dea1a04932.png"> | <img width="748" alt="Screenshot 2021-12-22 at 11 58 39" src="https://user-images.githubusercontent.com/59033443/147089566-ca59bf1f-1a2d-43c8-a155-5229aadde25b.png"> |

### Back End
We agreed as a team to programme the back end components of the project together so that we could all gain expertise, as well as to limit the amount of time spent on the back end owing to the navigators seeing any potential errors. One person was screen sharing, while the other two guided the one doing the code. The back end took three full days to create, with each member of the team coding for one day of that time. Because we each had our own back end sections to work on, we first laid out what models, controllers, and routes we would be developing before diving into the code session. We also chose which features of our models will be embedded or referenced. I worked on the back end by configuring the controllers for the NFTs and developing the routes for obtaining all of the NFTs, adding an NFT, and getting a single NFT.

```js
export const getAllNft = async (req, res) => {
  try {
    const nfts = await Nft.find()
    return res.status(200).json(nfts)
  } catch (error) {
    return res.status(404).json({ 'message': 'Not found' })
  }
}

export const addNft = async(req, res) => {
  try {
    const newNft = { ...req.body, owner: req.currentUser._id, token: uuid(), 
      transactions: {
        type: 'minted',
        to: req.currentUser._id,
        price: 0
      } }
    const nftToAdd = await Nft.create(newNft)
    if (!nftToAdd) throw new Error()
    return res.status(201).json(nftToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const getSingleNft = async (req, res) => {
  try {
    const { id } = req.params
    const singleNft = await Nft.findById(id).populate('owner')
    if (!singleNft) throw new Error()
    return res.status(200).json(singleNft)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'not found' })
  }
}
```

The back end is a CRUD API, that uses MongoDB, Mongoose, NodeJS and Express.
Throughout the nine days, all three of us added around 20 NFTs to the database, most of which came from [OpenSea](https://opensea.io/).

### Front End
For the front end, we would meet in our daily stand up and discuss what components everyone wanted to focus on for the day. For this project, I worked on the login, register, home page, navbar, and NFT form page.  

#### Homepage
I used a package called [Pure React Carousel](https://www.npmjs.com/package/pure-react-carousel) to construct a carousel for the homepage. I needed the carousel to show no more than four NFT images, so I used the `filter` function to return an array with only four entries and then used the `map` method to display each item in the array.
```js
<Slider>
  {nftData.filter((_item, index) => index < 4).map((product, index) => {
    return (
      <>
        <Slide key={index}>
          <Card as='a' href={`/browse/${product._id}`}>
            <Image src={product.image}></Image>
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Label>
                <Icon name='bitcoin'/>Price: {product.currentPrice}
              </Label>
            </Card.Content>
          </Card>
        </Slide>
        <Divider />
      </>
    )
  })}
</Slider>
```

#### Navbar
If a user was not logged in, I wanted the navbar to display the options 'Create an Account' or 'Sign in,' and if the user was logged in, I wanted the navbar to show the options 'Logout,' 'Cart,' and 'Profile.' To do this, I utilised a ternary that determines whether or not the user is authenticated. The `userIsAuthenticated` function first determines whether or not a payload exists; if it does not, false is returned. The function then checks if the current time of the token is less than the expiry time, and if it returns true, the user can be authenticated.

```js
const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}
```
```js
{!userIsAuthenticated() ?
  <>
    <Menu.Item position='right'><Button as='a' color='teal' href='/register'>Create an Account</Button></Menu.Item>
    <Menu.Item><Button as='a' inverted color='teal' href='/login'>Sign In</Button></Menu.Item>
  </>
  :
  <>
    <Menu.Item position='right' as='a' onClick={handleLogout}>Log Out</Menu.Item>
    <Menu.Item as='a' href='/cart'><Icon name='shopping cart' />Cart</Menu.Item>
    <Menu.Item><Icon name='user circle' size='large' />
      <Dropdown floating closeOnChange inline direction='left'>
        <Dropdown.Menu size='mini'>
          <Dropdown.Header>Signed in as: {getUsername.username} </Dropdown.Header>
          <Dropdown.Item as='a' href='/profile' icon='user circle' text='Go to your profile' />
          <Dropdown.Item as='a' href='/profile/add' icon='add' text='Add NFT' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  </>
}
```
<img width="1108" alt="Screenshot 2021-12-22 at 14 28 03" src="https://user-images.githubusercontent.com/59033443/147108023-e3a6cca6-ef05-4aed-b156-d83dc6ff5632.png">
<img width="1106" alt="Screenshot 2021-12-22 at 14 27 53" src="https://user-images.githubusercontent.com/59033443/147108058-3b1d45e3-2813-45e6-91a1-215f29a9bcac.png">

#### Login & Register
On both the login and registration pages, I used a `POST` request. The details entered by the user for the registration were put to state, and the details entered were then sent to the database via a `POST` request once they clicked on the 'Sign Up' button.
```js
const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

const handleChange = (event) => {
  const newData = { ...formData, [event.target.name]: event.target.value }
  setFormData(newData)
}

const handleSubmit = async event => {
  event.preventDefault()
  try {
    await axios.post('/api/register', formData)
    setTimeout(() => {
      history.push('/login')
    }, 2000)
    setMessage(true)
  } catch (err) {
    console.log(err)
    setError(true)
    setMessage(false)
  }
}
```
The user had to sign in with their email and password for the login page, and the information submitted was then set to state via a `handleChange` function. The post request is then sent to the back end when the user hits the 'Login' button. 
```js
const [formData, setFormData] = useState({
  email: '',
  password: ''
})

const handleChange = (event) => {
  const newData = { ...formData, [event.target.name]: event.target.value }
  setFormData(newData)
}

const handleSubmit = async event => {
  event.preventDefault()
  try {
    const { data } = await axios.post('/api/login', formData)
    setToken(data.token)
    setTimeout(() => {
      history.push('/browse')
    }, 2500)
    setMessage(true)
  } catch (err) {
    console.log(err)
    setError(true)
    setMessage(false)
  }
}
```
The information is then reviewed on the back end to see if the email address exists and if the password is correct.
```js
export const loginUser = async (req, res) => {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin || !userToLogin.validatepw(req.body.password)) {
      throw new Error()
    } 
  } catch (err) {
    console.log(err)
    return res.status(422).json({ 'message': 'Unauthorised' })
  }
}
```
#### NFT Form Page
The user must input a name for the NFT as well as an image on the NFT form page. The category section is entirely optional. The information is then set to state and sent to the back end using a `POST` request, along with the necessary authorisation.

```js
const [formData, setFormData] = useState({
  name: '',
  image: '',
  category: ''
})

const handleSubmit = async (event) => {
  event.preventDefault()
  try {
    await axios.post('/api/all',
      formData, {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    setMessage(true)
  } catch (err) {
    console.log(err)
    setErrors(true)
    setMessage(false)
  }
  setFormData({ name: '', image: '', category: '' })
}
```
  
<a name="wins"></a>
## 5. Wins & Challenges 🏆
### Wins
* As this was my first full-stack project, properly connecting the back end and front end and seeing the end result was a huge accomplishment.
* It was also a plus to be able to utilise several packages and frameworks together by following documentation.
* The teamwork was excellent, and the project was a huge success because of strong communication and a desire to help one another.

### Challenges 
* For the first time, I utilised a CSS framework called [Semantic UI](https://react.semantic-ui.com/) for this project; getting familiar with the framework's syntax was a bit of a challenge, but after I got the hang of it, I could definitely see the benefits. One advantage of utilising Semantic UI was that it supplied a variety of UI components as well as modern designs.

<a name="ideas"></a>
## 6. Future Ideas 💭
* Pagination for all NFTs.
* Change password function.
* Delete account function.
* Add comments on an NFT.
* Add a feature so the user can upload an image of their NFT.

<a name="result"></a>
## 7. Result 
### Homepage
<img width="1260" alt="Screenshot 2021-12-22 at 14 12 28" src="https://user-images.githubusercontent.com/59033443/147105955-72efb9dc-ca31-4266-adae-389285558910.png">

### Register page
<img width="903" alt="Screenshot 2021-12-22 at 14 31 43" src="https://user-images.githubusercontent.com/59033443/147108410-b5da3d17-5460-43f2-80d6-42a8cf83e95e.png">

### Login page
<img width="1384" alt="Screenshot 2021-12-22 at 14 32 13" src="https://user-images.githubusercontent.com/59033443/147108495-cb7d7ced-e5f5-4d1b-aed3-b2ad5a58f318.png">

### Browse page 
<img width="873" alt="Screenshot 2021-12-22 at 15 46 49" src="https://user-images.githubusercontent.com/59033443/147118708-86cd9869-a766-480d-ab75-711205b6e9e8.png">

### Individual NFT page
<img width="950" alt="Screenshot 2021-12-22 at 15 52 29" src="https://user-images.githubusercontent.com/59033443/147119639-69c5da81-8982-4081-b58b-47423b20d8c3.png">

### Add NFT page
<img width="1482" alt="Screenshot 2021-12-22 at 15 13 11" src="https://user-images.githubusercontent.com/59033443/147114018-8fa88fae-ef4c-4c51-88be-0112951172ef.png">

### Cart page
<img width="945" alt="Screenshot 2021-12-22 at 15 55 34" src="https://user-images.githubusercontent.com/59033443/147119939-7a248c98-2e04-4b7b-a96d-68aa87389072.png">

### Profile page
<img width="510" alt="Screenshot 2021-12-22 at 15 57 17" src="https://user-images.githubusercontent.com/59033443/147120210-2391a1d1-eb85-4400-9b23-dd2a11e4d3ee.png">
