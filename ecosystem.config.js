module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
    },
    {
      name: "nginx",
      script: "/usr/sbin/nginx",
      args: "-g 'daemon off;'",
      autorestart: true,
    },
  ],
};
