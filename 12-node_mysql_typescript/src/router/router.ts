import { Router,Request,Response } from "express";

const router = Router()

router.get('/heroes',(req:Request,resp:Response)=>{

    resp.json({
        ok:true
        ,mensaje:"Hola Mundo"
    })

})

router.get('/heroes/:id',(req:Request,resp:Response)=>{

    const id = req.params.id

    resp.json({
        ok:true
        ,mensaje:`Id enviado: ${id}`
        ,id
    })

})

export default router