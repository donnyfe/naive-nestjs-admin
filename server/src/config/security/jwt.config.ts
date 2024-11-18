import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

/**
 * 配置JWT安全
 */
export const setupJwtSecurity = async (app: INestApplication, configService: ConfigService) => {
  const jwtModule = JwtModule.register({
    secret: configService.get('security.jwt.secret'),
    signOptions: {
      expiresIn: configService.get('security.jwt.expiresIn', '1h'),
      algorithm: 'HS256',
      issuer: 'nest-admin',
      audience: 'nest-admin-client',
    },
    verifyOptions: {
      algorithms: ['HS256'],
      issuer: 'nest-admin',
      audience: 'nest-admin-client',
    },
  })

  return jwtModule
}
