import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  const homePage = () => {
    navigate('/');
  };

  const loginPage = () => {
    navigate('/login');
  };

  const signupPage = () => {
    navigate('/signup');
  };

  const setupPage = () => {
    navigate('/setup');
  };

  const chatPage = () => {
    navigate('/chat');
  };

  return { homePage, loginPage, signupPage, setupPage, chatPage };
}