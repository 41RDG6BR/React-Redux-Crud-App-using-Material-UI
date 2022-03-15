import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUser, updateUser } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "45ch"
        }
    }
}));
  
const EditUser = () => {
    const navigate = useNavigate();
    const classes = useStyles()
    const dispatch = useDispatch()
    let { id } = useParams()
    
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: ""
    })

    const { user } = useSelector(state => state.data)
    const [error, setError] = useState("") 

    const { name, email, contact, address } = state

    useEffect(() => {
        console.log('useEffect')
        dispatch(getSingleUser(id))
    }, [])

    useEffect(() => {
        if(user) {
            setState({ ...user })
        }
    }, [user])

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
        dispatch(updateUser(state, id))
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
        <h2>Edit User</h2>
        {error && <h3 style={{ color: "rec" }}>{error}</h3>}
        <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Name"
          value={name || ""}
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <br/>
        <TextField
          id="standard-basic"
          label="Email"
          value={email || ""}
          name="email"
          type="email"
          onChange={handleInputChange}
        />
        <br/>
        <TextField
          id="standard-basic"
          label="Contact"
          value={contact || ""}
          name="contact"
          type="number"
          onChange={handleInputChange}
        />
        <br/>
        <TextField
          id="standard-basic"
          label="Address"
          margin="normal"
          value={address || ""}
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
                Update
            </Button>
        </form>
    </div>
  )
}

export default EditUser