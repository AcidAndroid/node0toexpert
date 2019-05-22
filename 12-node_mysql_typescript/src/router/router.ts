import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, resp: Response) => {
	const id = req.params.id;

	const qry: string = 'select * from heroes';

	MySQL.ejecutarQuery(qry, (err: any, heroes: any) => {
		if (err) {
			return resp.json({
				ok: false,
				error: err
			});
		}

		return resp.json({
			ok: true,
			heroes
		});
	});
});

router.get('/heroes/:id', (req: Request, resp: Response) => {
    const id = req.params.id;
        

	const qry: string = 'select * from heroes where idheroes=' +  MySQL.instance.cnn.escape(id);

	MySQL.ejecutarQuery(qry, (err: any, heroes: any) => {

        if(err){
            return resp.json({
                ok:false
                ,error:err
            })
        }

        return resp.json({
            ok:true
            ,heroes
        })

    });

	
});

export default router;
