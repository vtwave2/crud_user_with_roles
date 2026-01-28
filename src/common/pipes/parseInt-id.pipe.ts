import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      //eslint-disable-next-line
      return value;
    }
    const intId = Number(value);

    if (isNaN(intId)) {
      throw new BadRequestException('Param id is not a valid number');
    }
    if (intId < 0) {
      throw new BadRequestException('Param id is not a valid number');
    }

    return intId;
  }
}
