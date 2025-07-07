// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  useIonToast,
} from '@ionic/react';
import FeedbackModal from '../components/FeedbackModal';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [present] = useIonToast();

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      present({
        message: 'Please enter both email and password.',
        duration: 2000,
        color: 'danger',
      });
      return;
    }

    // Mock login logic
    if (email === 'test@example.com' && password === 'password') {
      setModalMessage('Login Successful! Welcome back.');
      setModalSuccess(true);
      setShowModal(true);
    } else {
      setModalMessage('Invalid credentials. Please try again.');
      setModalSuccess(false);
      setShowModal(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="6" size-lg="4">
              <div className="login-container">
                <h2>Welcome Back</h2>
                <p>Sign in to continue</p>
                <IonInput
                  label="Email"
                  labelPlacement="floating"
                  fill="outline"
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  className="ion-margin-bottom"
                />
                <IonInput
                  label="Password"
                  labelPlacement="floating"
                  fill="outline"
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  className="ion-margin-bottom"
                />
                <IonButton expand="block" onClick={handleLogin}>
                  Login
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <FeedbackModal
          isOpen={showModal}
          message={modalMessage}
          isSuccess={modalSuccess}
          onDidDismiss={() => setShowModal(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;