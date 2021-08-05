import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
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

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Pokemons)
  @JoinColumn()
  pokemon: Pokemons;
}
