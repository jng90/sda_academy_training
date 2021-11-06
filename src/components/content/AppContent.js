import classes from './AppContent.module.css';
import {Route, Switch} from "react-router-dom";
import ContentHome from "./home/ContentHome";
import TrainingsList from "./trainings/TrainingsList";
import TrainingsForm from "./trainings/TrainingsForm";
import AtendeesForm from "./atendees/AtendeesForm";
import AtendeesList from './atendees/AtendeesList';
import TrainingDetails from "./trainings/details/TrainingDetails";


const AppContent = () => {

    return (
        <div className={classes.AppContent}>
            <Switch>
                <Route path={'/trainings/details/:trainingID'}>
                    <TrainingDetails/>
                </Route>
                <Route path={'/trainings/add'}>
                    <TrainingsForm/>
                </Route>
                <Route path={'/trainings'}>
                    <TrainingsList/>
                </Route>
                <Route path={'/atendees/add'}>
                    <AtendeesForm/>
                </Route>
                <Route path={'/atendees'}>
                    <AtendeesList/>
                </Route>
                <Route path={'/'}>
                    <ContentHome/>
                </Route>
            </Switch>
        </div>
    )
}


export default AppContent;