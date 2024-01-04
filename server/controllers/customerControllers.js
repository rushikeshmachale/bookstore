import Customers from "../models/customers.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
export const sendMail = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.round(Math.random() * 100000);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to eBookstore ",
      text: `You tried to log in on our portal. Here is the OTP to continue ${otp}. It will be valid for the next ten minutes. Please do not share OTP with anyone.

      Thank you,
      eBookstore
      
      If you did not make this request, you can safely ignore this email.`,
    };

    await transporter.sendMail(mailOptions).then(() => {
      res.json({ otp });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const { name, email, password, img, role } = req.body;
    const flag = await Customers.findOne({ email });
    if (flag) {
      return res.status(400).json("User Already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCustomer = await new Customers({
        name,
        email,
        img,
        password: hashedPassword,
        role,
      });

      await newCustomer
        .save()
        .then(() => {
          return res.status(200).json("customer saved");
        })
        .catch((e) => {
          return res.status(400).json(e);
        });
    }

  } catch (error) {
    console.log(error);
  }
};
export const getCustomers = async (req, res) => {
  try {
    const getall = await Customers.find();
    return res.status(200).json(getall);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Customers.findOne({ email });
  if (!user) {
    return res.status(404).json("user not found");
  }
  const validate = await bcrypt.compare(password, user.password);
  if (!validate) {
    return res.status(403).json("error while Logged in");
  }
  return res.status(200).json(user);
};

export const addCustomers = async (req, res) => {
  const e = req.body;
  e.forEach(async (l) => {
    const customers = new Customers({
      name: l.name,
      email: l.email,
      img: l.img,
      password: l.password,
      role: l.role,
    });
    await customers
      .save()
      .then(() => {
        return res.status(200).json("customer list added");
      })
      .catch(() => {
        return res.status(400).json("customer list not added");
      });
  });
  // if (listData) {
  //   return res.status(200).json("customer list added");
  // } else {
  //   return res.status(400).json("customer list not added");
  // }
};

export const getCustomerByid = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customers.findById(id);
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(400).json("customer not found");
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, img, role } = req.body;

    if (id) {
      await Customers.findByIdAndUpdate(id, {
        name,
        email,
        password,
        img,
        role,
      });
      return res.status(200).json("customer updated ");
    } else {
      return res.status(400).json("customer not found");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
