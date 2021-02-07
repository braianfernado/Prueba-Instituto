
const express = require('express');
const router=express.Router();

const mysql = require("mysql");



const db =mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSSWORD,
    database: process.env.DATABASE

});

router.get('/', (req, res)=>{
res.render('index');

});

router.get('/register', (req, res)=>{
    res.render('register');
    
    });

    router.get('/login', (req, res)=>{
        res.render('login');
        
        });

        router.get('/user', (req, res)=>{    

            db.query('select * from servicios' ,  (error, results)=>
            {
               
                res.render('user',{results});
               
             });
                

            });

            router.get('/admin', (req, res)=>{    

                db.query('select * from servicios' ,  (error, results)=>
                {
                    res.render('admin',{results});    
                 });               
    
                });

                router.get('/delete/:id_servicios', async(req,res)=> {
    
                    console.log(req.params);
                    const{id_servicios}=req.params;

                    await db.query('delete from servicios where id_servicios= ?', [id_servicios]);
                    res.redirect('/admin');
                 
                 });

            

                 




                 router.get('/editar/:id_servicios', (req, res)=>{
                  
                    const {id_servicios } =req.params;
                    
                    db.query('select * from servicios where id_servicios= ?',[id_servicios] ,  (error, results)=>
                    {

                        const data =results[0];

                        console.log(data);
                        res.render('editar',{data});   

                     });               
        
                    });

                    router.get('/agregarservicio', (req, res)=>{
                        res.render('agregarservicio');
                        
                        });

module.exports = router;