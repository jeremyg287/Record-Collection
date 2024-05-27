/** @type {import('next').NextConfig} */
const deployConfig = {
    output: "export",
    basePath: "/Record-Collection",
    images: {
        unoptimized: true,
        remotePatterns: [{
            protocol: "https",
            hostname: "i.scdn.co",
            port: "",
            pathname: "**"
        }]
    }
};
const devConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [{
            protocol: "https",
            hostname: "i.scdn.co",
            port: "",
            pathname: "**"
        }]
    }
};
let exportConfig = devConfig;
if (process.env.ENV == "deploy"){
    exportConfig = deployConfig
}

export default exportConfig;
