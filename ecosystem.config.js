module.exports = {
    apps: [
        {
            name: 'ISAPAPI',
            kill_timeout: 10000,
            script: './src/index.ts',
            instances: 4,
            exec_mode: 'cluster',
            autorestart: true,
            wait_ready: true,
            watch: false,
            watch_options: {
                usePolling: true,
            },
            error_file: './err.log',
            out_file: './out.log',
            node_args: [],
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
        },
    },
};
