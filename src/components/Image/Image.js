function Image(props) {
  return (
    <img
      {...{
        alt: '',
        ...props,
      }}
    />
  );
}

export default Image;
