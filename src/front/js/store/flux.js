const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      private: undefined,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      signUp: async (requestBody) => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const body = await response.json();
        if (response.status !== 201) {
          alert(body);
          return false;
        }
        return true;
      },
      login: async (requestBody) => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/token`, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw Error("Hubo un problema con el login");
        if (response.status === 401) {
          throw "password o usuario incorrecto";
        } else if (response.status === 400) {
          throw "revise el payload de su solicitud...";
        }
        const data = await response.json();
        localStorage.setItem("jwt-token", data.token);
        return true;
      },
      private: async () => {
        const token = localStorage.getItem("jwt-token");

        const resp = await fetch(`${process.env.BACKEND_URL}/api/protected`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (!resp.ok) throw Error("There was a problem in the login request");
        else if (resp.status === 403) {
          throw Error("Missing or invalid token");
        }

        const data = await resp.json();
        console.log("This is the data you requested", data);
        setStore({ private: data });
        return data;
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
