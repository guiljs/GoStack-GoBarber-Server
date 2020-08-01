import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const user_id = req.user.id;
    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute(user_id);
    providers.map(provider => delete provider.password);
    return resp.json(providers);
  }
}
