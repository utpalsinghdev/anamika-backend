import { Controller, Get, Post, Body, Patch, Res, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/admin-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Response } from 'express';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("/add/admin")
  async CreateAdmin(@Body() body: CreateAdminDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'New Admin Created Successfully',
        data: await this.authService.createAdmin(body)
      }
    }
    catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server Error",
        data: null
      }
    }

  }
  @Post("/admin")
  @HttpCode(200)
  async adminLogin(@Body() createAuthDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'Logged In Successfully',
        data: await this.authService.admin(createAuthDto)
      }
    }
    catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server Error",
        data: null
      }
    }
  }

  @Post("/agent")
  async agentLogin(@Body() createAuthDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'Logged In Successfully',
        data: await this.authService.agent(createAuthDto)
      }
    }
    catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server Error",
        data: null
      }
    }
  }
  @Get("/dashboard")
  async adminDash(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'data fetched In Successfully',
        data: await this.authService.adminDash()
      }
    }
    catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server Error",
        data: null
      }
    }
  }
  @Get("/profile/:id")
  async profile(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'Profile fetched In Successfully',
        data: await this.authService.profile(+id)
      }
    }
    catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server Error",
        data: null
      }
    }
  }
  @Get("/customer-profile/:id")
  async cprofile(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'Profile fetched In Successfully',
        data: await this.authService.cprofile(+id)
      }
    }
    catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server Error",
        data: null
      }
    }
  }



  @Post("/customer")
  async customerLogin(@Body() createAuthDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'Logged In Successfully',
        data: await this.authService.customer(createAuthDto)
      }
    }
    catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server Error",
        data: null
      }
    }
  }

}
