import { IVacanca } from "./interfaces";

export class Vacanca implements IVacanca {

    id!: number;
    nom!: string;
    preu!: number;
    pais!: string;
    descripcio!: string;
    user!: string;

    constructor(vacanca: IVacanca) {
        Object.assign(this, vacanca);
    }

}

export class VacancaCollection extends Array {

    constructor(vacances: IVacanca[]) {
        super();
        const vacancaCollection: IVacanca[] = [];
        vacances.forEach((v: IVacanca) => {
            vacancaCollection.push(new Vacanca(v));
        });
        return vacancaCollection;
    }

}
