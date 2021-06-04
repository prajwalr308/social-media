import {auth,provider} from '../firebase'
import firebase from 'firebase'

export const signInWithGoogle =async()=>{
    let user;
    await auth.signInWithPopup(provider).then((res)=>{
        console.log(res.user);
        user=res.user;
       
        firebase.firestore().collection('USERS').doc(res.user.uid).set({ 
                email:user.email,
                name:user.displayName
               
            })
            
        
    }).catch((error)=>{
        console.log(error.message);
    });
    return user
}
export const logout =async()=>{
    let logout_success;
    await auth.signOut().then(()=>{
        logout_success=true;
     
      
    }).catch((error)=>{
        console.log(error.message);
    });
    return logout_success;
}
