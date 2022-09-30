import classNames from 'classnames';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Breadcrumbs.css';

export function Breadcrumbs () {
  const location = useLocation();
  const navigate = useNavigate();

  const partsRaw = useMemo(
    () => location.pathname.substring(1).split('/').filter(p => p.length > 0),
    [location]
  );

  const parts = useMemo(
    () => ['home', ...partsRaw],
    [partsRaw]
  );

  const paths = partsRaw.reduce<string[]>(
    (acc, part) => [...acc, `${acc[acc.length - 1] ?? ''}${part}/`],
    ['/']
  );

  return (
    parts.length > 1 ?
    <div className='breadcrumbs'>{
      parts
        .map((part, i) => [
          <span
            className={classNames('breadcrumbs-nav', i === parts.length - 1 ? 'highlight' : null)}
            onClick={i < parts.length - 1 ? () => navigate(paths[i]) : undefined}
          >
            {part}
          </span>,
          ...(i !== parts.length - 1 ? ['>'] : [])
        ])
        .flat()
    }</div> :
    <></>
  );
}
