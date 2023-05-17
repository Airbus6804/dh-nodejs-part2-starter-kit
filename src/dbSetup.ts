import pgPromise from "pg-promise";
import dotenv from 'dotenv';

dotenv.config()

console.log(process.env.PG_DATABASE);


const db = pgPromise()({
    host:'127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
})

const setupDb = async () => {
    await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
    )

    `)

    await writePlanet()

    const planets = await db.many(`
        SELECT * FROM planets;
    `)

    console.log(planets);
    
}

const writePlanet = async () => {
    await db.none(`
    INSERT INTO planets (name) VALUES ('Jupiter');
    `)
}







export {db, setupDb}