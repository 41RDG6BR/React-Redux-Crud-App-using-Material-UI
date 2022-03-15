import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, deleteUser } from '../redux/actions';
import { Button, ButtonGroup } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        marginTop: 100,
        minWidth: 900,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

function Home(props) {
    const { classes } = props;
    let dispatch = useDispatch()
    const navigate = useNavigate();
    const { users } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadUsers())
    }, [])


    const handleDelete = (id) => {
        if (window.confirm("Are u sure wanted to delete the user?")) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <div>
                <Button variant="contained" color="primary" onClick={() => navigate("/addUser")}>
                    Add User
                </Button>
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Name</CustomTableCell>
                            <CustomTableCell align="center">Endereço</CustomTableCell>
                            <CustomTableCell align="center">Email</CustomTableCell>
                            <CustomTableCell align="center">Contato</CustomTableCell>
                            <CustomTableCell align="center">Action</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(user => (
                            <TableRow className={classes.user} key={user.id}>
                                <CustomTableCell component="th" scope="row">
                                    {user.name}
                                </CustomTableCell>
                                <CustomTableCell align="center">{user.address}</CustomTableCell>
                                <CustomTableCell align="center">{user.email}</CustomTableCell>
                                <CustomTableCell align="center">{user.contact}</CustomTableCell>
                                <CustomTableCell align="center">
                                    <ButtonGroup
                                        variant="contained"
                                        color="primary"
                                        aria-label="contained primary button group"
                                    >
                                        <Button
                                            style={{ marginRight: "5px" }}
                                            color="secondary"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button 
                                            color="primary" 
                                            onClick={() => navigate(`/editUser/${user.id}`)}
                                        >
                                            Edit
                                        </Button>
                                    </ButtonGroup>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);