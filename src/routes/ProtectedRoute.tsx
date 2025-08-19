import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  authed: boolean;
  children: JSX.Element;
};

export default function ProtectedRoute({ authed, children }: Props) {
  const location = useLocation();

  if (!authed) {
    return (
      <Navigate
        to="/auth/signin"
        state={{ from: location }} 
        replace
      />
    );
  }
  return children;
}