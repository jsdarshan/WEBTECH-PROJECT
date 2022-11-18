import express from 'express'
import { loginUser, registeredUser } from '../controllers/auth.js'
import { addNft, getAllNft, deleteAnNft, getSingleNft, updateNft } from '../controllers/nfts.js'
import { addToCart, clearCart, getUserInfo, removeOneFromCart } from '../controllers/users.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

router.route('/all')
  .get(getAllNft)
  .post(secureRoute, addNft)

router.route('/all/:id')
  .get(getSingleNft)
  .put(secureRoute, updateNft)
  .delete(secureRoute,deleteAnNft)

router.route('/register')
  .post(registeredUser)

router.route('/login')
  .post(loginUser)

router.route('/profile')
  .get(secureRoute,getUserInfo)

router.route('/profile/cart')
  .put(secureRoute,addToCart)
  .delete(secureRoute,removeOneFromCart)
  .post(secureRoute,clearCart)

export default router