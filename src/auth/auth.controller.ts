import { Controller, Get, Post, Body, Patch, Res, Put, Param, UseGuards, Delete, HttpCode, Req, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/admin-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Response } from 'express';
import { PassworddDto } from './dto/agent-pass.dto';
import { UpdateAdminCredentialsDto } from './dto/update-admin-credentials.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from 'src/decoretors/role.decorator';
import { ROLE } from '@prisma/client';
import { Request } from 'express';
import { jwtDecode } from "jwt-decode";
@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(ROLE.ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Patch("/admin/credentials")
  async updateAdminCredentials(@Req() req: Request, @Body() body: UpdateAdminCredentialsDto, @Res({ passthrough: true }) res: Response) {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      return {
        success: true,
        message: 'Credentials updated successfully',
        data: await this.authService.updateAdminCredentials(+userId, body),
      };
    } catch (error) {
      res.status(error.status || 500);
      return {
        success: false,
        message: error.message || 'Internal Server Error',
        data: null,
      };
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
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

  async updateProfile(@Param('id') id: string, @Body() body: PassworddDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'Password Updated Successfully',
        data: await this.authService.update(+id, body)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.AGENT, ROLE.DEALERSHIP, ROLE.ADMIN, ROLE.FEILDOFFICER)
  @Get("/profile/:id")
  async profile(@Param('id') id: string, @Res({ passthrough: true }) res: Response, @Req() req: Request, @Headers() headers: Record<any, any>) {

    const token = headers.authorization.split(' ')[1];
    const decoded: any = jwtDecode(token);
    try {
      if (decoded.id != id) {
        console.log({
          decoded,
          id
        })
        throw new HttpException('Chutiya smjha hai kya gandu', HttpStatus.UNAUTHORIZED);
      }

      return {
        success: true,
        message: 'Profile fetched In Successfully',
        data: await this.authService.profile(+id)
      };
    } catch (error) {
      res.status(error.status || 500);
      return {
        success: false,
        message: error.message || 'Internal Server Error',
        data: null
      };
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.CUSTOMER)
  // @Put("/profile/:id")
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
