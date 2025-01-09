import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    default: 'user.swagger@example.com',
  })
  email: string;
  @ApiProperty({
    default: 'examplePasswordSendWithSwagger',
  })
  password: string;
}
