import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "45ch"
        }
    }
}));
  
const AddUser = () => {
    const navigate = useNavigate();
    const classes = useStyles()
    const dispatch = useDispatch()

    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: ""
    })

    console.log(state, "addState")
    const [error, setError] = useState("") 

    const { name, email, contact, address } = state

    const handleInputChange = e => {
      let { name, value } = e.target
      console.log({[name]: value})
      setState({ ...state, [name]: value })
    }

    const handleSubmit = e => {
      e.preventDefault()
      if(!name || !email || !contact || !address) {
        setError("Please input all input Field")
      } else {
        dispatch(addUser(state))
        navigate("/")
        setError("")
      }
    }

    return (
    <div>
      <Button
        style={{ width: "100px", marginTop: "20px"}}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
        <h2>Add User</h2>
        {error && <h3 style={{ color: "rec" }}>{error}</h3>}
        <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <br/>
        <TextField
          id="standard-basic"
          label="Email"
          value={email}
          name="email"
          type="email"
          onChange={handleInputChange}
        />
        <br/>
        <TextField
          id="standard-basic"
          label="Contact"
          value={contact}
          name="contact"
          type="number"
          onChange={handleInputChange}
        />
        <br/>
        <TextField
          id="standard-basic"
          label="Address"
          margin="normal"
          value={address}
          name="address"
          type="text"
          onChange={handleInputChange}
        />
        <br/>
            <Button 
                style={{ width: "100px" }}
                variant="contained" 
                color="primary" 
                type="submit"
                onClick={handleSubmit}
            >
                Add User
            </Button>
        </form>
    </div>
  )
}

export default AddUser