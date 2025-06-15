const typeSvgs = import.meta.glob("@/assets/images/types/*.svg", {
  eager: true,
});

const getTypeSvg = (type: string) => {
  const key = Object.keys(typeSvgs).find((key) => key.includes(type)) as string;
  return typeSvgs[key];
};

export const typeColorMap: Record<string, string> = {
  fire: "bg-pokemon-fire",
  water: "bg-pokemon-water",
  grass: "bg-pokemon-grass",
  electric: "bg-pokemon-electric",
  psychic: "bg-pokemon-psychic",
  ice: "bg-pokemon-ice",
  dragon: "bg-pokemon-dragon",
  dark: "bg-pokemon-dark",
  fairy: "bg-pokemon-fairy",
  normal: "bg-pokemon-normal",
  fighting: "bg-pokemon-fighting",
  flying: "bg-pokemon-flying",
  poison: "bg-pokemon-poison",
  ground: "bg-pokemon-ground",
  rock: "bg-pokemon-rock",
  bug: "bg-pokemon-bug",
  ghost: "bg-pokemon-ghost",
  steel: "bg-pokemon-steel",
};

export const typeBorderColorMap: Record<string, string> = {
  fire: "border-pokemon-fire",
  water: "border-pokemon-water",
  grass: "border-pokemon-grass",
  electric: "border-pokemon-electric",
  psychic: "border-pokemon-psychic",
  ice: "border-pokemon-ice",
  dragon: "border-pokemon-dragon",
  dark: "border-pokemon-dark",
  fairy: "border-pokemon-fairy",
  normal: "border-pokemon-normal",
  fighting: "border-pokemon-fighting",
  flying: "border-pokemon-flying",
  poison: "border-pokemon-poison",
  ground: "border-pokemon-ground",
  rock: "border-pokemon-rock",
  bug: "border-pokemon-bug",
  ghost: "border-pokemon-ghost",
  steel: "border-pokemon-steel",
};

export const typeImageMap: Record<string, any> = {
  fire: getTypeSvg("fire"),
  water: getTypeSvg("water"),
  grass: getTypeSvg("grass"),
  electric: getTypeSvg("electric"),
  psychic: getTypeSvg("psychic"),
  ice: getTypeSvg("ice"),
  dragon: getTypeSvg("dragon"),
  dark: getTypeSvg("dark"),
  fairy: getTypeSvg("fairy"),
  normal: getTypeSvg("normal"),
  fighting: getTypeSvg("fighting"),
  flying: getTypeSvg("flying"),
  poison: getTypeSvg("poison"),
  ground: getTypeSvg("ground"),
  rock: getTypeSvg("rock"),
  bug: getTypeSvg("bug"),
  ghost: getTypeSvg("ghost"),
  steel: getTypeSvg("steel"),
};
