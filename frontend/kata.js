const myfiles = {
  adminlayout: {
    Admin: "Admin.jsx",
  },
  homelayout: {
    Home: "Home.jsx",
    Login: "Login.jsx",
    Register: "Register.jsx",
  },
  protectedlayout: {
    Decisions: "Decisions.jsx",
    Profile: "Profile.jsx",
    Settings: "Settings.jsx",
  },
};

let result = [];
Object.values(myfiles).forEach((element) => {
  Object.keys(element).forEach((files) => {
    console.log(files);
    result = [
      ...result,
      {
        path: `/${files}`,
        element: `${files}`,
      },
    ];
  });
});

console.log(result);
