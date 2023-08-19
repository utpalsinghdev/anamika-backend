import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  create(createAgentDto: CreateAgentDto) {
    /**
     * - Create a new agent
     * - Meanwhile, Approve the agent application
     * 
     * These tasks will run Parallelly
     * 
     * - Send an SMS to the agent
     * This will run in the background
     * 
     */

    return 'This action adds a new agent';
  }

  findAll() {
    return `This action returns all agent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
