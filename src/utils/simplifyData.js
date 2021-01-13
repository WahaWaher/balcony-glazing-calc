const simplifyData = (data) => {
  const { design, dimensions, glazing, misc, discount } = data;

  return {
    design: Object.values(design).find((x) => x.checked),
    dimensions: {
      width: dimensions.width.value,
      height: dimensions.height.value,
    },
    glazing: Object.values(glazing).find((x) => x.checked),
    misc: Object.values(misc)
      .map((x) => (x.checked ? x : false))
      .filter(Boolean),
    discount,
  };
};

export default simplifyData;
