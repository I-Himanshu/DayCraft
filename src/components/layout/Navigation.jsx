
export const Navigation = ({ mobile = false, onNavClick }) => {
  const navItems = ['Schedule', 'Todos', 'Notes'];

  return (
    <nav className={`${mobile ? 'flex flex-col space-y-2' : 'flex gap-2 sm:gap-4'}`}>
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          onClick={onNavClick}
          className={`
            px-3 sm:px-4 py-2 rounded-lg text-secondary-600
            hover:bg-primary-500 hover:text-white
            transition-colors text-sm sm:text-base
            ${mobile ? 'block w-full' : ''}
          `}
        >
          {item}
        </a>
      ))}
    </nav>
  );
};