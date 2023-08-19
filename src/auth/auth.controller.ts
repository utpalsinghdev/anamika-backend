import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthDto } from './dto/admin-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/admin")
  adminLogin(@Body() createAuthDto: AdminAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post("/agent")
  agentLogin(@Body() createAuthDto: AdminAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post("/customer")
  customerLogin(@Body() createAuthDto: AdminAuthDto) {
    return this.authService.create(createAuthDto);
  }

}
