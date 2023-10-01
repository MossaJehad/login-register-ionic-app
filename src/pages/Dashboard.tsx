import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader no-border>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense' no-border>
          <IonToolbar>
            <IonTitle size='large'>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
        Dashboard Content
        </IonContent>
      </IonContent>
    </IonPage>
  );
}
export default Dashboard;
