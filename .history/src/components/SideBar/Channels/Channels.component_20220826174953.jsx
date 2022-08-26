import {React, useState, useEffect} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu, Modal, Form, Button, Segment, Dropdown } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref, push, update, child, onChildAdded,getDatabase,get,set, serverTimestamp,onDisconnect,remove} from "firebase/database";
import { setChannel } from '../../../store/actioncreator';
import { Notification } from '../Notification/Notification.component';
const Channels = (props) => {
    
    const adminMail="admin@gmail.com";
    var newArray=[];
   
    const courses=[];
    const channels=[];
    
    const [userState, setUserState]= useState([]);
   /* const courses = [
        { id:'fhfgrer',key: 'Ingegneria Informatica primo anno', text: 'Ingegneria Informatica primo anno', value: 'Ingegneria Informatica primo anno', years: '1' },
        
    ]*/

    
    const [modalOpenState, setModalOpenState]= useState(false);
    const [modalOpenState2, setModalOpenState2]= useState(false);
    const [modalOpenState3, setModalOpenState3]= useState(false);
    const [modalOpenState4, setModalOpenState4]= useState(false);
    const [channelAddState, setchannelAddState]= useState({name: '', description: ''});
    const [CourseAddState, setCourseAddState]= useState({name: '', years: ''});
    const [CourseState, setCourseState]= useState({name: 'Seleziona Corso'});
    const [isLoading, setIsLoading]= useState(false); //stato per gestire l'icona di caricamento
    //stato per mantenere tutti i canali presenti
    const [ChannelsState, setChannelsState]= useState([]);
    const [ChannelsRemoveState, setChannelsRemoveState]= useState({name: 'Seleziona Canale'});
    //const [ChannelsStateFilt, setChannelsStateFilt]= useState([]);
   // const [CoursesState,setCoursesState]=useState([]);

    const channelsRef= ref(firebase.db, 'channels');
    //console.log();
    

    
    


    //useEffect serve a eseguire questo pezzo di codice quando il codice viene renderizzato
    useEffect(() => {

        onChildAdded(channelsRef, (snapshot) => {
            //console.log(snapshot.val());
            setChannelsState((currentState) => {
                let updatedState = [...currentState];
                updatedState.push(snapshot.val());  
                return updatedState;
            })

            });
               
            // ogni volta che un figlio alla lista dei canali viene aggiunto o questo
            //pezzo di codice viene eseguito per la prima volta, quest'evento verrà triggerato
            //e restituisce un oggetto chiamato snapshot che sarà in grado di leggere i valori dal documento

            //return() => channelsRef.off(); //rimuovo l'event listener che è in ascolto quando viene aggiunto un nuovo canale 
            //una volta che questo component viene unmounted


            

        

    },[]) //la lista delle dependency la setto ome un oggetto vuoto in modo che il codice venga eseguito soltanto una volta

    // SELEZIONE PRIMO CANALE
/*
    
    useEffect(() => {
        //imposto selezionato il primo canale di default
        if(ChannelsState.length > 0){
            console.log(ChannelsState);
            props.selectChannel(ChannelsState[0])
        }
    },[!props.channel ?ChannelsState : null]) 
*/
useEffect(() => {
    //imposto selezionato il primo canale di default per admin
    if(props.user)
    {
        if(props.user.email===adminMail)
        {
            if(ChannelsState.length > 0){
                //console.log(newArray);
                props.selectChannel(ChannelsState[0])
            }
        }
    }
},[!props.channel ?ChannelsState : null]) // se non ho selezionato alcun canale avrò una dependency su updatedState se invece è già settato non avrò dependency

useEffect(() => {
    //imposto selezionato il primo canale di default per utente normale
    if(newArray.length > 0){
        //console.log(newArray);
        props.selectChannel(newArray[0])
    }
},[!props.channel ?newArray : null])

useEffect ( () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `courses`)).then((snapshot) => {
    if (snapshot.exists()) {
          Object.keys(snapshot.val()).forEach(key => courses.push(snapshot.val()[key]));      
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
},[courses])

useEffect ( () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `channels`)).then((snapshot) => {
    if (snapshot.exists()) {

          Object.keys(snapshot.val()).forEach(key =>
            {
                if(snapshot.val()[key].forSelectBox){
                    channels.push(snapshot.val()[key].forSelectBox)
                }
            }
             ); 
          console.log(channels);     
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
},[channels])




    const filterFn = (value, index, obj,i) => {
        let result = value.replace(/-$/g, i);
        return result;
    };



    const SetTheUser = () => {
        if(props.user)
            {   
                
                //console.log(props.user.uid);
                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${props.user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    //console.log(snapshot.val());  
                    setUserState((currentState) => {
                        let updatedState = [...currentState];
                        updatedState.push(snapshot.val());
                       // console.log(updatedState);
                        return updatedState;
                    })
                  
                } else {
                    console.log("No data available");
                }
                }).catch((error) => {
                console.error(error);
                });
            } 

    }

     
   
    const openModal = () => {
        setModalOpenState(true);
    }

    const closeModal = () => {
        setModalOpenState(false);
    }

    const openModal2 = () => {
        setModalOpenState2(true);
    }

    const closeModal2 = () => {
        setModalOpenState2(false);
    }

    const openModal3 = () => {
        setModalOpenState3(true);
    }

    const closeModal3 = () => {
        setModalOpenState3(false);
    }

    const openModal4 = () => {
        setModalOpenState4(true);
    }

    const closeModal4 = () => {
        setModalOpenState4(false);
    }

    

    const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description && CourseState && CourseState.name;
    }

    const checkIfFormValid3 = () => {
        return CourseAddState && CourseAddState.name &&  CourseAddState.years;
    }

    const checkIfFormValid4 = () => {
        return CourseState && CourseAddState.name;
    }

        
    const newArraylenght = () => {
         
         if(userState.length<1)
         {
             SetTheUser();
         }
        
         if (userState.length>1)
         {
             
          userState.pop();
             
         }
        
         if(ChannelsState.length > 0){                                  
 
            if(userState.length>=1 )
            {
                
                
                newArray = ChannelsState.filter((item) => item.corso === userState[0].corso && item.years === userState[0].years);
            
            }
        
            return newArray.map((channel) => {
                        
                            if(userState.length>=1 && channel.corso==userState[0].corso && channel.years==userState[0].years)
                            {
                                //console.log(channel);
                            }
            })
                                    
        }       
     
    }
    
        

    
    const displayChannels = () => {
        if(userState.length<1)
        {
            SetTheUser();
        }
       
        if (userState.length>1)
        {
            
         userState.pop();
            
        }
        if(ChannelsState.length > 0){                                  

            if(props.user)
            {   
                if(props.user.email===adminMail)
                {


                    return ChannelsState.map((channel) => {
                        return <Menu.Item
                                key={channel.id}
                                name={channel.name}
                                onClick={() => props.selectChannel(channel)}
                                active={props.channel && channel.id === props.channel.id}
                                >
                                {"#" + channel.name}
                                </Menu.Item>
                    })
                }
                else
                {
                    //console.log(ChannelsState);
                    if(userState.length>=1 )
                    {
                        
                        //newArray=[];
                        newArray = ChannelsState.filter((item) => item.corso === userState[0].corso && item.years === userState[0].years);
                        //console.log(newArray);
                        
                    }
                   
                            //console.log(userState);


                            //  return ChannelsState.map((channel) => {
                                return newArray.map((channel) => {
                                       
                                    //if(userState.length>=1 && channel.corso==userState[0].corso && channel.years==userState[0].years)
                                    //{
                                    return <Menu.Item
                                    key={channel.id}
                                    name={channel.name}
                                    onClick={() => selectChannel(channel)}
                                    active={props.channel && channel.id === props.channel.id}
                                    >
                                    
                                    <Notification user={props.user} channel={props.channel} notificationChannelId={channel.id}
                                     displayName= {"#" + channel.name} />
                                    </Menu.Item>
                                    //}
                            
                                })
                    
                            // })
                }
            }                 
        
        }
    
        
    }


    const selectChannel = (channel) => {
        //setto il last visited per il canale selezionato
        setLastVisited(props.user,props.channel);
        setLastVisited(props.user,channel); // lo setto anche per i nuovi canali
        props.selectChannel(channel);
    }
    const setLastVisited = (user,channel) => {
        // const lastVisited = child(usersRef,user.id).child("lastvisited").child(channel.id);
         const dbRef = ref(getDatabase());
         const lastVisited =  child(child(child(dbRef, `users/${props.user.uid}`),"lastvisited"),channel.id);  
         set(lastVisited,serverTimestamp(firebase.db));
         onDisconnect(lastVisited).set(serverTimestamp(firebase.db)).catch((err) => {
             if (err) {
               console.error("could not establish onDisconnect event", err);
             }
           });
         
     }

    const onSubmit = () => {
        if (!checkIfFormValid()) {
            return;
            //da settare gli errori come fatto per i form di login e registrazione
        }
        //const key = channelsRef.push().key; 

        let Clength=courses.length;
               
                
        let courseYear;
        for(let i=0;i<Clength;i++)
        {
            console.log(courses[i].value);
            console.log(CourseState.name);
            if(courses[i].value==CourseState.name)
            courseYear=courses[i].years;
        }

        //generò un riferimento alla location,aggiungo i dati con la funzione push() e generò e ottengo una key unica
        const newChannelKey = push(child(ref(firebase.db), 'channels')).key;

        const channel = {
            id:newChannelKey,
            name : channelAddState.name,
            description : channelAddState.description,
            years : courseYear,
            corso : CourseState.name,
            created_by : {
                name: props.user.displayName,
                avatar: props.user.photoURL
            },
            forSelectBox : {
                id:newChannelKey,
                key: channelAddState.name,
                text: channelAddState.name,
                value: channelAddState.name
            }

            //id:'fhfgrer',key: 'Ingegneria Informatica primo anno', text: 'Ingegneria Informatica primo anno', value: 'Ingegneria Informatica primo anno'

        }

        setIsLoading(true);
        // Scrivo i dati del nuovo canale sul realtime database.
        const updates = {};
        updates['channels/' + newChannelKey] = channel;
        update(ref(firebase.db), updates)
        .then(() =>
        {
            setchannelAddState({name: '', description: ''}) // pulizia dei dati
            //console.log('saved');
            setIsLoading(false);
            closeModal();
        })
        .catch ((error) => {
            console.log(error);
        })

    }

    const onSubmit3 = () => {
        if (!checkIfFormValid3()) {
            return;
            //da settare gli errori come fatto per i form di login e registrazione
        }

        


    
        //generò un riferimento alla location,aggiungo i dati con la funzione push() e generò e ottengo una key unica
        const newCourseKey = push(child(ref(firebase.db), 'courses')).key;

        

        const course = {
            id: newCourseKey,
            key:CourseAddState.name,
            text : CourseAddState.name,
            value: CourseAddState.name,
            years : CourseAddState.years
        }

        setIsLoading(true);
        // Scrivo i dati del nuovo canale sul realtime database.
        const updates = {};
        updates['courses/' + newCourseKey] = course;
        update(ref(firebase.db), updates)
        .then(() =>
        {
            setCourseAddState({name: '', years: ''}) // pulizia dei dati
            //console.log('saved');
            setIsLoading(false);
            closeModal3();
        })
        .catch ((error) => {
            console.log(error);
        })

    }


    const onSubmit4 = () => {
       /* if (!checkIfFormValid4()) {
            return;
            //da settare gli errori come fatto per i form di login e registrazione
        }*/
    
                let Clength=courses.length;
               
                
                let courseIDToRemove;
                for(let i=0;i<Clength;i++)
                {
                    console.log(courses[i].value);
                    console.log(CourseState.name);
                   if(courses[i].value==CourseState.name)
                   courseIDToRemove=courses[i].id;
                }
                //console.log(courseIDToRemove);
                const dbRef = ref(getDatabase());
                const coursesRef=child(dbRef, `courses/${courseIDToRemove}`);
                
                remove(coursesRef);
               

      

    }


    const onSubmit5 = () => {
        /* if (!checkIfFormValid4()) {
             return;
             //da settare gli errori come fatto per i form di login e registrazione
         }*/
     
                 let Clength=channels.length;
                
                 
                 let channelIDToRemove;
                 for(let i=0;i<Clength;i++)
                 {
                     console.log(channels[i].value);
                     console.log(ChannelsRemoveState.name);
                    if(channels[i].value==ChannelsRemoveState.name)
                    channelIDToRemove=channels[i].id;
                 }
                 //console.log(courseIDToRemove);
                 const dbRef = ref(getDatabase());
                 const channelRef=child(dbRef, `channels/${channelIDToRemove}`);
                 
                 remove(channelRef);
                
 
       
 
     }
 





    
    const handleInput = (event) => {
        let target =event.target //cioè l'elemento con cui l'utente sta interagendo
        setchannelAddState((currentState) => {
            let updatedState ={...currentState}  //usando lo spread operator vado a creare un clone di currentState 
            updatedState[target.name] = target.value;
            return updatedState;
        })
    }

    const handleInput2 = (event) => {
        let target =event.target //cioè l'elemento con cui l'utente sta interagendo
        setCourseAddState((currentState) => {
            let updatedState ={...currentState}  //usando lo spread operator vado a creare un clone di currentState 
            updatedState[target.name] = target.value;
            return updatedState;
        })
    }

    const handleInput3 = (event) => {
        let target =event.target //cioè l'elemento con cui l'utente sta interagendo
       
        
        let vettTarget=[];
        vettTarget.push(target);
       
        setCourseState((currentState) => {
            let updatedState ={...currentState}  //usando lo spread operator vado a creare un clone di currentState 
           
            updatedState.name = vettTarget[0].innerText;
            
            return updatedState;
        })
    }

    const handleInput4 = (event) => {
        let target =event.target //cioè l'elemento con cui l'utente sta interagendo
       
        
        let vettTarget=[];
        vettTarget.push(target);
       
        setChannelsRemoveState((currentState) => {
            let updatedState ={...currentState}  //usando lo spread operator vado a creare un clone di currentState 
           
            updatedState.name = vettTarget[0].innerText;
            
            return updatedState;
        })
    }

    



    //{SetTheUser()}
    if(props.user)
    {
        if (props.user.email===adminMail)
        {
            return <><Menu.Menu>
                <Menu.Item style={{fontSize: '17px'}}>
                    <span className='clickable'   onClick={openModal}>
                        <Icon name="add"/> Aggiungi Canale
                    </span>
                </Menu.Item>
                <Menu.Item style={{fontSize: '17px'}}>
                    <span className='clickable'   onClick={openModal2}>
                        <Icon name="delete"/> Rimuovi Canale
                    </span>
                </Menu.Item>
                <Menu.Item style={{fontSize: '17px'}}>
                    <span className='clickable'   onClick={openModal3}>
                        <Icon name="add"/> Aggiungi Corso di Studi
                    </span>
                </Menu.Item>
                <Menu.Item style={{fontSize: '17px'}}>
                    <span className='clickable'   onClick={openModal4}>
                        <Icon name="delete"/> Rimuovi Corso di Studi
                    </span>
                </Menu.Item>
                
                <Menu.Item>
                    <span>
                        <Icon name="exchange"/> Canali esistenti              
                    </span>
                    ({ChannelsState.length})
                </Menu.Item>
                
                {displayChannels()}
                
            </Menu.Menu>
            <Modal open={modalOpenState} onClose={closeModal}>
                <Modal.Header>
                    Crea Canale
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit}>
                        <Segment stacked>
                            <Form.Input
                                name="name"
                                value={channelAddState.name}
                                onChange={handleInput}
                                type="text"
                                placeholder="Inserisci il nome del canale"
                            />
                            <Form.Input
                                name="description"
                                value={channelAddState.description}
                                onChange={handleInput}
                                type="text"
                                placeholder="Inserisci la descrizione del canale"
                            />
                            <Dropdown
                            name="courseRemove" 
                            fluid
                            search
                            selection
                            options={courses}
                            onChange={handleInput3}
                            placeholder={CourseState.name}
                             />   
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button loading={isLoading} onClick={onSubmit}>
                        <Icon name="checkmark"/> Salva
                    </Button>
                    <Button onClick={closeModal}>
                        <Icon name="remove"/> Annulla
                    </Button>
                </Modal.Actions>
            </Modal>



            <Modal open={modalOpenState2} onClose={closeModal2}>
                <Modal.Header>
                    Rimuovi Canale
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit5}>
                        <Segment stacked>
                        <Dropdown
                            name="channelRemove" 
                            fluid
                            search
                            selection
                            options={channels}
                            onChange={handleInput4}
                            placeholder={ChannelsRemoveState.name}
                            />    
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button loading={isLoading} onClick={onSubmit5}>
                        <Icon name="checkmark"/> Salva
                    </Button>
                    <Button onClick={closeModal2}>
                        <Icon name="remove"/> Annulla
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal open={modalOpenState3} onClose={closeModal3}>
                <Modal.Header>
                    Aggiungi Corso di Laurea
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit3}>
                        <Segment stacked>
                            <Form.Input
                                name="name"
                                value={CourseAddState.name}
                                onChange={handleInput2}
                                type="text"
                                placeholder="Inserisci corso di laurea"
                            />
                            <Form.Input
                                name="years"
                                value={CourseAddState.years}
                                onChange={handleInput2}
                                type="text"
                                placeholder="Inserisci l'anno di corso"
                            />
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button loading={isLoading} onClick={onSubmit3}>
                        <Icon name="checkmark"/> Salva
                    </Button>
                    <Button onClick={closeModal3}>
                        <Icon name="remove"/> Annulla
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal open={modalOpenState4} onClose={closeModal4}>
                <Modal.Header>
                    Rimuovi Corso di Laurea
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit4}>
                        <Segment stacked>    
                            <Dropdown
                            name="courseRemove" 
                            fluid
                            search
                            selection
                            options={courses}
                            onChange={handleInput3}
                            placeholder={CourseState.name}
                             />      
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button loading={isLoading} onClick={onSubmit4}>
                        <Icon name="checkmark"/> Salva
                    </Button>
                    <Button onClick={closeModal4}>
                        <Icon name="remove"/> Annulla
                    </Button>
                </Modal.Actions>
            </Modal>


           
        </>


        }
        else 
        {

            newArraylenght();
            return <><Menu.Menu>    
                <Menu.Item style={{fontSize: '17px'}}>
                    <span>
                        <Icon name="exchange"/> Canali              
                    </span>
                    ({newArray.length})
                </Menu.Item>    
                {displayChannels()}   
                </Menu.Menu>
        </>

        }
    }

   /* if(props.user)
     {console.log(props.user.email);}*/
    
   /* return <><Menu.Menu>
            <Menu.Item>
                <span>
                    <Icon name="exchange"/> Channels              
                </span>
                ({ChannelsState.length})
            </Menu.Item>
            
            {displayChannels()}
            <Menu.Item>
                <span className='clickable'   onClick={openModal}>
                    <Icon name="add"/> ADD
                </span>
            </Menu.Item>
        </Menu.Menu>
        <Modal open={modalOpenState} onClose={closeModal}>
            <Modal.Header>
                Create Channel
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="name"
                            value={channelAddState.name}
                            onChange={handleInput}
                            type="text"
                            placeholder="Inserisci il nome del canale"
                        />
                        <Form.Input
                            name="description"
                            value={channelAddState.description}
                            onChange={handleInput}
                            type="text"
                            placeholder="Inserisci la descrizione del canale"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button loading={isLoading} onClick={onSubmit}>
                    <Icon name="checkmark"/> Save
                </Button>
                <Button onClick={closeModal}>
                    <Icon name="remove"/> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    </>
*/


}



// prendo da redux store le inforazioni dell'utente loggato per inserire le informazioni di chi ha creato il canale
const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectChannel: (channel) => dispatch(setChannel(channel))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Channels); //metto connect per avere accesso al redux store