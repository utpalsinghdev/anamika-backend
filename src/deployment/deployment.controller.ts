import { Controller, Get } from '@nestjs/common';
import { exec } from 'child_process';

@Controller('deployment')
export class DeploymentController {
    @Get()
    async deploy(): Promise<string> {
        try {
            await this.executeCommand('git stash');
            await this.executeCommand('git pull origin development');
            await this.executeCommand('npm run build');

            return 'Deployment done please wait for 2 minutes to reflect the changes';
        } catch (error) {
            console.error(`Deployment error: ${error}`);
            throw new Error('Deployment failed');
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
