import { Router } from 'express';
import AppController from './controllers/AppController';

const routes = Router();

// Employeers
routes.get('/employeers', AppController.index);
routes.post('/employeer', AppController.insert);
routes.get('/employeer/:id', AppController.show);
routes.delete('/employeer/:id', AppController.delete);

// Medical Licences
routes.get('/medical-licenses', AppController.certificates);
routes.post('/medical-licenses/save', AppController.postCertificates);
routes.post('/check-pin/:id', AppController.pinValidate);

// Users
routes.get('/user/:id', AppController.getUser);
routes.post('/users', AppController.storeUser);

// Members
routes.post('/members', AppController.storeMember);
routes.get('/members/all', AppController.getMembers);

export default routes;