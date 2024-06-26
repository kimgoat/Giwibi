const customMediaQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

const media = {
  custom: customMediaQuery,
  tablet: customMediaQuery(768),
  desktop: customMediaQuery(1024),
};

export default media;
