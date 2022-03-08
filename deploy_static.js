const shell = require("shelljs");

// shell.mkdir(
//   "-p",
//   "/usr/local/share/applications/icn3d/_next",
//   "/usr/local/share/applications/icn3d/public"
// );

// shell.cp("-r", ".next", "/usr/local/share/applications/icn3d/_next");
// shell.cp("-r", "public", "/usr/local/share/applications/icn3d/public");

shell.exec("sudo cp -r .next/. /usr/local/share/applications/icn3d/_next");
shell.exec("sudo cp -r public/. /usr/local/share/applications/icn3d/public");

// shell.exit(1);
