import { IonToast, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton, IonLoading } from '@ionic/react';
import { useState } from 'react';
import { loginUser } from '../firebase';
import useAuthRedirect from '../components/authRedirect';

const Login: React.FC = () => {
  useAuthRedirect();
  const [busy, setBusy] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMsg, setToastMsg] = useState(''); 

  async function login() {
    setBusy(true)
    if(password.trim() === '' || email.trim() === ''){
      setToastMsg('You must fill in all the fields')
      if(password.length < 6) {
      setToastMsg('Password must be at least 6 characters')
      }
    }
    const res = await loginUser(email, password);
    if (!res) {
      setToastMsg('Oops Failed to login');
    } else {
      useAuthRedirect();
      setToastMsg('Logged in');
    }
    setTimeout(() => {
      setBusy(false)
    }, 3000);
  }

  const [showToast, setShowToast] = useState(false);

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Login</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonLoading message="Please wait. ." duration={0} isOpen={busy}/>
    <IonContent fullscreen>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <IonTitle size='large'>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList class='ion-margin'>
          <IonItem>
            <IonInput
              required
              onIonChange={(e: any) => setEmail(e.target.value)}
              class='ion-padding'
              placeholder='Email'
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              required
              onIonChange={(e: any) => setPassword(e.target.value)}
              class='ion-padding'
              type='password'
              placeholder='Password'
            ></IonInput>
          </IonItem>
            <IonButton
              className='ion-margin-top'
              color='success'
              shape='round'
              expand='full'
              onClick={() => {
                login();
                setShowToast(true);
              }}
            >
              Login
            </IonButton>
            
            <IonButton
              routerLink='/register'
              color='medium'
              fill='clear'
              shape='round'
              expand='full'
            >
              Don't have an account? Sign up
            </IonButton>
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
};

export default Login;
