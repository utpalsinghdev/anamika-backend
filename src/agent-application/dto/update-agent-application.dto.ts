import { PartialType } from '@nestjs/swagger';
import { CreateAgentApplicationDto } from './create-agent-application.dto';

export class UpdateAgentApplicationDto extends PartialType(CreateAgentApplicationDto) {}
