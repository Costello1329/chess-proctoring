import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { UserBadge } from '../UserBadge/UserBadge';
import './Header.css';

export function Header () {
  return (
    <>
      <header>
        <h1>Chess Proctoring</h1>
        <UserBadge />
      </header>
      <Breadcrumbs />
    </>
  );
}
