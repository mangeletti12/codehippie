
export class Superheroes {
    attributionHTML: string;
    attributionText: string;
    code: number;
    copyright: string;
    data: SuperheroesData;
    etag: string;
    status: string;

    //
    constructor(init?: Partial<Superheroes>) {
        Object.assign(this, init);
    }
}

export class SuperheroesData {
    count: number;
    limit: number;
    offset: number;
    results: any[];
    total: number;
}

export class Hero {
    id?: number;
    name: string;
    modifiedDate: Date;
    comics: number;
}

export class HeroResponse {
    data: any[];
    page: number;
}

// export class SuperheroesResults {

// }