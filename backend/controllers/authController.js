import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password, firstname,  lastname, role } = req.body;

  if (!username || !email || !password || username === '' || email === '' || password === '' || !role) {
    return next(errorHandler(400, 'All fields are required'));
  }

  if (!['applicant', 'employee', 'admin', 'superadmin'].includes(role)) {
    return next(errorHandler(400, 'Invalid role'));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password: hashPassword,
    role
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
}

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const { password: pass, ...rest } = validUser._doc;

    res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);

  } catch (error) {
    next(error);
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, 'User not found'));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return next(errorHandler(404, 'User not found'));
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return next(errorHandler(404, 'User not found'));
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};