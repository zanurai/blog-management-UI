import { getProfileData } from "@/service/profile/profile-api";
import { useMutation } from "@tanstack/react-query";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserProfileContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProfileContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("user", user);
  const getProfile = useMutation({
    mutationFn: getProfileData,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {},
  });
  useEffect(() => {
    getProfile.mutate();
  }, []);

  return (
    <UserProfileContext.Provider value={{ user, setUser }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const UserProfile = (): UserContextType => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error(
      "useUserProfile must be used within a UserProfileContextProvider"
    );
  }
  return context;
};
