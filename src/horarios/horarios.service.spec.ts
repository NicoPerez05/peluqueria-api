import { Test, TestingModule } from '@nestjs/testing';
import { HorariosService } from './horarios.service';
import { PrismaService } from '../prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';


const mockPrismaService = {
  horario: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}



describe('HorariosService', () => {
  let service: HorariosService;

  beforeEach(async () => {
    jest.clearAllMocks();


    const module: TestingModule = await Test.createTestingModule({
      providers: [HorariosService,
        { provide: PrismaService, useValue: mockPrismaService }
      ],
    }).compile();

    service = module.get<HorariosService>(HorariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // FIND_ALL TEST ----------------------------------------------
  it('findAll deberia retornar todos los horarios de todos los peluqueros', async () => {
    //Arrage
    const mockHorarios = [
      { id: 1, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: true, id_peluquero: 3 },
      { id: 4, fecha_hora: new Date('2026-02-25T15:34:00.000Z'), disponible: false, id_peluquero: 1 },
      { id: 5, fecha_hora: new Date('2026-02-25T15:34:00.000Z'), disponible: false, id_peluquero: 7 },
    ];
    mockPrismaService.horario.findMany.mockResolvedValue(mockHorarios);

    // ACT
    const result = await service.findAll();

    // Assert

    expect(result).toEqual(mockHorarios);
    expect(mockPrismaService.horario.findMany).toHaveBeenCalled();
  })
  // CREATE_HORARIO TEST -----------(CREAR MODO ADMIN)----------------------------
  it('create deberia crear en base de datos un registro con el horario del peluquero con su id,la fecha y su disponibilidad', async () => {
    // Arrange
    const mockHorariosCreado = { id: 2, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: true, id_peluquero: 3 }
    const dataInput = { fecha_hora: '2026-07-25T15:30:00.000Z', disponible: true, id_peluquero: 3 }
    const usuario = { id: 1, rol: 'ADMIN' };

    mockPrismaService.horario.create.mockResolvedValue(mockHorariosCreado);

    // ACT 
    const result = await service.createHorario(dataInput, usuario);

    // Assert 
    expect(result).toEqual(mockHorariosCreado)
    expect(mockPrismaService.horario.create).toHaveBeenCalled();

  })
  // CREATE_HORARIO TEST -----------(CREAR HORARIO MODO USUARIO NORMAL)----------------------------
  it('Deberia rechazar el create debido a que el usuario que manda tiene como Rol: Usuario', async () => {
    // Arrange
    const mockHorariosCreado = { id: 2, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: true, id_peluquero: 3 }
    const dataInput = { fecha_hora: '2026-07-25T15:30:00.000Z', disponible: true, id_peluquero: 3 }
    const usuario = { id: 4, rol: 'USUARIO' };

    mockPrismaService.horario.create.mockResolvedValue(mockHorariosCreado);

    // ACT  // Assert 
    await expect(service.createHorario(dataInput, usuario)).rejects.toThrow(ForbiddenException);
    expect(mockPrismaService.horario.create).not.toHaveBeenCalled();
  })


  // CREATE_HORARIO TEST -----------(CREAR HORARIO ROL PELUQUERO)----------------------------
  it('Create deberia funcionar con el rol de Peluquero teniendo en cuenta que los datos enviados coinciden los 2 id, tanto de id peluquero como el id del usuario', async () => {
    // Arrange
    const mockHorariosCreado = { id: 2, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: true, id_peluquero: 5 }
    const dataInput = { fecha_hora: '2026-07-25T15:30:00.000Z', disponible: true, id_peluquero: 5 }
    const usuario = { id: 5, rol: 'PELUQUERO' };

    mockPrismaService.horario.create.mockResolvedValue(mockHorariosCreado);

    // ACT 
    const result = await service.createHorario(dataInput, usuario);

    // Assert 
    expect(result).toEqual(mockHorariosCreado)
    expect(mockPrismaService.horario.create).toHaveBeenCalled();

  })

  // UPDATE_HORARIO TEST ----------------- (MODIFICAR CON EL ROL DE ADMIN) --------------

  // arrange 
  it('Update deberia funcionar con el rol de administrador teniendo en cuenta el rol', async () => {
    const horarioExistente = { id: 2, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: false, id_peluquero: 5 };
    const mockHorariosNuevo = { id: 2, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: false, id_peluquero: 5 }
    const dataUpdate = { disponible: false };
    const usuario = { id: 5, rol: 'ADMIN' };

    mockPrismaService.horario.findUnique.mockResolvedValue(horarioExistente);
    mockPrismaService.horario.update.mockResolvedValue(mockHorariosNuevo);
    // ACT
    const result = await service.updateHorario(dataUpdate, usuario, horarioExistente.id);

    // Assert

    expect(result).toEqual(mockHorariosNuevo);
    expect(mockPrismaService.horario.update).toHaveBeenCalled();
  })
  // UPDATE_HORARIO TEST ----------------- (CASO QUE NO SE ENCUENTRE EL HORARIO EN LA BASE DE DATOS) --------------

  it('Upadte deberia no funcionar ya que el dato a actualizar a buscar no se encuentra en la base de datos', async () => {
    const dataUpdate = { disponible: false };
    const idHorario = 10;
    const usuario = { id: 5, rol: 'ADMIN' };

    mockPrismaService.horario.findUnique.mockResolvedValue(null);
    await expect(service.updateHorario(dataUpdate, usuario, idHorario)).rejects.toThrow(NotFoundException);
    expect(mockPrismaService.horario.update).not.toHaveBeenCalled();
  })

// REMOVE -------------------- (Modo Administrador)--------------------------------------
  it('Remove deberia dejar eliminar un registro a la hora, ya que tiene rol para poder remover al horario (Rol Admin) ', async() => {
    const idHorario =  2;
    const horarioExistente = { id: 2, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: false, id_peluquero: 5 };
    const horarioEliminado = { id: 2, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: false, id_peluquero: 5 };
    const user = {id: 5 , rol: 'ADMIN'};

    mockPrismaService.horario.findUnique.mockResolvedValue(horarioExistente);
    mockPrismaService.horario.delete.mockResolvedValue(horarioEliminado);
    const result = await service.removeHorario(idHorario, user);

    expect(result).toEqual(horarioEliminado)
    expect(mockPrismaService.horario.delete).toHaveBeenCalled();
  })

// REMOVE -------------------- (Modo Usuario Normal)--------------------------------------

    it('Remove deberia rechazar el remover a la hora, ya quetiene rol para poder remover al horario (Rol Usuario) ', async() => {
    const idHorario =  2;
    const horarioExistente = { id: 2, fecha_hora: new Date('2026-07-25T15:30:00.000Z'), disponible: false, id_peluquero: 5 };
    const user = {id: 5 , rol: 'USUARIO'};

    mockPrismaService.horario.findUnique.mockResolvedValue(horarioExistente);
    
    await expect(service.removeHorario(idHorario, user)).rejects.toThrow(ForbiddenException);
    expect(mockPrismaService.horario.delete).not.toHaveBeenCalled();
    
    });
  
// REMOVE -------------------- (Con un Horario inexistente)--------------------------------------

    it('Remove deberia rechazar el remover a la hora, ya quetiene la hora no existe', async() => {
    const idHorario =  2;
    const user = {id: 5 , rol: 'ADMIN'};

    mockPrismaService.horario.findUnique.mockResolvedValue(null);
    
    await expect(service.removeHorario(idHorario, user)).rejects.toThrow(NotFoundException);
    expect(mockPrismaService.horario.delete).not.toHaveBeenCalled();
    });

});
