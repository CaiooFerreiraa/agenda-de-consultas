import os from "os";

const getMac = () => {
    const networkInterface = os.networkInterfaces();

    for (const networkInterfaceKey in networkInterface) {
        for (const networkInterfaceElement of networkInterface[networkInterfaceKey]) {
            if (networkInterfaceElement.family === "IPv4") {
                return networkInterfaceElement.address;
            }
        }
    }
}

export {
    getMac
}