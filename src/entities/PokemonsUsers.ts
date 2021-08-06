import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Pokemons from "./Pokemons";
import User from "./User";

@Entity("pokemons_users")
export default class PokemonsUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: number;

  @ManyToOne(() => User, (user) => user.pokemonsUser)
  user: User;

  @ManyToOne(() => Pokemons, (pokemon) => pokemon.pokemons)
  pokemon: Pokemons;
}
