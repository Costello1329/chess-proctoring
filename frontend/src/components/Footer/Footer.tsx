import { Button } from '../Button/Button';
import './Footer.css';

export function Footer () {
  return (
    <footer>
      <p className='developed-by'>
        Developed by&nbsp;
        <a href='https://github.com/Costello1329'>Konstantin Leladze</a>
      </p>
      <Button
        appearance='secondary'
        type='button'
        text='Fork me on github'
        onClick={() => window.open('https://github.com/Costello1329/chess-proctoring')}
      />
    </footer>
  );
}
