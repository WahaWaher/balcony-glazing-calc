function CheckIcon(props) {
  return (
    <svg
      {...{
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 18 18',
        ...props,
      }}
    >
      <path d="M5.1 8.2l2.4 4.9s4-9.9 10.2-13.1c-.2 2.3-.8 4.4.3 6.9-2.7.6-8.4 7.7-10.2 11.1-2.6-3.3-5.6-5.8-7.8-6.6z" />
    </svg>
  );
}

export default CheckIcon;
