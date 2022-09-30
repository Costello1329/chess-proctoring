import { Navigate } from 'react-router-dom';

export interface RedirectIfProps {
  condition: boolean,
  path: string,
  children: React.ReactNode
};

export function RedirectIf ({
  condition,
  path,
  children
}: RedirectIfProps) {
  return condition ? <Navigate to={path} /> : <>{children}</>;
}
