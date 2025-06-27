import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonIcon,
  IonModal,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLoading
} from '@ionic/react';
import { lockClosed, mail, close, alertCircle, checkmarkCircle } from 'ionicons/icons';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalIcon, setModalIcon] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Successful login
      showFeedbackModal(
        'Welcome!',
        'You have successfully logged in.',
        checkmarkCircle
      );
    } catch (error) {
      // Failed login
      showFeedbackModal(
        'Login Failed',
        'Invalid email or password. Please try again.',
        alertCircle
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!email) {
      showFeedbackModal(
        'Validation Error',
        'Please enter your email address.',
        alertCircle
      );
      return false;
    }

    if (!password) {
      showFeedbackModal(
        'Validation Error',
        'Please enter your password.',
        alertCircle
      );
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showFeedbackModal(
        'Validation Error',
        'Please enter a valid email address.',
        alertCircle
      );
      return false;
    }

    return true;
  };

  const showFeedbackModal = (title: string, message: string, icon: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalIcon(icon);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding">
        <div className="login-container">
          <IonCard className="login-card">
            <IonCardHeader>
              <IonCardTitle className="text-center">Welcome Back</IonCardTitle>
            </IonCardHeader>
            
            <IonCardContent>
              <IonItem className="ion-margin-bottom">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={e => setEmail(e.detail.value!)}
                  placeholder="your@email.com"
                />
                <IonIcon slot="end" icon={mail} />
              </IonItem>
              
              <IonItem className="ion-margin-bottom">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={e => setPassword(e.detail.value!)}
                  placeholder="••••••••"
                />
                <IonIcon slot="end" icon={lockClosed} />
              </IonItem>
              
              <IonButton
                expand="block"
                onClick={handleLogin}
                className="ion-margin-top"
              >
                Login
              </IonButton>
              
              <div className="ion-text-center ion-margin-top">
                <IonButton fill="clear" routerLink="/forgot-password">
                  Forgot Password?
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      
      {/* Feedback Modal */}
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar color={modalIcon === alertCircle ? 'danger' : 'success'}>
            <IonTitle>{modalTitle}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="modal-content">
            <IonIcon
              icon={modalIcon}
              size="large"
              color={modalIcon === alertCircle ? 'danger' : 'success'}
              className="modal-icon"
            />
            <p>{modalMessage}</p>
            <IonButton
              expand="block"
              onClick={() => setShowModal(false)}
              className="ion-margin-top"
            >
              OK
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
      
      {/* Loading Spinner */}
      <IonLoading isOpen={isLoading} message="Authenticating..." />
    </IonPage>
  );
};

export default Login;