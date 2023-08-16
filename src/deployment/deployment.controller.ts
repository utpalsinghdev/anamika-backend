import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { exec } from 'child_process';

@Controller('deployment')
export class DeploymentController {
    @Get()
    @HttpCode(HttpStatus.OK)
    async deploy(): Promise<string> {
        this.backgroundDeployment();

        return 'Deployment started. Please wait for the changes to reflect.';
    }

    private async backgroundDeployment(): Promise<void> {
        try {
            await this.executeCommand('git stash');
            await this.executeCommand('git pull origin development');
            await this.executeCommand('npm run build');

            console.log('Deployment completed.');
        } catch (error) {
            console.error(`Deployment error: ${error}`);
        } finally {
            await this.executeCommand('pm2 restart all');
        }
    }

    private executeCommand(command: string): Promise<void> {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
