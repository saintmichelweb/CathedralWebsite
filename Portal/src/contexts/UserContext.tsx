import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { ServerUser } from '../types/users'

interface UserContextProps {
  loggedUser: ServerUser | null,
  setLoggedUser: React.Dispatch<React.SetStateAction<ServerUser | null>>
}

export const UserContext = createContext<UserContextProps | null>(null)

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('`useUserContext` hook must be called inside `UserProvider`')
  }

  return context
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<ServerUser | null>(null)

  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <UserContext.Provider value={{ loggedUser, setLoggedUser }}>{children}</UserContext.Provider>
}

export default UserProvider
