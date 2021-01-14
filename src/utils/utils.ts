import { getConnectionOptions, getConnection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Logger } from '@nestjs/common';

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>(resolve => {
    resolve(data);
  });
};


export const comparePasswords = async (userPassword, currentPassword) => {
  const prueba = await bcrypt.hash(currentPassword, 10);
  console.log(prueba);
 // console.log(userPassword);
  return await bcrypt.compare(currentPassword, userPassword);
};
