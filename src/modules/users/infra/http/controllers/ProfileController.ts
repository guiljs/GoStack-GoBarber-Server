import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const profile = await showProfile.execute(request.user.id);
    delete profile.password;
    return response.json(profile);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const updatedProfile = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    delete updatedProfile.password;

    return response.json(updatedProfile);
  }
}
