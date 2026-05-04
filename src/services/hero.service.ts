import { heroes } from '../data/heroes.js';
import type { Hero } from '../data/heroes.js';



export const findHeroById = ( id: number ) => {
  return heroes.find( (hero: Hero) => hero.id === id );
}
