import { useEffect, useState } from 'react';
import { IonButton, IonToast, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonLoading, IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';
import { getCurrentUser, signOutUser, resendVerification } from '../firebase';
import { useHistory } from 'react-router';
import CountdownTimer from '../components/timer';

const Verify: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)
  const [wait, setWait] = useState<boolean>(false)
  const [userName, setUserName] = useState('');

  const history = useHistory()

  useEffect(() => {
    setBusy(true)
    getCurrentUser().then((user:any) => {
     if(user.emailVerified){
      history.push('/dashboard'); 
     }
      setUserName(user.displayName)
    });
    setBusy(false)
  }, []
  );

  const [showToast, setShowToast] = useState(false);

  const handleLogout = () => {
    signOutUser().then(() => {
      setShowToast(true);
      history.push('/'); 
    }).catch((error: any) => {
      console.log(error);
    });
  };

  const resendVer = () => {
    getCurrentUser().then((user:any) => {
      (user.email)
      setBusy(true);
      setWait(true)
      resendVerification(user.email).then(() => {
      setBusy(false);
      setTimeout(() => {
        setWait(false);
      }, 60000); 
      }).catch((error: any) => {
        setBusy(false);
        console.log(error);
      });
  })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Verify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait. ." duration={0} isOpen={busy}/>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Welcome {userName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol>
              <div className='ion-text-center'>
                <h1><b>Verify Your Email</b></h1>
                <h5>Check your email & click the link to activate your account.</h5>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='8' offset='2'>
              <IonImg src='./src/assets/email.png' alt='email illustration' className='ion-margin-top'/>
            </IonCol>
          </IonRow>
        </IonGrid>    
          <IonToast
            isOpen={showToast}
            message={'See you soon'}
            duration={2000}
            onDidDismiss={() => setShowToast(false)}
          />
        </IonContent>  
      </IonContent>
      <IonFooter>
        {wait && 
        <p className='ion-text-center ion-padding'>
          Please wait {<CountdownTimer initialCounter={60} />}s until you can resend verification email again
        </p>}
      <IonButton
        className='ion-margin-top'
        color='secondary'
        shape='round'
        expand='full'
        onClick={() => {resendVer()}}
        disabled={wait}
      >
        Resend Email
      </IonButton>
      <IonButton
          className='ion-margin-top'
          color='danger'
          shape='round'
          expand='full'
          fill="outline"
          onClick={handleLogout}
        >
          Sign Up with a different email
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Verify;
