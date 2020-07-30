import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '5031',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('5031');
  });

  it('should not be able to create two appointments on the same time', async () => {
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
