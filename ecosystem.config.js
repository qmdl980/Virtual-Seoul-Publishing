"use strict";

module.exports = {
  apps: [
    {
      name: "vspe-backend",
      script: "./server.js",
      watch: false,
      instances: "max",
      exec_mode: "cluster",
      env: {
        PORT: "4001",
        NODE_ENV: "production",
      },
      time: true,
    },
  ],
};
