// src/components/FeedbackModal.tsx
import React from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/react';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import './FeedbackModal.css';

interface FeedbackModalProps {
  isOpen: boolean;
  message: string;
  isSuccess: boolean;
  onDidDismiss: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, message, isSuccess, onDidDismiss }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss} backdropDismiss={false} cssClass="feedback-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isSuccess ? 'Success' : 'Error'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="modal-content">
          <IonIcon icon={isSuccess ? checkmarkCircleOutline : closeCircleOutline} color={isSuccess ? 'success' : 'danger'} className="feedback-icon" />
          <p>{message}</p>
          <IonButton expand="block" onClick={onDidDismiss}>
            Close
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default FeedbackModal;