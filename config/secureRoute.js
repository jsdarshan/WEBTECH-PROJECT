import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from './environment.js'

export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error()
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, secret)
    const userVerify = await User.findById(payload.sub)
    if (!userVerify) throw new Error()
    
    req.currentUser = userVerify
    
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ 'message': 'Unauthorized' })
  }
}