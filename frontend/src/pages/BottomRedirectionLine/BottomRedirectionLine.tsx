import { useNavigate } from 'react-router-dom';
import './BottomRedirectionLine.css';

export interface BottomRedirectionLineProps {
  mainText: string;
  redirectText: string;
  redirectPath: string;
}

export function BottomRedirectionLine ({ mainText, redirectText, redirectPath }: BottomRedirectionLineProps) {
  const navigate = useNavigate();

  return (
    <div className='bottom-redirection-line'>
      {mainText} <span onClick={() => navigate(redirectPath)}>{redirectText}</span>
    </div>
  );
}
