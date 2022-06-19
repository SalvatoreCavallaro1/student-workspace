import {React} from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';


// nelle props ho le informazioni dell'utente loggato
const UserInfo = (props) => {

    return (
        <Grid>
            <Grid.Column>
                <Grid.Row>
                    <Header>
                        <Icon name="university"/>

                    </Header>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    )

}