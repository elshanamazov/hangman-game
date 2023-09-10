export const darkModehandle = () => {
  const themeSwitcher = document.getElementById('theme-switcher');
  const themeSwitcherText = document.querySelector('.theme-switcher__text ');
  const htmlNode = document.documentElement;

  if (localStorage.getItem('mode') === 'dark') {
    htmlNode.classList.add('dark');
    themeSwitcher.checked = true;
    themeSwitcherText.innerHTML = 'Dark mode';
  }

  themeSwitcher.addEventListener('input', () => {
    htmlNode.classList.toggle('dark');

    if (htmlNode.classList.contains('dark')) {
      localStorage.setItem('mode', 'dark');
      themeSwitcherText.textContent = 'Dark mode';
    } else {
      localStorage.setItem('mode', 'light');
      themeSwitcherText.textContent = 'Light mode';
    }
  });
};
