import { Request, Response, NextFunction } from 'express'
import moment from 'moment';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import db from '../config/database';

interface Employer {
  id: string,
  name: any,
  employer_code: Int16Array,
  employer: object,
}

class AppController {
  public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const employers = await db('employers')
      .select('*');

    if (employers) {
      return res.json(employers)
    }

    return res.json('Employers: lista vazia');

  }

  public async show(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { params } = req;

    const employer = await db('employers')
      .where({ id: params.id })
      .first();

    if (employer) {
      return res.json(`Employer: encontrado com sucesso. ${employer.employer_name.toUpperCase()}`)
    }

    return res.json('Employer: não existe com este ID');
  }

  public async insert(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { body } = req;

    await db('employers').insert({
      employer_name: body.employer_name,
      employer_code: crypto.randomBytes(13).toString('base64'),
      member_count: body.member_count,
      thumbnail: "https://qrpoint.com.br/wp-content/uploads/2018/12/cropped-MarcaVertical-03-1.png",
      register_date: moment()
    });

    return res.json({ status: `Employer: successfully created. ${body.employer_name}` });
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return res.json("Employeer delete")
  }

  public async storeUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { body } = req;

    await db('users').insert({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
    });

    return res.json({ status: `User: successfully created. ${body.name}` });
  }

  public async getUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { params } = req;

    const user = await db('users')
      .where({ id: params.id })
      .first();

    return res.json({ status: `User: found with name. ${user.name}`, user: { user } });
  }

  public async storeMember(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { body } = req;

    const member = await db('members').insert({
      user_id: body.user_id,
      pin_code: Math.floor(100000 + Math.random() * 900000),
      thumbnailHd: "https://qrpoint.com.br/wp-content/uploads/2018/12/cropped-MarcaVertical-03-1.png",
      birthday: moment(body.birthday)
    }).returning('*');

    member.map(async item => {
      await db('personal_data').insert({
        member_id: item.id,
        father: "Nome do pai",
        mother: "Nome da mãe",
        hand: true
      });
    });

    return res.json({ status: `Member: successfully created.`, member });
  }

  public async certificates(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const certificates = await db('certificates')
      .select('*');

    if (certificates) {
      return res.json({ status: `Atestados: encontrado com sucesso.`,  certificates });
    }

    return res.json({ status: 'Atestados: lista vazia' });
  }

  public async postCertificates(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { body } = req;

    const certificates = await db('certificates').insert({
      initial_date: moment(body.initial_date),
      final_date: moment(body.final_date),
      time: moment(body.initial_date).diff(body.final_date, 'minutes'),
      member_code: body.member_code,
    }).returning('*');

    return res.json({ status: `Cerficates: successfully created.`, certificates });
  }

  public async pinValidate(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { params } = req;

    const validate = await db('members')
    .join('personal_data', 'members.id', 'personal_data.member_id')
    .where({ pin_code: params.id })
    .first()
    .returning('*');

    if (validate) {
      return res.json({ validated: true, validate });
    }

    return res.json({ status: `pin_code: não encontrado.` });

  }

  public async getMembers(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const members = await db('members')
    .join('personal_data', 'members.id', 'personal_data.member_id')
    .returning('*');

    if (members) {
      return res.json({ members });
    }

    return res.json({ status: `Members: lista vazia.` });
  }
  
}

export default new AppController();