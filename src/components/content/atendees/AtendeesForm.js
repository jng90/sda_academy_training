import classes from './AtendeesForm.module.css';
import "react-datepicker/dist/react-datepicker.css";
import CardComponent from "../../CardComponent";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Grid, TextField} from "@material-ui/core";
import {useState} from "react";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

const getDateStringFromDateObject = (dateObject) => {
    let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(dateObject);
    let mo = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(dateObject);
    let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(dateObject);

    return `${ye}-${mo}-${da}`
}

// Model / encja pustej oferty/nowego obiektu
const EMPTY_NEW_ATENDEES = {
    'id': null,
    'name': null,
    'surname': null,
    'pesel': null,
    'email': null,
    'address': null,
}

const AtendeesForm = () => {
    // Tworząc formularz nadajemy mu stan pustego obiektu
    //  Wartości domyślne formularza kopiowane są z obiektu EMPTY_NEW_ATENDEES
    const [editedAtendees, setEditedAtendees] = useState({...EMPTY_NEW_ATENDEES});
    const [timeStart, setTimeStart] = useState(new Date());

    const handleChangeForm = name => event => {
        setEditedAtendees({...editedAtendees, [name]: event.target.value});
    };

    const handleDateChangeForm = name => date => {
        const finalDate = getDateStringFromDateObject(date)
        setTimeStart(date)
        setEditedAtendees({...editedAtendees, [name]: finalDate});
    };

    const handleClearForm = () => {
        setEditedAtendees({...EMPTY_NEW_ATENDEES})
    }

    const handleSubmit = () => {
        // wysłanie obiektu na serwer
        console.log("Wysyłamy:" + JSON.stringify(editedAtendees))

        axios.post("http://localhost:8080/attendees", editedAtendees)
            .then((data) => {
                console.log("Odopowiedz sukces " + JSON.stringify(data))
            })
            .catch((err) => {
                    console.log("Odopowiedz blad " + JSON.stringify(err))
                }
            )
    }

    return (
        <div>
            <CardComponent title={'Atendees Form'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <TextField value={editedAtendees.name}
                                   onChange={handleChangeForm("name")}
                                   className={classes.FormStretchField}
                                   label={'Name'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedAtendees.surname}
                                   onChange={handleChangeForm("surname")}
                                   className={classes.FormStretchField}
                                   label={'Surname'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedAtendees.pesel}
                                   onChange={handleChangeForm("pesel")}
                                   className={classes.FormStretchField}
                                   label={'Pesel'} size={'small'} variant="filled"/>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedAtendees.email}
                                   onChange={handleChangeForm("email")}
                                   className={classes.FormStretchField}
                                   label={'Email'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedAtendees.address}
                                   onChange={handleChangeForm("address")}
                                   className={classes.FormStretchField}
                                   label={'Address'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid container item xs={10}>
                        <Grid item xs={6}>
                            <Button className={classes.FormStretchField}
                                    size={'small'} variant="contained"
                                    startIcon={<DeleteIcon/>}
                                    onClick={handleClearForm}>
                                Reset
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={classes.FormStretchField}
                                    size={'small'} variant="contained"
                                    onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default AtendeesForm;