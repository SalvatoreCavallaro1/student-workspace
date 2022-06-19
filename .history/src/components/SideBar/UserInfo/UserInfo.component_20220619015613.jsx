import {React} from 'react';
import { Grid, Header, Icon, Image, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import "./UserInfo.css";


// nelle props ho le informazioni dell'utente loggato
const UserInfo = (props) => {
    if(props.user){
    return (
        <Grid>
            <Grid.Column>
                <Grid.Row className="userinfo_grid_row">
                    <Header inverted as="h2">
                        <Icon name="university"/>
                        <Header.Content>Student Workspace</Header.Content>
                    </Header>
                    <Header className="userinfo_displayname" inverted as="h4">
                        <Dropdown
                        trigger = {
                            
                        }
                        >

                        </Dropdown>
                        <span>
                            <Image src={props.user.photoURL} avatar ></Image> 
                            {props.user.displayName}
                        </span>
                    </Header>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    )
    }
    return null;
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

export default connect (mapStateToProps)(UserInfo) // 