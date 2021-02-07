
const express = require('express');
const authController =require('../controllers/auth');
const router=express.Router();


router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/user', authController.user);

router.post('/admin', authController.admin);

//router.post('/delete', authController.admin);

router.post('/editar/:id_servicios', authController.editar);

router.post('/agregarservicio', authController.agregarservicio);

router.post('/index', authController.index);





    
module.exports = router;