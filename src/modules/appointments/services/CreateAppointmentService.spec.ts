import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '5031',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('5031');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointmentDate = new Date(2020, 6, 21, 23);
    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '5031',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '5031',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
