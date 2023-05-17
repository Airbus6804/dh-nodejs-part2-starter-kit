import {db} from '../dbSetup.js';
import {Request, Response} from 'express';


const getAllPlanets = async (req: Request, res: Response) => {
    const planets = await db.many(`
        SELECT * FROM planets;
    `)
    res.status(200).json(planets);
}

export {getAllPlanets}



