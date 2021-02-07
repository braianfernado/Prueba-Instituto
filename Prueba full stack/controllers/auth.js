const mysql = require("mysql");
const jwt = require("jsonwebtoken");


const db =mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSSWORD,
    database: process.env.DATABASE

});



exports.login = async (req, res)=>{

    const { name, surname} =req.body;

    db.query('select * from usuarios where name = ? and surname= ?', [name,surname ], async(error, results)=>
    {
        if (!results|| name == results[0].name && surname == results[0].surname ) {
            
           const id_user=results[0].id_user;
           const token = jwt.sign({id_user}, process.env.JWT_SECRET,{

            expiresIn:process.env.JWK_SECRET_IN
               });
               console.log(token);

               const cookieOptions={
                   expires : new Date(
                       Date.now() + process.env.JWK_COOKIE_EXPIRES * 1 * 1 * 60 * 1000
                   ),
                   httpOnly: true
               }

               res.cookie('jwt', token, cookieOptions );

            
            const rol = results[0].rol;
            const id_admin = results[0].id_user;


            if ( rol == "Administrador") {
          
               // process.env.ID_ADMIN=id_admin;
               // console.log(process.env.ID_ADMIN);

                res.redirect("/admin");
               

            
              

            }else if( rol == "Usuario") {

                res.redirect("/user");

            } 
              

         }       
    })
};



exports.register = async(req, res)=>{

   // console.log(req.body);
    
    const { name, surname, rol } =req.body;

    const newusuario = {
        name,
        surname,
        rol
    };

  

   await db.query('INSERT INTO usuarios set ?', [newusuario]);

   res.redirect('/register');

};

exports.user =(req, res)=>{

  
    res.redirect('/user');
    
   

 };

 exports.admin =(req, res)=>{


    res.redirect('/user');
    

 };

 exports.editar= async (req, res)=>{
    const { servicio ,descripción} =req.body;
    const newservicio = {
        servicio,
        descripción
    };
    await db.query('UPDATE servicios SET  ? where  ?', [newservicio, req.params]);



    
  res.redirect('/admin');
    
 };
 
 exports.agregarservicio = async(req, res)=>{

   
    const { servicio ,descripción} =req.body;

    const newservicio = {
        servicio,
        descripción
    };

   await db.query('INSERT INTO servicios set ?', [newservicio]);

    res.redirect('/admin');

  
    
 };

 exports.index =(req, res)=>{


    res.redirect('/index');
    

 };