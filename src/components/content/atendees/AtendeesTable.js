import classes from "./AtendeesList.module.css";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import CardComponent from "../../CardComponent";
import axios from "axios";

const AtendeesTable = (props) => {

    const handleRemoveRecord = (row) => {
        axios.delete("http://localhost:8080/attendees/" + row.id)
            .then((data) => {
                console.log("Otrzymaliśmy sukces odpowiedź!");
                props.refreshData();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!");
            });
    }

    return <CardComponent title={'Atendees List'}>
        <div className={classes.TableContainer}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Delete</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.surname}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {handleRemoveRecord(row)
                                    }}>Delete</Button>
                                </TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">
                                    <Button></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </CardComponent>
}

export default AtendeesTable;