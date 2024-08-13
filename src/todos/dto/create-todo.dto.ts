import { IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: '제목은 문자열만 가능합니다.' })
  @MinLength(6, {
    message:
      '제목은 최소 $constraint1자 이상 작성해주세요. 입력된 글자 : $value',
  })
  @MaxLength(30, {
    message:
      '제목은 최대 $constraint1자를 넘을 수 없습니다. 입력된 글자 : $value',
  })
  todo: string;
  @IsBoolean({ message: 'Boolean타입만 가능합니다.' })
  is_done: boolean;
}
