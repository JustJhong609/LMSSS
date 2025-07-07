import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonAlert,
  IonLoading,
  IonCheckbox,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isStudent, setIsStudent] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email) {
      setAlertHeader('Email Required');
      setAlertMessage('Please enter your email address');
      setShowAlert(true);
      return;
    }

    if (!password) {
      setAlertHeader('Password Required');
      setAlertMessage('Please enter your password');
      setShowAlert(true);
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setAlertHeader('Invalid Email');
      setAlertMessage('Please enter a valid email address');
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      if (password.length >= 6) {
        setAlertHeader('Login Successful');
        setAlertMessage(`Welcome ${isStudent ? 'Student' : 'Admin'}!`);
        setShowAlert(true);
      } else {
        setAlertHeader('Login Failed');
        setAlertMessage('Invalid password. Password must be at least 6 characters.');
        setShowAlert(true);
      }
    }, 2000);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" scrollY={false}>
        <div className="login-container">
          <IonCard className="soft-card">
            <IonCardContent>
              <IonGrid>
                <IonRow className="ion-justify-content-center">
                  <IonCol size="12" className="ion-text-center">
                    <h1 className="welcome-title">Welcome Back</h1>
                    <p className="welcome-subtitle">Hey! Good to see you again.</p>
                  </IonCol>
                </IonRow>

                {/* Email Input */}
                <IonRow>
                  <IonCol>
                    <IonItem className="soft-input" lines="none">
                      <IonLabel position="floating">Email Address</IonLabel>
                      <IonInput
                        type="email"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                        clearOnEdit={true}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>

                {/* Spacer between inputs */}
                <div className="input-spacer"></div>

                {/* Password Input */}
                <IonRow>
                  <IonCol>
                    <IonItem className="soft-input" lines="none">
                      <IonLabel position="floating">Password</IonLabel>
                      <IonInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                        clearOnEdit={true}
                      />
                    </IonItem>
                    <IonButton
                      fill="clear"
                      size="small"
                      className="show-password-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </IonButton>
                  </IonCol>
                </IonRow>

                {/* Spacer before role selection */}
                <div className="input-spacer-large"></div>

                {/* Role Selection */}
                <IonRow className="ion-justify-content-center">
                  <IonCol size="auto">
                    <IonItem lines="none" className="role-item">
                      <IonCheckbox 
                        checked={isStudent} 
                        onIonChange={() => setIsStudent(true)} 
                        slot="start" 
                      />
                      <IonLabel>Student</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol size="auto">
                    <IonItem lines="none" className="role-item">
                      <IonCheckbox 
                        checked={!isStudent} 
                        onIonChange={() => setIsStudent(false)} 
                        slot="start" 
                      />
                      <IonLabel>Admin</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                {/* Login Button */}
                <IonRow className="ion-margin-top">
                  <IonCol>
                    <IonButton
                      expand="block"
                      shape="round"
                      onClick={handleLogin}
                      className="login-btn"
                    >
                      LOGIN
                    </IonButton>
                  </IonCol>
                </IonRow>

                {/* Sign Up Link */}
                <IonRow className="ion-margin-top">
                  <IonCol className="ion-text-center">
                    <IonText color="medium">
                      Don't have an account? <br />
                      <IonButton fill="clear" size="small" routerLink="/signup">
                        CREATE ACCOUNT
                      </IonButton>
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertHeader}
          message={alertMessage}
          buttons={['OK']}
        />

        <IonLoading
          isOpen={isLoading}
          message={'Logging in...'}
          spinner="crescent"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;