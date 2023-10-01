import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton, IonToast, IonLoading } from '@ionic/react';
import { useState } from 'react';
import { registerUser } from '../firebase'
import { useHistory } from 'react-router-dom';
import useAuthRedirect from '../components/authRedirect';

const Register: React.FC = () => {
  useAuthRedirect();
  const [busy, setBusy] = useState<boolean>(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [email, setEmail] = useState('')
  const [toastMsg, setToastMsg] = useState(''); 
  const history = useHistory();

  async function register() {
    setBusy(true)

    if(password.trim() === '' || username.trim() === '' || email.trim() === ''){
      setToastMsg('You must fill in all the fields')
      if(password.length < 6) {
        setToastMsg('Password must be at least 6 characters')
        if(password !== repassword){
          setToastMsg('Passwords do not match') 
        }
      }
      if(username.length < 3) {
        setToastMsg('Username must be at least 6 characters')
      }
    }
    
    const res = await registerUser(username, email, password)
    if (!res) {
      setToastMsg('Oops Failed to sign up'); 
    } else {
      setToastMsg('You have been registered');
    }
    history.replace('/verify');
    setBusy(false)
  }

  const [showToast, setShowToast] = useState(false);
  return (
    <IonPage>
      <IonHeader no-border>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait. ." duration={0} isOpen={busy}/>
      <IonContent fullscreen>
        <IonHeader collapse='condense' no-border>
          <IonToolbar>
            <IonTitle size='large'>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonList class='ion-margin'>
              <IonItem>
                  <IonInput required onIonChange={(e:any) => setUsername(e.target.value)} class='ion-padding' placeholder='Username'></IonInput>
              </IonItem>
              <IonItem>
                  <IonInput required onIonChange={(e:any) => setEmail(e.target.value)} class='ion-padding' type='email' placeholder='Email'></IonInput>
              </IonItem>
              <IonItem>
                  <IonInput required onIonChange={(e:any) => setPassword(e.target.value)} class='ion-padding' type='password' placeholder='Password'></IonInput>
              </IonItem>
              <IonItem>
                  <IonInput required onIonChange={(e:any) => setRepassword(e.target.value)} class='ion-padding' type='password' placeholder='Confirm Password'></IonInput>
              </IonItem>
              <IonButton className='ion-margin-top' id='btn' color='success' shape='round' expand='full' onClick={() => {register(); setShowToast(true);}}>Sign up</IonButton>
              <IonButton routerLink='/' color='medium' fill='clear' shape='round' expand='full'>Already have an account? Log in</IonButton>
            <IonToast
              isOpen={showToast}
              message={toastMsg}
              duration={2000}
              onDidDismiss={() => setShowToast(false)}
            />
          </IonList>
        </IonContent>
      </IonContent>
    </IonPage>
  );
}
export default Register;
