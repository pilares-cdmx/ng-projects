import {Request, Response } from 'express';

import pool from '../database';


class GamesController {

    public async list(req: Request, res: Response) {
        const games = await pool.query('SELECT * from games');
        res.json(games);
        // res.json({text: 'Listando juegos'});
    }

    public async create (req: Request, res: Response): Promise<void> {
        // console.log(req.body);
        await pool.query('INSERT INTO games set ?', [req.body]);       
        res.json({message: 'Juego Guardado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        // res.json({text: 'deleting a game' + req.params.id });
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'El juego ha sido eliminado'});
    }

    public async update (req: Request, res: Response): Promise<void> {
        // res.json({text: 'Updating a game' + req.params.id });
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'El juegopa ha sido actualizado'});
    }

    public async getOne (req: Request, res: Response): Promise<any> {
        // res.json({text: 'Este es el juego ' + req.params.id });
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        
        if(games.length > 0) {
            return res.json(games[0]);
        }
        console.log(games);
        res.status(404).json({text: 'El juego no existe en nuestra base'});
        
    }

}
const gamesController = new GamesController();

export default gamesController;