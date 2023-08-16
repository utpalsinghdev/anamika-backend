//src/prisma-client-exception.filter.ts

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const message = exception.message.replace(/\n/g, '')

    switch (exception.code) {
      case 'P2000': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2001': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2002': {
        const status = HttpStatus.CONFLICT
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2004': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2005': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2006': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2007': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2008': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2009': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2010': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2011': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2012': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2013': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2014': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2015': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2016': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2017': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2018': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2019': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2020': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2021': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2022': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2023': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2024': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      default:
        super.catch(exception, host)
        break
    }
  }
}
