import translateLeg from './translateLeg';

const translateRoutes = ({ summary, warnings, legs }) => ({
  summary,
  warnings,
  legs: legs.map(leg => translateLeg(leg)),
});

export default translateRoutes;
