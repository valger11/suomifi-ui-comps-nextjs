import { useRouter } from 'next/router';

function ActiveLink({ children, href }) {
  const router = useRouter();
  const className = router.asPath === href ? 'active' : '';

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default ActiveLink;
