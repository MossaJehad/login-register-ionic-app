import { useEffect, useState } from 'react';
import { IonButton, IonToast, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter } from '@ionic/react';
import { getCurrentUser, signOutUser } from '../firebase';

const Dashboard: React.FC = () => {
const [toastMsg, setToastMsg] = useState(''); 
const [userName, setUserName] = useState('');

  useEffect(() => {
    getCurrentUser().then((user:any) => {
      setUserName(user.displayName)
      setToastMsg('See you soon')
    });
  }, []);

const [showToast, setShowToast] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <IonTitle size='large'>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent className='ion-padding'>

            <h1>Welcome {userName}</h1>
            
            <IonToast
              isOpen={showToast}
              message={toastMsg}
              duration={2000}
              onDidDismiss={() => setShowToast(false)}
            />
        </IonContent>  
      </IonContent>
      <IonFooter>
            <IonButton
                  className='ion-margin-top'
                  color='success'
                  shape='round'
                  expand='full'
                  onClick={() => {
                    signOutUser();
                    setShowToast(true);
                  }}
                >
                  Logout
              </IonButton>
        </IonFooter>
    </IonPage>
  );
};

export default Dashboard;
