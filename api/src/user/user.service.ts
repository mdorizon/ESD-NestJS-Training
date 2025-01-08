import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.createQueryBuilder().getMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      // exclude password
      .addSelect('user.password', 'password')
      .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);

    const updateUser = {
      ...user,
      ...updateUserDto,
    };

    await this.userRepository.update(id, updateUser);

    return updateUser;
  }

  async remove(id: number): Promise<any> {
    await this.findOne(id);
    return this.userRepository.softDelete(id);
  }
}
