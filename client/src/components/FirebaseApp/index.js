import React from "react";

const firebaseContext = React.createContext();

const FirebaseAppProvider = (props) => {
  const { firebaseConfig, appName } = props;
  const firebaseApp =
    props.firebaseApp ||
    React.useMemo(() => {
      return firebase.apps.find((app) => app.name == appName);
    }, [appName]);
  return (
    <FirebaseAppProvider.Provider
      value={firebaseApp}></FirebaseAppProvider.Provider>
  );
};
