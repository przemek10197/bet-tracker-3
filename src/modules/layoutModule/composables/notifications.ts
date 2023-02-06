import { useStoreNotifications } from '@/modules/layoutModule/store/notifications.store';
import { NotificationTypes } from '@/modules/layoutModule/models/notification.models';

export function useNotifications() {
  const storeNotifications = useStoreNotifications();

  // BET NOTIFICATIONS
  const setBetWinNotification = (totalWin: number) => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      title: 'Gratulacje!',
      description: `Zakład rozstrzygnięty! Wygrałeś właśnie ${totalWin} PLN`,
    };

    storeNotifications.addNotification(notificationObject);
  };

  const setBetLostNotification = (totalLose: number) => {
    const notificationObject = {
      type: NotificationTypes.ERROR,
      title: 'Niestety!',
      description: `Zakład przegrany! Przegrywasz ${totalLose} PLN`,
    };

    storeNotifications.addNotification(notificationObject);
  };
  // END --- BET NOTIFICATIONS

  // LEG NOTIFICATIONS
  const setLegWinNotification = (fixtureName: string) => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      description: `Zakład na zdarzenie ${fixtureName} rozstrzygnięty!`,
    };

    storeNotifications.addNotification(notificationObject);
  };

  const setLegLostNotification = (fixtureName: string) => {
    const notificationObject = {
      type: NotificationTypes.ERROR,
      description: `Zakład na zdarzenie ${fixtureName} rozstrzygnięty!`,
    };

    storeNotifications.addNotification(notificationObject);
  };

  const setLegPushNotification = (fixtureName: string) => {
    const notificationObject = {
      type: NotificationTypes.WARNING,
      description: `Zakład na zdarzenie ${fixtureName} rozstrzygnięty!`,
    };

    storeNotifications.addNotification(notificationObject);
  };
  // END --- LEG NOTIFICATIONS

  // BET IMPORT NOTIFICATIONS
  const setBetImportSuccessfullNotification = () => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      description: 'Dodano zakład!',
    };

    storeNotifications.addNotification(notificationObject);
  };
  // END --- BET IMPORT NOTIFICATIONS

  // SETTINGS NOTIFICATIONS
  const setSettingsAccountAddSuccessfullNotification = (amount: number) => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      description: `Do konta dodano ${amount}!`,
    };

    storeNotifications.addNotification(notificationObject);
  };

  const setSettingsAccountSubtractSuccessfullNotification = (
    amount: number,
  ) => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      description: `Z konta odjęto ${amount}!`,
    };

    storeNotifications.addNotification(notificationObject);
  };
  // END -- SETTINGS NOTIFICATIONS

  // TARGET NOTIFICATIONS
  const setTargetAddNotification = () => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      description: 'Pomyślnie dodano nowy cel!',
    };

    storeNotifications.addNotification(notificationObject);
  };

  const setTargetRemoveNotification = () => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      description: 'Zamknięto cel!',
    };

    storeNotifications.addNotification(notificationObject);
  };
  // END --- TARGET NOTIFICATIONS

  // SINGLES NOTIFICATIONS
  const setSingleAddNotification = (fixtureName: string) => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      description: `Pomyślnie dodano zakład SOLO - ${fixtureName}`,
    };

    storeNotifications.addNotification(notificationObject);
  };

  const setSingleWinNotification = (totalWin: number) => {
    const notificationObject = {
      type: NotificationTypes.POSITIVE,
      description: `Gratulacje! Wygrywasz ${totalWin} z zakładu SOLO`,
    };

    storeNotifications.addNotification(notificationObject);
  };

  const setSingleLostNotification = (totalLose: number) => {
    const notificationObject = {
      type: NotificationTypes.ERROR,
      description: `Niestety! Przegrywasz ${totalLose} z zakładu SOLO`,
    };

    storeNotifications.addNotification(notificationObject);
  };

  const setSinglePushNotification = () => {
    const notificationObject = {
      type: NotificationTypes.WARNING,
      description: 'Pech! Zakład SOLO zwrócony',
    };

    storeNotifications.addNotification(notificationObject);
  };
  // END --- SINGLES NOTIFICATIONS

  return {
    setBetLostNotification,
    setBetWinNotification,
    setLegWinNotification,
    setLegLostNotification,
    setLegPushNotification,
    setBetImportSuccessfullNotification,
    setSettingsAccountAddSuccessfullNotification,
    setSettingsAccountSubtractSuccessfullNotification,
    setTargetAddNotification,
    setTargetRemoveNotification,
    setSingleAddNotification,
    setSingleWinNotification,
    setSingleLostNotification,
    setSinglePushNotification,
  };
}
